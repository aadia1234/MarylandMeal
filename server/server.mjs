import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import UserModel from "../models/UserModel.mjs";
import bcrypt from "bcryptjs";
import cors from "cors";
import user from "./routes/user.mjs";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const db = await mongoose.connect(process.env.EXPO_PUBLIC_MONGODB_URI);

app.use(
  session({
    secret: process.env.EXPO_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    name: "app-cookie",
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(express.json());

app.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      res.send({ message: user.id });
    } else {
      res.status(401).send({ message: "Invalid credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send({ message: "User registered!" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

app.use(
  cors({
    origin: process.env.EXPO_PUBLIC_BASE_URL,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use("/user", user);

app.listen(process.env.EXPO_PUBLIC_PORT, () =>
  console.log("Server running on port: " + process.env.EXPO_PUBLIC_PORT)
);
