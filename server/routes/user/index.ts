import UserModel from "../../models/UserModel";
import express, { Request, Response, NextFunction } from "express";
import { User } from "@/interfaces/User";
import log from "./log";
import update from "./update";

const user = express.Router();

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
};

user.use(async (req, res, next) => {
  const userId = req.session.userId;
  const user = await UserModel.findById(userId);
  const t = user as User;
  res.locals.user = user as User;
  next();
});

user.get("/", requireAuth, async (req, res) => {
  const user: User = res.locals.user;
  res.send(user);
});

user.post("/logout", requireAuth, async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(401).send({ message: "error" });
    } else {
      res.clearCookie(process.env.COOKIE_NAME!);
      res.send({ message: "logged out" });
    }
  });
});

user.use("/log", requireAuth, log);
user.use("/update", requireAuth, update);

export default user;
