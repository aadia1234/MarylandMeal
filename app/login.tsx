"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { View, Text, TextInput } from "react-native";
// import type { NavigationProps } from "./_layout";

export default function Login() {
    const [error, setError] = useState("");
    // const router = useRouter();

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
    }

    return (
        <View>
            <Text>Hello World!</Text>
            <TextInput>aadianand1234@gmail.com</TextInput>
            <TextInput></TextInput>
        </View>
    );
}