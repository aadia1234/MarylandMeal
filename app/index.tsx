import { Theme } from "@/constants/Colors";
import { Text, View, Image, StyleSheet } from "react-native";
import { useRef } from "react";
import Button from "../components/Button";
// import type { NavigationProps } from "./_layout";
import { Link, router, useNavigation } from "expo-router";
import registerUser from "../scripts/registerUser";
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



export default function Index() {
	const navigation = useNavigation();

	function login() {
		router.push("/login");
	}
	
	function signup() {
		// router.push("/signup");

		axios.post("http://localhost:3000/users/signup/", {
			firstName: "axios",
			lastName: "works",
			email: "1234@gmail.com",
			password: "abcdefg"
		}).then(() => { console.log("worked!"); });
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
				<Button text="Login" onPress={login}></Button>
				<Button text="Signup" onPress={signup}></Button>
			</View>
		</View>
	);
}
