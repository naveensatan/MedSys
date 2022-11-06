import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const ProductsRoute = {
	path: "/api/products",
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

			const result = await db.collection("products").find(); //retrieve products from DB

			if (!result) return res.sendStatus(404); //if no products found

			const products = await result.toArray();

			res.json(products); //send products as JSON
		});
	},
};
