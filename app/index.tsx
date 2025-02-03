import { getUser } from "@/api/userSession";
import { User } from "@/interfaces/User";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as api from "@/api/userSession";


export default function Index() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        api.authenticate("dbREFACTOR@gmail.com", "dbREFACTOR@123");
        setLoggedIn(true);
    });

    if (loggedIn) {
        return <Redirect href="/(tabs)/home"></Redirect>
    } else {
        return <Redirect href="/auth/welcome"></Redirect>
    }
}
