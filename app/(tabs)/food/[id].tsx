"use client";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import register from "../../../scripts/createUser.mjs";
import axios from "axios";
import { ImageSourcePropType, StyleSheet } from "react-native";
import NavButton from "@/components/NavButton";
import * as api from "@/api/session";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
});

const FoodItemLayout = (props: any) => {
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack className="w-full p-4" space="md">
          <VStack className="md:items-center" space="4xl">
            <Pressable
              onPress={() => {
                router.back();
              }}
              className=""
            >
              <HStack space="sm" className="items-center">
                <Icon
                  as={ArrowLeftIcon}
                  className="md:hidden stroke-background-800"
                  size="xl"
                />
                <Heading size="xl">Back</Heading>
              </HStack>
            </Pressable>
            {props.children}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const Food = () => {
  const { id } = useLocalSearchParams();
  const food = findFoodByID();

  // 1. access api, then find food by ID.
  function findFoodByID() {
    return {
      id: 1,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    };
  }

  function logMeal() {
    console.log("test: " + food.name);
  }

  return (
    <Card variant="outline" className="rounded-md">
      <Image
        source={food.image}
        className="mb-6 h-80 w-full rounded-md"
        alt="image"
      />
      <VStack className="">
        {/* make everything equal width! */}
        <HStack className="mb-6 flex-row w-full justify-evenly items-center">
          <VStack className="items-center">
            <Heading size="xs">{food.calories}g</Heading>
            <Text size="xs">Calories</Text>
          </VStack>
          <Divider
            orientation="vertical"
            className="self-center bg-background-300 flex sm:hidden"
          />
          <VStack className="items-center">
            <Heading size="xs">{food.carbs}g</Heading>
            <Text size="xs">Carbs</Text>
          </VStack>
          <Divider
            orientation="vertical"
            className="self-center bg-background-300 flex sm:hidden"
          />
          <VStack className="items-center">
            <Heading size="xs">{food.protein}g</Heading>
            <Text size="xs">Protein</Text>
          </VStack>
          <Divider
            orientation="vertical"
            className="self-center bg-background-300 flex sm:hidden"
          />
          <VStack className="items-center">
            <Heading size="xs">{food.fat}g</Heading>
            <Text size="xs">Fat</Text>
          </VStack>
        </HStack>
        <Heading size="md" className="mb-2">
          {food.name}
        </Heading>
        <Text size="sm">{food.description}</Text>
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button
          onPress={logMeal}
          className="mt-5 px-4 py-2 mr-0 sm:mr-3 sm:mb-0 sm:flex-1"
        >
          <ButtonText size="sm">Log meal</ButtonText>
        </Button>
      </Box>
    </Card>
  );
};

export default function FoodItem() {
  return (
    <FoodItemLayout>
      <Food />
    </FoodItemLayout>
  );
}
