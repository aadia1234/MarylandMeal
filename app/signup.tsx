"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import register from "../scripts/createUser.mjs";
import axios from "axios";
import { TextInput, View } from "react-native";
import NavButton from "@/components/NavButton";
import * as api from "@/api/session";


export default function Signup() {
    const [error, setError] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        api.register("test", "test2", email, password);
    }


    return (
        <View>
            <TextInput onChangeText={(text) => setEmail(text)}>email</TextInput>
            <TextInput onChangeText={(text) => setPassword(text)}>pwd</TextInput>
            <NavButton text="Register" onPress={submit}></NavButton>
        </View>
    );
}

