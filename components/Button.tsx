import { Theme } from '@/constants/Colors';
import { Link } from 'expo-router';
import { useRef } from 'react';
import { View, Pressable, Animated, StyleSheet, Text } from "react-native";


const styles = (animated?: any) => StyleSheet.create({
    text: {
        textAlign: "center",
		color: "white",
		fontSize: 16,
		margin: "auto",
        // marginTop: 
    },
    button: {
        paddingVertical: 10,
		width: "100%",
        margin: 10,
		borderRadius: 12.5,
		backgroundColor: Theme.colors.primary,
        opacity: animated
	},
});


export default function Button(props: {text: string, onPress: () => void}) {
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
    
    return (
        <Animated.View style={styles(animated).button}>
            <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={props.onPress}>
                <Text style={styles().text}>{props.text}</Text>
            </Pressable>
        </Animated.View>
    );
};