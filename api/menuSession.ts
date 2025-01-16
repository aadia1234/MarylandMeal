import axios from "axios";
import { FoodDocument } from "@/models/FoodDocument";

const session = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MENU_BASE_URL,
  headers: { Authorization: "token" },
  withCredentials: true,
});

let menu: FoodDocument[] = [];
let page = 0;

export async function getMenu() {
  try {
    const res = await session.get(process.env.EXPO_PUBLIC_DAILYITEMS_URL! + "&page=" + ++page);
    menu.push(...res.data.results)
    return menu;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function resetMenu() {
  menu = [];
  page = 0;
}

export function getMenuItem(id: string) {
  return menu.find((item) => item.menu_item.id === Number(id))!;
}
