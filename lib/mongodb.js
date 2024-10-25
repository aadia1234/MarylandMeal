"use server";
import mongoose from "mongoose";

export default async function connectDB() {
	try {
		const { connection } = await mongoose.connect("mongodb+srv://aadianand1234:aadi12345678@user-database.im0ce.mongodb.net/?retryWrites=true&w=majority&appName=user-database");
		if (connection.readyState === 1) {
			return Promise.resolve(true);
		}
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

/* 

export default async function connectDB() {
	try {
        const db = process.env.PUBLIC_EXPO_MONGODB_URI as string;
        const client = new MongoClient(db);
		await client.connect();
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

*/