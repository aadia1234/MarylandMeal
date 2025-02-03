import FoodLog from "@/interfaces/FoodLog";
import axios from "axios";
// import { getMenu } from "./menuSession";
import { getFood } from "./menuSession";
import { Meal } from "@/interfaces/Meal";

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
      { email, password }
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
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_FOOD_URL!, {
      params: { date },
    });
    const log = res.data as FoodLog;
    console.log(log.ids);
    const logData = await log.ids.map(async ({ id, quantity }) => {
      const food = await getFood(id);
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
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_FOOD_URL!, {
      params: { date },
    });
    const log = res.data as FoodLog;
    const [target, consumed] = [log.target, log.consumed];
    console.log({ target, consumed });
    return { target, consumed };
  } catch (error) {
    console.log(error);
  }
}

export async function log(meal: Meal, quantity: number) {
  try {
    const body = { meal, quantity };
    const date = new Date();

    console.log(body);
    const res = await session.post(
      process.env.EXPO_PUBLIC_LOG_FOOD_URL!,
      body,
      { params: { date } }
    );
    console.log("Successfully logged: " + meal.menu_item.name);
  } catch (error) {
    console.log(error);
  }
}
