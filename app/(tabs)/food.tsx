import { Button, ScrollView, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from "react";
import FoodCard from "@/components/FoodCard";


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
            title: "Food",
            headerLargeTitle: true,
            headerRight: () => (
                <Button title="Settings" onPress={() => { /* Handle save action */ }} />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.view}>
            <ScrollView>
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