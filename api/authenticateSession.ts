import axios from "axios";

const session = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_BASE_URL! +
    process.env.EXPO_PUBLIC_AUTHENTICATE_URL!,
  headers: { Authorization: "token" },
  withCredentials: true,
});

export function register(name: string, email: string, password: string) {
  session.post(process.env.EXPO_PUBLIC_REGISTER_URL!, {
    name,
    email,
    password,
  });
}

export async function login(email: string, password: string) {
  try {
    const res = await session.post(process.env.EXPO_PUBLIC_LOGIN_URL!, {
      email,
      password,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
