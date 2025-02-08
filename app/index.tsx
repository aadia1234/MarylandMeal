import { getUser } from "@/api/userSession";
import { User } from "@/interfaces/User";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as api from "@/api/userSession";


export default function Index() {
    const [loggedIn, setLoggedIn] = useState(false);

    if (false) {
        return <Redirect href="/(tabs)/home"></Redirect>
    } else {
        return <Redirect href="/auth/welcome"></Redirect>
    }
}
