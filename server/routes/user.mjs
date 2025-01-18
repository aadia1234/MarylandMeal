import express from "express";
import UserModel from "../../models/UserModel.mjs";

const router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
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

router.post("/log", requireAuth, async (req, res) => {
  const user = res.locals.user;
  const { date, meal } = req.body;

  try {
    if (user.foodLog && user.foodLog.length > 0) {
      let currLog = user.foodLog.find(
        (elem) => elem.date.getDate() === new Date(date).getDate()
      );

      if (currLog) {
        currLog.ids.push(meal.menu_item.id);
      } else {
        currLog = { date, ids: [meal.menu_item.id] };
        user.foodLog.push(currLog);
      }
    } else {
      user.foodLog = [{ date, ids: [meal.menu_item.id] }];
    }

    user.save();
    res.send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
});

router.get("/log", requireAuth, async (req, res) => {
  const user = res.locals.user;
  const foodLog = user.foodLog;
  res.send(foodLog);
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
