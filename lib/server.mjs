"use server";

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import users from "./routes/users.mjs";
const app = express();
import { EXPO_PUBLIC_PORT } from "@env"

app.use(express.json());

async function connectDB() {
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


// app.post("/login", async (req, res) => {
    // const { email, password } = req.body;
    // const user = await User.findOne({ email });
    // if (user && bcrypt.compareSync(password, user.password)) {
    //     const token = jwt.sign({ userId: user._id }, process.env.EXPO_PUBLIC_AUTH_SECRET, {
    //         expiresIn: "1d",
    //     });
    //     res.json({ token });
    // } else {
    //     res.send({ message: "Invalid credentials" });
    // }
// });

console.log("PROCESS: " + dotenv.EXPO_PUBLIC_PORT);

app.listen(process.env.EXPO_PUBLIC_PORT, () => console.log("Server running on port: " + process.env.EXPO_PUBLIC_PORT));


// routes
app.use("/users", users);