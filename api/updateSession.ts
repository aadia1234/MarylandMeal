import { Allergen } from "@/types/Allergen";
import session from "./userSession";
import Macros from "@/interfaces/Macros";

export async function updateName(name: string) {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL! + "/name",
      { name }
    );

    console.log("Successfully updated name!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateWeight(weights: {
  currentWeight?: number;
  targetWeight?: number;
}) {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL! + "/weight",
      weights
    );
    console.log("Successfully updated name!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateGoalMacros(macros: Macros) {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL! + "/macros",
      { macros }
    );
    console.log("Successfully updated macros!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateAllergens(allergens: Allergen[]) {
  try {
    const allergenNames = allergens.map((a) => a.name);
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL! + "/allergens",
      { allergenNames }
    );
    console.log("Successfully updated allergens!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateDiningHallPreferences(diningHallPreferences: string[]) {
  try {
    const res = await session.patch(
      process.env.EXPO_PUBLIC_UPDATE_URL! + "/diningHallPreferences",
      { diningHallPreferences }
    );
    console.log("Successfully updated dining halls!");
    console.log("CHANGED: " + diningHallPreferences);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
