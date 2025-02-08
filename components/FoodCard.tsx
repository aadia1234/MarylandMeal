import { router } from "expo-router";
import { memo, useRef } from "react";
import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import { Card } from "./ui/card";
import { Center } from "./ui/center";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { Button, ButtonText } from "./ui/button";
import { Meal } from "@/interfaces/Meal";
import { Box } from "./ui/box";
import { Grid, GridItem } from "./ui/grid";
import Macro from "@/interfaces/Macro";
import HorizontalMacroView from "./HorizontalMacroView";

function FoodCard({ item, quantity }: { item: Meal, quantity?: number }) {
  const food = item.menu_item;

  const onPress = () => {
    router.push({ pathname: "/menu/[id]", params: { id: food.id } });
  };

  const macros = [
    { macro: "Calories", amount: food.calories },
    { macro: "Protein", amount: food.protein },
    { macro: "Carbs", amount: food.carbs },
    { macro: "Fats", amount: food.fats },

  ];

  return (
    <Button
      variant="outline"
      onPress={onPress}
      className={`w-fit h-fit my-2 p-2 justify-center border border-outline-${quantity ? 100 : 0} bg-white rounded-md`}
    >
      <VStack space="sm" className="mx-2 pb-2 w-full items-center">
        <Text bold size="xl" numberOfLines={1}>{food.name} {quantity && `(x${quantity})`}</Text>
        <HorizontalMacroView data={macros} />
        {/* allergen macro view */}
      </VStack>
    </Button>
  );
}

export default memo(FoodCard, (prevProps, nextProps) => { return prevProps.item.id === nextProps.item.id; });