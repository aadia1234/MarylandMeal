import axios from "axios";

const session = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_BASE_URL! + process.env.EXPO_PUBLIC_USER_URL!,
  headers: { Authorization: "token" },
  withCredentials: true,
});

export async function logout() {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_LOGOUT_URL!);
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  try {
    const res = await session.get("");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default session;