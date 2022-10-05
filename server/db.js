import { MongoClient } from "mongodb";

const db_pwd = encodeURIComponent("RtK6TdMfAdm656?Y");
const uri = `mongodb+srv://naveensatanarachchi:${db_pwd}@cluster0.xf2yumw.mongodb.net/?retryWrites=true&w=majority`;
let db;

const connectDB = async (callback) => {
	//DB config
	const client = new MongoClient(uri);
	await client.connect();
	db = client.db("pharmacy");

	callback();
};

export { connectDB, db };
