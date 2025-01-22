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
import FoodLogDocument from "@/models/FoodLogDocument";
import { FoodDocument } from "@/models/FoodDocument";
import { Grid, GridItem } from "@/components/ui/grid";
import { SafeAreaView, Text } from "react-native";
import { View } from "@/components/ui/view";
// import { Text } from "@/components/ui/text";
import ContentLayout from "../contentLayout";
import { useIsFocused } from "@react-navigation/native";
import MealLog from "@/components/MealLog";
import MacroDocument from "@/models/MacroDocument";
// import * as SplashScreen from 'expo-splash-screen';
// import { useFonts } from 'expo-font';


const MacroProgressView = ({ target, consumed }: { target: MacroDocument, consumed?: MacroDocument }) => {
  const macros = [
    { macro: "calories", target: target.calories, consumed: consumed?.calories ?? 0 },
    { macro: "protein", target: target.protein, consumed: consumed?.protein ?? 0 },
    { macro: "carbs", target: target.carbs, consumed: consumed?.carbs ?? 0 },
    { macro: "fats", target: target.fats, consumed: consumed?.fats ?? 0 }
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
  const [log, setLog] = useState<{ item: FoodDocument, quantity: number }[]>();
  const [macros, setMacros] = useState<{ target: MacroDocument; consumed: MacroDocument; } | undefined>();
  const isFocused = useIsFocused();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  useEffect(() => { getFoodLog(date).then((log) => setLog(log)) }, [date, isFocused]);
  useEffect(() => { getMacros(date).then((macros) => setMacros(macros)) }, [date, isFocused]);

  // const [loaded, error] = useFonts({
  //   'Interstate Regular': require('@/assets/fonts/Interstate-Regular.otf'),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
    // need to change data placeholder!
    <ContentLayout data={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <VStack className="md:px-10 md:pt-6 w-full px-5" space="2xl">
          {/* font-roboto not working with ios */}
          <HStack className="w-full items-center justify-between" >
            <Heading size="3xl" className="font-primary">
              {date.toLocaleDateString("en-us", options)}
            </Heading>
            <Calendar date={date} setDate={setDate} placement="bottom" />
          </HStack>
          <VStack>
            {macros && <MacroProgressView target={macros!.target} consumed={macros!.consumed} />}
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