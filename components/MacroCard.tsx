import { Theme } from "@/constants/Colors";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
    border: {
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "rgba(242, 183, 5, 0.3)",
        borderWidth: 2,
        borderCurve: "continuous",
        overflow: "hidden",
        width: "auto",
        flex: 1
    },
    view: {
        height: 170,
        flexDirection: "column",
        borderCurve: "continuous",
    },
    image: {
        marginHorizontal: "auto",
        marginVertical: 25,
        width: 35,
        height: 35,
    },
    textContent: {
        // padding: 30,
        // margin: "auto",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center"
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 5,
        textAlign: "center"
    },
    textBody: {
        fontSize: 16,
        textAlign: "center",
    }
});

export default function MacroCard(props: {text: string, num: number}) {
    return (
        <View style={styles.border}>
            <View style={styles.view}>
                <Image
                    style={styles.image}
                    source={require("../assets/images/clock.png")}
                />
                <View style={styles.textContent}>
                    <Text style={styles.textTitle}>{props.num}</Text>
                    <Text style={styles.textBody}>{props.text}</Text>
                </View>
            </View>
        </View>
    );

}