import express from "express";
import UserModel from "../../models/UserModel.mjs";
import FoodLogModel from "../../models/FoodLogModel.mjs";

const router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
};

const initNewFoodLog = async (user) => {
  const log = new FoodLogModel({
    userId: user.id,
    target: {
      calories: 100,
      fats: 200,
      protein: 300,
      carbs: 400,
    },
  });
  await log.save();

  user.foodLogIds.push(log.id);
  await user.save();

  return log;
};

const getFoodLog = async (user, date) => {
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

router.use(async (req, res, next) => {
  const userId = req.session.userId;
  const user = await UserModel.findById(userId);
  res.locals.user = user;
  next();
});

router.get("", requireAuth, async (req, res) => {
  const user = res.locals.user;
  res.send(user);
});

// date needs to be FIXED!!!
router.post("/log", requireAuth, async (req, res) => {
  const user = res.locals.user;
  const date = new Date(req.query.date);
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
    console.log(error);
    res.sendStatus(401);
  }
});

router.get("/log", requireAuth, async (req, res) => {
  const user = res.locals.user;
  const date = new Date(req.query.date);
  const log = await getFoodLog(user, date);
  res.send(log);
});

router.post("/logout", requireAuth, async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(401).send({ message: "error" });
    } else {
      res.clearCookie(process.env.COOKIE_NAME);
      res.send({ message: "logged out" });
    }
  });
});

export default router;
