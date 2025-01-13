import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "../models/UserModel.mjs";
import bcrypt from "bcryptjs";
import cors from "cors";

dotenv.config();

const app = express();
const db = await mongoose.connect(process.env.EXPO_PUBLIC_MONGODB_URI);

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    console.log("User not authenticated");
    res.status(401).send({ message: "User not authenticated" }); // User is not authenticated, redirect to login page
  }
};

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

app.get("/user", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await UserModel.findById(userId);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

app.post("/user/log", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const food = req.body;
    const user = await UserModel.findById(userId);
    user.foodLog.push(food);
    user.save();
    res.send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

app.get("/user/log", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await UserModel.findById(userId);
    const foodLog = user.foodLog;
    console.log("Food log: " + foodLog);
    res.send(foodLog);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

app.post("/user/logout", requireAuth, async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(401).send({ message: "error" });
    } else {
      res.clearCookie(process.env.COOKIE_NAME);
      res.send({ message: "logged out" });
    }
  });
  try {
    res.send("logged out");
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

try {
  app.listen(process.env.EXPO_PUBLIC_PORT, () =>
    console.log("Server running on port: " + process.env.EXPO_PUBLIC_PORT)
  );
} catch (error) {
  console.log(error);
}
