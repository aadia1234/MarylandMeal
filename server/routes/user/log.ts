
import FoodLogModel from "../../models/FoodLogModel";
import express from "express";
import { User } from "@/interfaces/User";

const log = express.Router();

const initNewFoodLog = async (user: User) => {
  const log = new FoodLogModel({
    userId: user.id,
    target: user.goalMacros,
  });
  await log.save();

  user.foodLogIds.push(log.id);
  await user.save();

  return log;
};

export const getFoodLog = async (user: User, date: Date) => {
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  // Maybe use populate instead?
  const log =
    (await FoodLogModel.findOne({
      _id: { $in: user.foodLogIds },
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    })) ?? (await initNewFoodLog(user));

  return log;
};

log.post("/", async (req, res) => {
  const user: User = res.locals.user;
  const queryStr = req.query.date as string;
  const date = new Date(queryStr);
  const { meal, quantity } = req.body;

  try {
    const id = meal.menu_item.id;
    const foodLog = await getFoodLog(user, date);
    const consumed = foodLog.consumed;
    const totalConsumed = {
      calories: meal.menu_item.calories * quantity + consumed.calories,
      protein: meal.menu_item.protein * quantity + consumed.protein,
      carbs: meal.menu_item.carbs * quantity + consumed.carbs,
      fats: meal.menu_item.fats * quantity + consumed.fats,
    };

    foodLog.consumed = totalConsumed;
    foodLog.ids.push({ id, quantity });
    await foodLog.save();

    res.send({ message: "success" });
  } catch (error) {
    res.sendStatus(401);
  }
});

log.get("/", async (req, res) => {
  const user: User = res.locals.user;
  const queryStr = req.query.date as string;
  const date = new Date(queryStr);
  const log = await getFoodLog(user, date);
  res.send(log);
});

export default log;
