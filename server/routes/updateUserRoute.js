import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const UpdateUserRoute = {
	path: "/api/update-users/:id",
	method: "put",
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const { id } = req.params;
		const { username, email, admin } = req.body; //get data from request body

		//if no authorization header presented
		if (!authorization) return res.sendStatus(401);

		//extract token from authorization header
		const token = authorization.split(" ")[1]; // (Bearer xxxxxxxxxxxxxx)

		//verify JWT
		jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
			if (err) return res.sendStatus(401).send("token tampered"); //if not verified

			const { admin: tokenAdmin } = decoded; //get admin status and ID

			if (!tokenAdmin) return res.sendStatus(403); //if not an admin

			const updatedUser = await db
				.collection("users")
				.findOneAndUpdate(
					{ _id: ObjectId(id) },
					{ $set: { username, email, admin } },
					{ returnNewDocument: true }
				);

			if (!updatedUser) return res.sendStatus(404);
			return res.sendStatus(200);
		});
	},
};
