import axios from "axios";
import { Meal } from "@/interfaces/Meal";
import Allergen from "@/interfaces/Allergen";

let menu: Meal[] = [];
let page = 0;

const session = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MENU_BASE_URL!,
  headers: { Authorization: "token" },
  withCredentials: true,
});

export async function getMenu({
  diningHalls,
  allergens,
}: {
  diningHalls: string[];
  allergens: Allergen[];
}) {
  try {
    page++;
    const res = await session.get(
      process.env.EXPO_PUBLIC_DAILYITEMS_URL!, {
        params: {
          date: "2025-01-28",
          page: page,
          // dining_halls: diningHalls.join(","),
          // allergens: allergens.map((a) => a.id).join(","),
        }
      }
    );
    menu.push(...res.data.results);
    return menu;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getMenuItem(id: string) {
  return menu.find((item) => item.menu_item.id === Number(id))!;
}

export async function getFood(id: number) {
  try {
    const res = await session.get(
      process.env.EXPO_PUBLIC_DAILYITEMS_URL! + "id=" + id
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export function resetMenu() {
  menu = [];
  page = 0;
}
