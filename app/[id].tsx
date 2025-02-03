import { StyleSheet } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { View } from "@/components/ui/view";
import React, { useState } from "react";
import { getUser, log } from "@/api/userSession";
import { Meal } from "@/interfaces/Meal";
import { getMenuItem } from "@/api/menuSession";
import HorizontalMacroView from "@/components/HorizontalMacroView";
import NumberSpinner from "@/components/NumberSpinner";
import { Center } from "@/components/ui/center";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";

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
  const item: Meal = getMenuItem(id as string);
  const food = item.menu_item;
  const [quantity, setQuantity] = useState(1);

  const list = [
    { macro: "Calories", amount: food.calories },
    { macro: "Carbs", amount: food.carbs },
    { macro: "Protein", amount: food.protein },
    { macro: "Fat", amount: food.fats }
  ];

  return (
    <Card variant="outline" className="rounded-md">
      <Image
        source={require("@/assets/images/MarylandMeal.png")}
        className="mb-6 h-80 w-full rounded-md"
        alt="image"
      />
      <VStack className="" space="md">
        <View className="mb-6">
          <HorizontalMacroView data={list} />
        </View>
        <Heading size="md" className="mb-2">
          {food.name}
        </Heading>
        <HStack className="w-full h-fit justify-between">
          <Center>
            <Text size="md">Quantity:</Text>
          </Center>
          <NumberSpinner value={quantity} setValue={setQuantity} />
        </HStack>
        <Button
          onPress={() => log(item, quantity)}
          className="mt-5 px-4 py-2 mr-0 sm:mr-3 sm:mb-0 sm:flex-1"
        >
          <ButtonText size="sm">Log meal</ButtonText>
        </Button>
        {/* <Accordion
          size="md"
          variant="unfilled"
          type="single"
          defaultValue={["a"]}
          className="m-5 w-full border border-outline-200"
        >
          <AccordionItem value="a">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText className="font-primary">View Ingredients</AccordionTitleText>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                      ) : (
                        <AccordionIcon
                          as={ChevronDownIcon}
                          className="ml-3"
                        />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              Lorem Ipsum
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </VStack>
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
