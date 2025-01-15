import express from "express";
import UserModel from "../../models/UserModel.mjs";

const router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    console.log("User not authenticated");
    res.status(401).send({ message: "User not authenticated" }); // User is not authenticated, redirect to login page
  }
};

router.get("", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await UserModel.findById(userId);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

router.post("/log", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { date, meal } = req.body;
    const user = await UserModel.findById(userId);
    if (user.foodLog && user.foodLog.length > 0) {
      console.log(user.foodLog[0].date);
      user.foodLog
        .find((elem) => elem.date.getDate() === new Date(date).getDate())
        .ids.push(meal.menu_item.id);
    } else {
      user.foodLog = [{ date, ids: [meal.menu_item.id] }];
    }
    user.save();
    console.log(user);
    res.send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

router.get("/log", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await UserModel.findById(userId);
    const foodLog = user.foodLog;
    res.send(foodLog);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
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
  try {
    res.send("logged out");
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
});

export default router;
