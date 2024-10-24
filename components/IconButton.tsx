import { Theme } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useRef } from 'react';
import { View, Pressable, Animated, StyleSheet, Image, ImageSourcePropType } from "react-native";



export default function IconButton(props: {icon: string, background: boolean, onPress: () => void}) {
    let t  = require("../assets/images/clock.png");

    const animated = useRef(new Animated.Value(1)).current

    const styles = StyleSheet.create({
        button: {
            paddingVertical: 10,
            width: 50,
            height: 50,
            // margin: "auto",
            borderRadius: 30,
            backgroundColor: props.background ? Theme.colors.primary : "white",
            opacity: animated,
            justifyContent: "center",
        },
        icon: {
            color: !props.background ? Theme.colors.primary : "white",
            textAlign: "center"
        }
    });

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
        <Animated.View style={styles.button}>
            <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={props.onPress}>
            <FontAwesome name={props.icon as any} size={20} color="white" style={styles.icon}/>
            </Pressable>
        </Animated.View>
    );
};