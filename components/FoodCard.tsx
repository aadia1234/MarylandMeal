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

function FoodCard({ item, quantity }: { item: Meal, quantity?: number }) {
  const food = item.menu_item;

  const onPress = () => {
    router.push({ pathname: "/[id]", params: { id: food.id } });
  };

  const macros = [
    { macro: "Calories", value: food.calories },
    { macro: "Protein", value: food.protein },
    { macro: "Carbs", value: food.carbs },
    { macro: "Fats", value: food.fats },

  ];

  return (
    <Button
      variant="outline"
      onPress={onPress}
      className="w-fit h-fit m-2 p-2 justify-center border border-outline-200"
    >
      <VStack space="sm" className="grow shrink mx-2 items-center">
        <Text bold size="xl" numberOfLines={1}>{food.name} {quantity && `(x${quantity})`}</Text>
        <Grid className={`gap-y-${quantity ? 2 : 2} gap-x-2 pb-2`} _extra={{ className: "grid-cols-2" }}>
          {
            macros.map(({ macro, value }, index) => {
              return (
                <GridItem _extra={{ className: "col-span-1" }} key={index}>
                  <VStack>
                    <Card variant="outline" className="rounded-md w-full h-fit px-0 py-1 m-auto">
                      <Center>
                        <Center>
                          <Text bold size="xs">{value}g</Text>
                          <Text bold size="xs">{macro}</Text>
                        </Center>
                      </Center>
                    </Card>
                  </VStack>
                </GridItem>
              );
            })
          }
        </Grid>
      </VStack>
    </Button>
  );
}

export default memo(FoodCard, (prevProps, nextProps) => { return prevProps.item.id === nextProps.item.id; });