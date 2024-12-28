import { Button, ScrollView, View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from "react";
import FoodCard from "@/components/FoodCard";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";


const styles = StyleSheet.create({
	view: {
        margin: "auto",
        width: "95%",
        height: "100%",
		justifyContent: "center",
		alignItems: "stretch",
		// backgroundColor: "white"
	}
});


export default function Food() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "TEST",
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleShadowVisible: false,
            headerSearchBarOptions: {
                placeHolder: "Search food",
                hideWhenScrolling: false,
            },
            headerRight: () => (
                <Button title="Settings" onPress={() => { /* Handle save action */ }} />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.view}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardDismissMode="on-drag">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </ScrollView>
        </View>
    );

}