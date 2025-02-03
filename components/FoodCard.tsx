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
      className="w-fit h-fit my-2 p-2 justify-center border border-outline-200"
    >
      <HStack className="w-full h-fit flex">
        <Image
          source={require("@/assets/images/MarylandMeal.png")}
          className="w-1/3 aspect-square rounded-sm grow-0 my-auto"
          alt="image"
        />
        <VStack space="sm" className="grow shrink mx-2 ">
          <HStack className="justify-between w-full">
            <Text bold size="xl" className={`w-${quantity? 44 : "full"}`} numberOfLines={1}>{food.name}</Text>
            {
              quantity &&
              <Center className="aspect-square">
                  <Text>x{quantity}</Text>
              </Center>
            }
          </HStack>
          <Grid className={`gap-y-${quantity ? 0 : 2} gap-x-0`} _extra={{ className: "grid-cols-2" }}>
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
      </HStack>
    </Button>
  );
}

export default memo(FoodCard, (prevProps, nextProps) => { return prevProps.item.id === nextProps.item.id; });