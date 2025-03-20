import axios from "axios";

const session = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_BASE_URL! + process.env.EXPO_PUBLIC_AI_URL!,
    headers: { Authorization: "token" },
    withCredentials: true,
});

export async function getMealPlan(context: string) {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_MENUPLAN_URL!, { context });
    return res.data.plan;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function suggestMacros(context: string) {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_SUGGESTMACROS_URL!, { context });
    return res.data.macros;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default session;