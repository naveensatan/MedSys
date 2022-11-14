import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const AddProductRoute = {
	path: "/api/add-product",
	method: "post",
	handler: async (req, res) => {
		const { authorization } = req.headers;
		const {
			productName,
			brandName,
			qty,
			strength,
			unitPrice,
			manufacture,
			expiry,
		} = req.body; //get data from request body

		//if no authorization header presented
		if (!authorization) return res.sendStatus(401);

		//extract token from authorization header
		const token = authorization.split(" ")[1]; // (Bearer xxxxxxxxxxxxxx)

		//verify JWT
		jwt.verify(token, process.env.JWT_SEC, async (err, decoded) => {
			if (err) return res.sendStatus(401).send("token tampered"); //if not verified

			const { admin } = decoded; //get admin status

			if (!admin) return res.sendStatus(403); //if not an admin

			const product = await db
				.collection("products")
				.findOne({ productName, strength }); //retrieve product from Db

			if (product) {
				//if a product already exists
				return res.sendStatus(409);
			}

			//insert product to DB
			const result = await db.collection("products").insertOne({
				productName,
				brandName,
				qty,
				unitPrice,
				strength,
				manufacture,
				expiry,
			});

			return res.sendStatus(200);
		});
	},
};
