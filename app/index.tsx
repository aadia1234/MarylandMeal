
import { User } from "@/interfaces/User";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import { login } from "@/api/authenticateSession";


// Add expo-auth-session authentication later!
export default function Index() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const v = async () => {
            const t = await login("Refactor@gmail.com", "Refactor@123")
            setLoggedIn(t);
        }

        v();
    }, []);

    if (true) {
        return <Redirect href="/(tabs)/profile"></Redirect>
    } else {
        return <Redirect href="/auth"></Redirect>
    }
}
