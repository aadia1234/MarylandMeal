import { FoodDocument } from "@/models/FoodDocument";
import axios from "axios";

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
    console.log(process.env.EXPO_PUBLIC_AUTHENTICATE_USER_URL);
    const res = await session.post(
      process.env.EXPO_PUBLIC_AUTHENTICATE_USER_URL!,
      {
        email: email,
        password: password,
      }
    );
    return res.data;
  } catch (error) {
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

export async function log(food: FoodDocument) {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_LOG_FOOD_URL!, food);
    console.log("Successfully logged: " + food.menu_item.name);
  } catch (error) {
    console.log(error);
  }
}
