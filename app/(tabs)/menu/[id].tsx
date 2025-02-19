import { StyleSheet, TextInput } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { View } from "@/components/ui/view";
import React, { useState, useEffect } from "react";
import { getUser, log } from "@/api/userSession";
import { Meal } from "@/interfaces/Meal";
import { getMenuItem } from "@/api/menuSession";
import HorizontalMacroView from "@/components/HorizontalMacroView";
import NumberSpinner from "@/components/NumberSpinner";
import { Center } from "@/components/ui/center";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";
import { CheckIcon, GlobeIcon } from "lucide-react-native";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { MacroProgressView } from "@/components/ui/macro-progress";
import Macro from "@/interfaces/Macro";
import { getMacros } from "@/api/userSession";

const FoodItemLayout = (props: any) => {
  return (
    <SafeAreaView className="w-full h-full bg-zinc-100">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack className="w-full p-4" space="md">
          {props.children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const Food = () => {
  const { id } = useLocalSearchParams();
  const item: Meal = getMenuItem(id as string);
  const [quantity, setQuantity] = useState('1'); // 1
  const food = item.menu_item;
  const [date, setDate] = useState(new Date());
  const [macros, setMacros] = useState<{ target: Macro; consumed: Macro; } | null>();
  const [preview, setPreview] = useState({
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fats: food.fats
  })
  const list = [
    { macro: "Calories", amount: food.calories },
    { macro: "Carbs", amount: food.carbs },
    { macro: "Protein", amount: food.protein },
    { macro: "Fat", amount: food.fats }
  ];

  useEffect(() => { getMacros(date).then((macros) => setMacros(macros)) }, [date, log]);

  const Header = () => {
    return (
      <HStack className="items-center justify-between">
        <Pressable onPress={() => { router.back(); }} >
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <Heading size="xl" numberOfLines={1} className="max-w-[80%]">{food.name}</Heading>
        <Pressable onPress={async () => { await log(item, Number(quantity)); router.back(); }} >
          <Icon
            as={CheckIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
      </HStack>
    );
  }

  // const ServingSizeView = () => {
  //   return (
  //     <HStack className="w-full h-fit justify-between items-center px-4">
  //       <Text size="md">Serving Size:</Text>
  //       <Select>
  //         <SelectTrigger variant="outline" size="md">
  //           <SelectInput placeholder="Select serving size" />
  //           <SelectIcon className="mr-3" as={ChevronDownIcon} />
  //         </SelectTrigger>
  //         <SelectPortal>
  //           <SelectBackdrop />
  //           <SelectContent>
  //             <SelectDragIndicatorWrapper>
  //               <SelectDragIndicator />
  //             </SelectDragIndicatorWrapper>
  //             <SelectItem label="1 cup" value="cup" />
  //             <SelectItem label="1 tbsp" value="tbsp" />
  //           </SelectContent>
  //         </SelectPortal>
  //       </Select>
  //     </HStack>
  //   );
  // }

  // Allow integers and decimal numbers
  const handleQuantityChange = (input: string) => {
    const decimalRegex = /^\d{0,4}(\.\d{0,2})?$/;
    
    // If the input matches the regex, update the state and macro previews
    if (decimalRegex.test(input)) {
      setQuantity(input);
      setPreview({
        calories: food.calories * Number(input),
        protein: food.protein * Number(input),
        carbs: food.carbs * Number(input),
        fats: food.fats * Number (input)
      })
    }
  };

  return (
    <VStack space="4xl">
      <Header />
      <Card variant="elevated" className="rounded-md">
        <VStack space="md">
          {/* Macros */}
          <HorizontalMacroView data={list} />
          <Divider className="my-3"></Divider>

          {/* Quantity and Serving Size */}
          <VStack space="md" className="px-0">
            <HStack className="w-full h-fit justify-between items-center px-4">
              <Text size="md">Quantity:</Text>
              {/* <NumberSpinner value={quantity} setValue={setQuantity} /> */}
              <TextInput
                style={{ borderWidth: 1, padding: 10, borderRadius: 10, width: 75, textAlign: 'right'}}
                value={quantity}
                onChangeText={handleQuantityChange}
                keyboardType="decimal-pad"
              />
            </HStack>
            <HStack className="w-full h-fit justify-between items-center px-4">
              <Text size="md">Serving Size:</Text>
              <Text size="md">{food.serving_size}</Text>
            </HStack>
            {/* <ServingSizeView /> */}
            <Divider className="mt-3"></Divider>
          </VStack>

          {/* Ingredients Accordion */}
          <Accordion
            size="md"
            variant="unfilled"
            type="single"
            defaultValue={["a"]}
            className="m-auto w-full rounded-md"
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
                <Text>{food.ingredients ?? "Sorry, no ingredients were found."}</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Macro Previews */}
          {macros && preview && <MacroProgressView target={macros.target} consumed={macros.consumed} preview={preview} />}
          
        </VStack>
      </Card>
    </VStack>
  );
};

export default function FoodItem() {
  return (
    <FoodItemLayout>
      <Food />
    </FoodItemLayout>
  );
}
