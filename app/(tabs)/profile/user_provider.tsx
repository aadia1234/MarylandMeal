import { getUser } from "@/api/userSession";
import { User } from "@/interfaces/User";
import { createContext, SetStateAction, useEffect, useState } from "react";

export const UserContext = createContext<{ user: User | undefined, setUser: any }>({ user: undefined, setUser: undefined });

export default function UserProvider(props: any) {
    const [user, setUser] = useState<User>();
    useEffect(() => { getUser().then((user) => { setUser(user); }) }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};