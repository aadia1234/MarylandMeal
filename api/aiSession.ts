import axios from "axios";

const session = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_BASE_URL! + process.env.EXPO_PUBLIC_AI_URL!,
    headers: { Authorization: "token" },
    withCredentials: true,
});

export async function getMealPlan(context: string) {
  try {
    const res = await session.post("/meal-recommender", { context });
    return res.data.plan;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default session;