"use server";

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import users from "./routes/users.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.listen(process.env.EXPO_PUBLIC_PORT, () => console.log("Server running on port: " + process.env.EXPO_PUBLIC_PORT));

// routes
app.use("/users", users);