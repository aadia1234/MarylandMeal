import { useState } from "react";
import { useNavigation } from "expo-router";
import Calendar from "@/components/Calendar";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import React from "react";
import MacroCard from "@/components/MacroCard";
import { VStack } from "@/components/ui/vstack";
import FoodCard from "@/components/FoodCard";


export default function Dashboard() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="h-fit w-full bg-current"
    >
      <VStack className="md:px-10 md:pt-6 w-full" space="2xl">
        {/* font-roboto not working with ios */}
        <HStack className="w-full items-center justify-between">
          <Heading size="3xl" className="font-roboto">
            {date.toLocaleDateString("en-us", options)}
          </Heading>
          <Calendar date={date} setDate={setDate} placement="bottom" />
        </HStack>
        <VStack>
          <MacroCard text="Calories" num={0} />
          <HStack space="md" className="w-full justify-between">
            <MacroCard text="Carbs" num={0} />
            <MacroCard text="Protein" num={0} />
            <MacroCard text="Fat" num={0} />
          </HStack>

          <Center>
            <Accordion
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
                          <AccordionTitleText>Meals Logged</AccordionTitleText>
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
                  <FoodCard id={0} menu_item={{
                    id: 0,
                    name: "Test",
                    description: "",
                    image: undefined,
                    calories: 0,
                    carbs: 0,
                    protein: 0,
                    fats: 0,
                    allergens: undefined,
                    serving_size: undefined
                  }} date={""} dh_y={false} dh_south={false} dh_251={false}                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
};