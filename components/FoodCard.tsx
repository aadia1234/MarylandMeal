import { router } from "expo-router";
import { memo, useRef } from "react";
import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import { Card } from "./ui/card";
import { Center } from "./ui/center";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { Button, ButtonText } from "./ui/button";
import { FoodDocument } from "@/models/FoodDocument";

function FoodCard(item: FoodDocument) {
  const food = item.menu_item;

  const onPress = () => {
    router.push({ pathname: "/[id]", params: { id: food.id } });
  };

  return (
    <Button
      variant="outline"
      onPress={onPress}
      className="w-fit h-fit my-2 p-2 justify-center border border-outline-200"
    >
      <HStack space="md" className="w-full h-fit flex">
        <Image
          source={require("@/assets/images/MarylandMeal.png")}
          className="w-1/3 aspect-square rounded-sm grow-0 my-auto"
          alt="image"
        />
        <VStack space="sm" className="grow shrink px-2">
          <Text bold size="2xl" numberOfLines={1}>{food.name}</Text>
          <VStack>
            <Text bold size="sm">Calories: {food.calories} kcal</Text>
            <Text bold size="sm">Carbs: {food.carbs}g</Text>
            <Text bold size="sm">Protein: {food.protein}g</Text>
            <Text bold size="sm">Fats: {food.fats}g</Text>
          </VStack>
        </VStack>
      </HStack>
    </Button>
  );
}

export default memo(FoodCard, (prevProps, nextProps) => { return prevProps.id === nextProps.id; });