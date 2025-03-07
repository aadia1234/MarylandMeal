import express, { Request, Response, NextFunction } from "express";
import { User } from "@/interfaces/User";
import bcrypt from "bcryptjs";
import { getFoodLog } from "./log";

const update = express.Router();

update.patch("/name", async (req, res) => {
  const user: User = res.locals.user;
  const { name } = req.body;

  user.name = name;
  user.save();

  res.send({ message: "Success" });
});

update.patch("/password", async (req, res) => {
  const user: User = res.locals.user;
  const { oldPassword, newPassword } = req.body;

  if (bcrypt.compareSync(oldPassword, user.password)) {
    user.password = await bcrypt.hash(newPassword, 10);
    user.save();
    res.send({ message: "Success" });
  } else {
    res.status(401).send({ message: "Invalid old password!" });
  }
});

update.patch("/weight", async (req, res) => {
  const user: User = res.locals.user;
  const { currentWeight, targetWeight } = req.body;

  if (currentWeight) {
    user.currentWeight = currentWeight;
  }

  if (targetWeight) {
    user.goalWeight = targetWeight;
  }

  user.save();

  res.send({ message: "Success" });
});

update.patch("/macros", async (req, res) => {
  const user: User = res.locals.user;
  const { macros } = req.body;

  user.goalMacros = macros;
  user.save();

  const log = await getFoodLog(user, new Date());
  log.target = macros;
  log.save();

  res.send({ message: "Success" });
});

update.patch("/allergens", async (req, res) => {
  const user: User = res.locals.user;
  const { allergenNames } = req.body;

  user.allergens = allergenNames;
  user.save();

  res.send({ message: "Success" });
});

update.patch("/diningHallPreferences", async (req, res) => {
  const user: User = res.locals.user;
  const { diningHallPreferences } = req.body;

  user.diningHallPreferences = diningHallPreferences;
  user.save();

  res.send({ message: "Success" });
});

export default update;
