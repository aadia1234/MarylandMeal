import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { View, Text, TextInput } from "react-native";
import NavButton from "@/components/Button";
import * as api from "@/api/session";
// import type { NavigationProps } from "./_layout";

export default function Login() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const router = useRouter();

    function submit() {
        api.authenticate(email, password);
    }

    return (
        <View>
            <TextInput onChangeText={(text) => setEmail(text)}>email</TextInput>
            <TextInput onChangeText={(text) => setPassword(text)}>pwd</TextInput>
            <NavButton text="Login" onPress={submit}></NavButton>
        </View>
    );
}