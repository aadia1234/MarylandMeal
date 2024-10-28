import { Theme } from "@/constants/Colors";
import { Text, View, Image, StyleSheet, TextInput, ImageSourcePropType, Dimensions } from "react-native";
import { SetStateAction, useLayoutEffect, useRef, useState } from "react";
import NavButton from "../../components/Button";
// import type { NavigationProps } from "./_layout";
import { Link, router, useNavigation } from "expo-router";
import registerUser from "../../scripts/createUser.mjs";
import axios from "axios";
import { Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import FoodCard from "@/components/FoodCard";
import MacroCard from "@/components/MacroCard";
import DateTimePicker from "react-native-ui-datepicker"
import Calendar from "@/components/Calendar";
import { BlurView } from "expo-blur";
import IconButton from "@/components/IconButton";
// import dayjs from 'dayjs';





const styles = StyleSheet.create({
	view: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
        width: "100%",

	},
    scrollView: {
        // height: "auto",
        // backgroundColor: "green"
        padding: 15

    },
    text: {
        color: Theme.colors.text,
        fontWeight: "bold",
        fontSize: 20
    },
    macros: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        margin: "auto",
        columnGap: 20,
        width: "100%"
    },
    header: {
        height: 150,
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",

    },
    title: {
        fontSize: 35,
        color: Theme.colors.primary,
        textAlign: "left",
        fontWeight: "bold",
        margin: "auto",
    },
    titleHeader: {
        flexDirection: "row",
        gap: 10
    },
    icon: {
    }
});



export default function Home() {
	const navigation = useNavigation()
    const [date, setDate] = useState(new Date());

    const options: Intl.DateTimeFormatOptions = {
        year: undefined,
        month: "short",
        day: "numeric",
        weekday: "short"
    };

    // make padding between title and text the same
    // need to add animation to navigation bar
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerView}>
                    <View style={styles.titleHeader}>
                        <Text style={styles.title}>{date.toLocaleDateString(undefined, options)}</Text>
                        <IconButton icon="chevron-down" background={false} onPress={() => { pickDate(new Date()) }} />
                    </View>
                    <View style={styles.icon}>
                        <IconButton icon="plus" background={true} onPress={() => { pickDate(new Date()) }} />
                    </View>
                </View>
            ),
            headerShown: true,
            headerShadowVisible: false,
            headerBackTitleVisible: true, 
            automaticallyAdjustContentInsets: false,
            headerStyle: styles.header
        });
    }, [navigation]);

    function pickDate(newDate: Date) {
        setDate(newDate)
    }

	function login() {
		router.replace("/food");
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
		<SafeAreaView style={styles.view}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* <Calendar date={date} onChange={pickDate}></Calendar> */}
                <MacroCard text="Calories" num={3000}></MacroCard>
                <View style={styles.macros}>
                    <MacroCard text="Protein" num={100}></MacroCard>
                    <MacroCard text="Carbs" num={100}></MacroCard>
                    <MacroCard text="Fat" num={100}></MacroCard>
                </View>
                <View>
                    <Text style={styles.text}>Meals Logged</Text>
                    <FoodCard></FoodCard>
                </View>
            </ScrollView>
        </SafeAreaView>
	);
}
