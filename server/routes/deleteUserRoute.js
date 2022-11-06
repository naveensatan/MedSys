import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const DeleteUserRoute = {
	path: "/api/users/delete-user/:id",
	method: "delete",
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const { id } = req.params;

		//if no authorization header presented
		if (!authorization) return res.sendStatus(401);

		//extract token from authorization header
		const token = authorization.split(" ")[1]; // (Bearer xxxxxxxxxxxxxx)

		//verify JWT
		jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
			if (err) return res.sendStatus(401).send("token tampered"); //if not verified

			const { admin } = decoded; //get admin status and ID

			if (!admin) return res.sendStatus(403); //if not an admin

			const result = await db
				.collection("users")
				.findOneAndDelete({ _id: ObjectId(id) }); //retrieve users from DB

			const { _id } = result.value;

			if (_id === id) return res.sendStatus(200);
		});
	},
};
