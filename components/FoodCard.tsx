import { Theme } from "@/constants/Colors";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
    border: {
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "rgba(242, 183, 5, 0.3)",
        borderWidth: 2,
        borderCurve: "continuous",
                backgroundColor: "rgba(242, 183, 5, 0.75)",
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

export default function FoodCard() {
    return (
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
    );

}