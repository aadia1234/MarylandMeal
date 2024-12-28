"use client";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import register from "../../../scripts/createUser.mjs";
import axios from "axios";
import { TextInput, View, Text, StyleSheet, SafeAreaView } from "react-native";
import NavButton from "@/components/NavButton";
import * as api from "@/api/session";
import { useNavigation } from "expo-router";


const styles = StyleSheet.create({
	view: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
        width: "100%",

	},
});


export default function Signup(props: {id: number}) {
    const [error, setError] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
    const food = findFoodByID(props.id);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: food.name,
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
        });
    }, [navigation]);

    function findFoodByID(id: number) {
        return {name: "Chicken", calories: 123}
    }

    function submit() {
        api.register("test", "test2", email, password);
    }


    return (
        <SafeAreaView style={styles.view}>
            <Text>{food.name}</Text>
            <Text>{food.calories}</Text>
        </SafeAreaView>
    );
}

