"use server";
import mongoose from "mongoose";
import User from "../../models/User";
import express from "express";
import bcrypt from "bcryptjs";

const router = express.Router();

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

router.get("/users", (req, res, next) => {
    res.send("TEST");
});

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({ firstName, lastName, email, password: hashedPassword });
        res.send({ message: "User registered, id: " + 1 })
    } catch (error) {
        res.send({ message: error })
    }
});


module.exports = router;
export default router;