import { FoodDocument } from "@/models/FoodDocument";
import FoodLogDocument from "@/models/FoodLogDocument";
import axios from "axios";
// import { getMenu } from "./menuSession";
import { getFood } from "./menuSession";

const session = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: { Authorization: "token" },
  withCredentials: true,
});

export function register(name: string, email: string, password: string) {
  session
    .post(process.env.EXPO_PUBLIC_REGISTER_USER_URL!, {
      name,
      email,
      password,
    })
    .then(() => {
      console.log("worked!");
    });
}

export async function authenticate(email: string, password: string) {
  try {
    // simplify function
    const res = await session.post(
      process.env.EXPO_PUBLIC_AUTHENTICATE_USER_URL!,
      {
        email: email,
        password: password,
      }
    );
    console.log(res.data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_LOGOUT_USER_URL!);
    console.log("Successfully logged out!");
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_USER_URL!);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fix async
export async function getFoodLog(date: Date) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_FOOD_URL!);
    const foodLog = res.data as FoodLogDocument[];
    const log = foodLog.find(
      (log) => new Date(log.date).getDate() === date.getDate()
    )!;

    const logData = await log.ids.map(async ({ id, quantity }) => {
      const food = await getFood(910);
      console.log(id);
      return { item: food.results[0], quantity };
    });

    return Promise.all(logData);
  } catch (error) {
    console.log(error);
    return [];
  }
}

// fix async
export async function getMacros(date: Date) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_FOOD_URL!);
    const foodLog = res.data as FoodLogDocument[];
    const log = foodLog.find(
      (log) => new Date(log.date).getDate() === date.getDate()
    )!;

    return log.macros;
  } catch (error) {
    console.log(error);
    // return [];
  }
}

export async function log(meal: FoodDocument, quantity: number) {
  try {
    const body = { date: new Date(), meal, quantity };
    console.log(body);
    const res = await session.post(process.env.EXPO_PUBLIC_LOG_FOOD_URL!, body);
    console.log("Successfully logged: " + meal.menu_item.name);
  } catch (error) {
    console.log(error);
  }
}
