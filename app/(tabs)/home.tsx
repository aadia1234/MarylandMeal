import { useEffect, useState } from "react";
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
import { getFoodLog, getMacros } from "@/api/userSession";
import FoodLogDocument from "@/interfaces/FoodLog";
import { Grid, GridItem } from "@/components/ui/grid";
import { SafeAreaView, Text } from "react-native";
import { View } from "@/components/ui/view";
// import { Text } from "@/components/ui/text";
import ContentLayout from "../contentLayout";
import { useIsFocused } from "@react-navigation/native";
import MealLog from "@/components/MealLog";
import Macro from "@/interfaces/Macro";
import FoodLog from "@/interfaces/FoodLog";
import { Meal } from "@/interfaces/Meal";


const MacroProgressView = ({ target, consumed }: { target: Macro, consumed: Macro }) => {
  const macros = [
    { macro: "calories", target: target.calories, consumed: consumed.calories },
    { macro: "protein", target: target.protein, consumed: consumed.protein },
    { macro: "carbs", target: target.carbs, consumed: consumed.carbs },
    { macro: "fats", target: target.fats, consumed: consumed.fats }
  ];

  return (
    <Grid className="gap-y-2 gap-x-2" _extra={{ className: "grid-cols-2" }}>
      {
        macros.map((entry, index) => {
          return (
            <GridItem _extra={{ className: "col-span-1" }} key={index}>
              <MacroCard {...entry} />
            </GridItem>
          );
        })
      }
    </Grid>
  );
}


export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [log, setLog] = useState<{ item: Meal, quantity: number }[]>();
  const [macros, setMacros] = useState<{ target: Macro; consumed: Macro; }>();
  const isFocused = useIsFocused();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  useEffect(() => { getFoodLog(date).then((log) => setLog(log)) }, [date, isFocused]);
  useEffect(() => { getMacros(date).then((macros) => setMacros(macros)) }, [date, log]);



  return (
    // need to change data placeholder!
    <ContentLayout data={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <VStack className="md:px-10 md:pt-6 w-full px-5" space="2xl">
          <HStack className="w-full items-center justify-between" >
            <Heading size="3xl">
              {date.toLocaleDateString("en-us", options)}
            </Heading>
            <Calendar date={date} setDate={setDate} placement="bottom" />
          </HStack>
          <VStack>
            {/* needs to be fixed! - if macro exceeds the target then it glitches! also animation is glitchy!*/}
            {macros && <MacroProgressView target={macros.target} consumed={macros.consumed} />}
            <Center>
              <MealLog title={"Meals logged"} log={log} />
              <MealLog title={"Meal Plan"} log={[]} />
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </ContentLayout>
  );
};