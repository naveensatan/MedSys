import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUpRoute = {
	path: "/api/signup",
	method: "post",
	handler: async (req, res) => {
		const { email, firstName, lastName, password } = req.body; //get data from request body
		const user = await db.collection("users").findOne({ email }); //retrieve user from DB

		if (user) {
			//if a user already exists
			return res.sendStatus(409);
		}

		const pswdHash = await bcrypt.hash(password, 10); //encrypt password
		const username = `${firstName} ${lastName}`; //set username

		//insert user to DB
		const result = await db
			.collection("users")
			.insertOne({ username, email, pswdHash, admin: false });

		const { insertedId } = result; //get auto-generated ID of new user

		//sign JWT
		jwt.sign(
			{ id: insertedId, email, username },
			process.env.JWT_SEC,
			{
				expiresIn: "2d", //token expiry
			},
			(err, token) => {
				if (err) {
					return res.sendStatus(500).send(err);
				}

				res.json({ token }).sendStatus(200); //send token to front-end
			}
		);
	},
};
