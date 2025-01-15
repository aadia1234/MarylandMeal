import { FoodDocument } from "@/models/FoodDocument";
import FoodLogDocument from "@/models/FoodLogDocument";
import axios from "axios";
import { getMenu } from "./menuSession";

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
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
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

export async function getFoodLog(date: Date) {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_LOG_FOOD_URL!);
    const menu = await getMenu();

    const foodLog = res.data as FoodLogDocument[];
    const log = foodLog.find(
      (log) => new Date(log.date).getDate() === date.getDate()
    )!;
    const logData = log?.ids.map((id) =>
      menu!.find((item) => item.menu_item.id === id)
    );

    console.log(logData);
    return logData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function log(meal: FoodDocument) {
  try {
    const body = { date: new Date(), meal };
    console.log(body);
    const res = await session.post(process.env.EXPO_PUBLIC_LOG_FOOD_URL!, body);
    console.log("Successfully logged: " + meal.menu_item.name);
  } catch (error) {
    console.log(error);
  }
}
