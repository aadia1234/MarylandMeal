import axios from "axios";
import { FoodDocument } from "@/models/FoodDocument";

const session = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MENU_BASE_URL,
  headers: { Authorization: "token" },
  withCredentials: true,
});

let menu: FoodDocument[];

export async function getMenu() {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_DAILYITEMS_URL!);
    menu = res.data;
    return menu;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export function getMenuItem(id: string) {
  return menu.find((item) => item.menu_item.id === Number(id))!;
}
