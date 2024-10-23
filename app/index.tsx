import { Theme } from "@/constants/Colors";
import { Text, View, Image, StyleSheet } from "react-native";
import { useRef } from "react";
import NavButton from "../components/Button";
// import type { NavigationProps } from "./_layout";
import { Link, Redirect, router, useNavigation } from "expo-router";
import registerUser from "../scripts/registerUser";
import axios from "axios";
import Welcome from "./welcome";


export default function Index() {
	return (
		<Redirect href="/home"></Redirect>
	);
}
