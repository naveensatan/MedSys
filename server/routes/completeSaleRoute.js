import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const completeSaleRoute = {
	path: "/api/sales/confirm",
	method: "post",
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const { items, total, date } = req.body; //get data from request body

		//if no authorization header presented
		if (!authorization) return res.sendStatus(401);

		//extract token from authorization header
		const token = authorization.split(" ")[1]; // (Bearer xxxxxxxxxxxxxx)

		//verify JWT
		jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
			if (err) return res.sendStatus(401).send("token tampered"); //if not verified

			const { admin } = decoded; //decode JWT and get admin status

			if (!admin) return res.sendStatus(403); //if not an admin

			try {
				const result = await db
					.collection("sales")
					.insertOne({ items, total, date }); //insert new document to the DB

				res.sendStatus(200);
			} catch (e) {
				res.sendStatus(424);
			}
		});
	},
};
