import { getUser } from "@/api/userSession";
import { UserDocument } from "@/models/UserDocument";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";


export default function Index() {
    const [user, setUser] = useState<UserDocument>();
    useEffect(() => { getUser().then((user) => setUser(user)) }, []);

    if (false) {
        return <Redirect href="/(tabs)/home"></Redirect>
    } else {
        return <Redirect href="/auth/welcome"></Redirect>
    }
}
