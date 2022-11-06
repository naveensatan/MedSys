import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const UserRoute = {
	path: "/api/users",
	method: "get",
	handler: async (req, res) => {
		const { authorization } = req.headers;

		//if no authorization header presented
		if (!authorization) return res.sendStatus(401);

		//extract token from authorization header
		const token = authorization.split(" ")[1]; // (Bearer xxxxxxxxxxxxxx)

		//verify JWT
		jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
			if (err) return res.sendStatus(401).send("token tampered"); //if not verified

			const { admin } = decoded; //get admin status

			if (!admin) return res.sendStatus(403); //if not an admin

			const result = await db
				.collection("users")
				.find()
				.project({ username: 1, email: 1, admin: 1 }); //retrieve users from DB

			if (!result) return res.sendStatus(404); //if no users found

			const users = await result.toArray();

			res.json(users); //send users as JSON
		});
	},
};
