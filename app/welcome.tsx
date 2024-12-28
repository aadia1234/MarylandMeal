import { Theme } from "@/constants/Colors";
import { Text, View, Image, StyleSheet } from "react-native";
import { useLayoutEffect, useRef } from "react";
import NavButton from "../components/NavButton";
// import type { NavigationProps } from "./_layout";
import { Link, router, useNavigation } from "expo-router";
import axios from "axios";

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "white"
	},
	titleTextGroup: {
		alignItems: "center",
		marginTop: 0
	},
	titleText: {
		fontSize: 40,
		fontWeight: "bold",
		color: Theme.colors.primary,
	},
	logo: {
	  	width: 200,
	  	height: 200,
	  	borderRadius: 25,
		marginTop: 75,
		marginBottom: 75
	},
	buttonGroup: {
		width: 200,
		height: 150,
		// backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",
	},
});



export default function Welcome() {
	const navigation = useNavigation();

	useLayoutEffect(() => {
        navigation.setOptions({
			headerShown :false
        });
    }, [navigation]);

	function login() {
		router.push("/login")
	}
	
	function signup() {
		router.push("/signup");
	}

	return (
		<View style={styles.view}>
			<View style={styles.titleTextGroup}>
				<Text style={styles.titleText}>Welcome to</Text>
				<Text style={styles.titleText}>MarylandMeal!</Text>
			</View>
			<Image 
				style={styles.logo}
				source={require("../assets/images/MarylandMeal.png")}
			/>
			<View style={styles.buttonGroup}>
				<NavButton text="Login" onPress={login}></NavButton>
				<NavButton text="Signup" onPress={signup}></NavButton>
			</View>
		</View>
	);
}
