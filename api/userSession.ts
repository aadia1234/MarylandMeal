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
  session.post(process.env.EXPO_PUBLIC_REGISTER_USER_URL!, {
    name,
    email,
    password,
  });
}

export async function authenticate(email: string, password: string) {
  try {
    // simplify function
    const res = await session.post(
      process.env.EXPO_PUBLIC_AUTHENTICATE_USER_URL!,
      { email, password }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_LOGOUT_USER_URL!);
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
    const logData = await log.ids.map(async ({ id, quantity }) => {
      const food = await getFood(id);
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
    return { target, consumed };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function log(meal: Meal, quantity: number) {
  try {
    const body = { meal, quantity };
    const date = new Date();
    const res = await session.post(
      process.env.EXPO_PUBLIC_LOG_FOOD_URL!,
      body,
      { params: { date } }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  name: string,
  oldPassword: string,
  newPassword: string
) {
  try {
    const body = { name, oldPassword, newPassword };
    const res = await session.patch(process.env.EXPO_PUBLIC_UPDATE_URL!, body);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
