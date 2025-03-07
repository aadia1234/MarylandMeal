import { getUser } from "@/api/userSession";
import { User } from "@/interfaces/User";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import UserProvider from "../../../components/navigation/UserProvider";



export default function Layout() {
    const [user, setUser] = useState<User>();
    useEffect(() => { getUser().then((user) => { setUser(user); }) }, []);

    return (
        <UserProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
    );
}
