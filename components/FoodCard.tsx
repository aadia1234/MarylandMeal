import { Theme } from "@/constants/Colors";
import { router } from "expo-router";
import { useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";


// fix border problems
const styles = StyleSheet.create({
    border: {
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "rgba(242, 183, 5, 1)",
        borderWidth: 2,
        borderCurve: "continuous",
        backgroundColor: "rgba(242, 183, 5, 0.5)",
        overflow: "hidden",
    },
    view: {
        width: "auto",
        height: 130,
        flexDirection: "row",
        borderCurve: "continuous"
    },
    image: {
        width: 130,
        height: 130,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderCurve: "continuous"
    },
    textContent: {
        padding: 30,
        justifyContent: "center",
        margin: "auto"
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    textBody: {
        fontSize: 16
    }
});


const animatedStyle = (animated?: any) => StyleSheet.create({
    button: {
		width: "100%",
        opacity: animated
	},
});

export default function FoodCard() {

    const animated = useRef(new Animated.Value(1)).current

    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(animated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        }).start();
    };

    const onPress = () => {
        const id: number = 54;
        router.navigate({pathname: "/food/foodItem", params: {id}})
    }

    
    return (
        <Animated.View style={animatedStyle(animated).button}>
            <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
                <View style={styles.border}>
                    <View style={styles.view}>
                        <Image
                            style={styles.image}
                            source={require("../assets/images/MarylandMeal.png")}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.textTitle}>Grilled Chicken</Text>
                            <Text style={styles.textBody}>160 Cal</Text>
                            <Text style={styles.textBody}>100g 100g 100g</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );

}