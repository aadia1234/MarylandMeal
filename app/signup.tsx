"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import register from "../scripts/createUser.mjs";


export default function Signup() {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    async function submit(formData: FormData) {
        const response = await register({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
        });
    
        ref?.current?.reset();
        
        if (response?.error) {
            setError(response.error);
        } else {
            console.log("Successfully registered new user!");
            return router.push("/login");
        }
    }
}

