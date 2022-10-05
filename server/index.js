import Express, { response } from "express";
import cors from "cors";
import { Routes } from "./routes/routesList.js";
import { db, connectDB } from "./db.js";

//Express config
const app = Express();
const port = 3000;
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

//Endpoints
Routes.forEach((route) => {
	app[route.method](route.path, route.handler);
});

//start server
connectDB(() => {
	app.listen(port, () => {
		console.log(`Server is listenting on port ${port}`);
	});
});
