"use server"
import connectDB from "@/lib/mongodb";
import User from "../models/User";
import bcrypt from "bcryptjs";

export default async function registerUser(values: any) {
    const { firstName, lastName, email, password } = values;

    try {
        await connectDB();
        const userFound = await User.findOne({ email });

        if (userFound) {
            return {
                error: "Email already exists!"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        )
        console.log("User created - ID: " + user);
    } catch (error) {
        console.log(error);
    }
}