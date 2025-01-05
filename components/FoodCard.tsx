import { Theme } from "@/constants/Colors";
import { router } from "expo-router";
import { useRef } from "react";
import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import { Card } from "./ui/card";
import { Center } from "./ui/center";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { Button, ButtonText } from "./ui/button";

export default function FoodCard(props: FoodProps) {

  const onPress = () => {
    router.push({ pathname: "/(tabs)/food/[id]", params: { id: props.id } });
  };

  return (
    <Button
      variant="outline"
      onPress={onPress}
      className="w-fit h-36 my-2 justify-center p-2 border border-outline-200 bg-white"
    >
      <HStack space="2xl" className="w-full h-fit">
        <Image
          source={props.image}
          className="w-32 h-32 rounded-sm"
          alt="image"
        />
        <VStack space="md" className="mt-2">
          <Text bold size="2xl">{props.name}</Text>
          <VStack>
            <Text bold>{props.calories} Cal</Text>
            <Text bold>{props.carbs}g {props.protein}g {props.fat}g</Text>
          </VStack>
        </VStack>
      </HStack>
    </Button>
  );
}
