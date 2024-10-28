"use server";
import mongoose, { connect } from "mongoose";
import User from "../../models/User.mjs";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

router.get("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.EXPO_PUBLIC_AUTH_SECRET, {
                expiresIn: "1d",
            });
            res.json({ token });
        } else {
            res.send({ message: "Invalid cffffredentials" });
        }

        res.send({ message: "te"});
    } catch (error) {
        console.log(error);
        res.send({message: "eerrror"});
    }
    
});

router.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.send({ message: "User registered!"})
    } catch (error) {
        res.send({ message: error })
    }
});


export default router;