import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginRoute = {
	path: "/api/login",
	method: "post",
	handler: async (req, res) => {
		const { email, password } = req.body;

		const user = await db.collection("users").findOne({ email });

		if (!user) {
			return res.sendStatus(401);
		}

		const { _id, username, email: Email, pswdHash, admin } = user;

		const passwordMatch = await bcrypt.compare(password, pswdHash);

		if (passwordMatch) {
			jwt.sign(
				{ _id, email: Email, username, admin },
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
		} else {
			res.sendStatus(401);
		}
	},
};
