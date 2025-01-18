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
import { getFoodLog } from "@/api/userSession";
import FoodLogDocument from "@/models/FoodLogDocument";
import { FoodDocument } from "@/models/FoodDocument";
import { Grid, GridItem } from "@/components/ui/grid";
import { SafeAreaView } from "react-native";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import ContentLayout from "../contentLayout";
import { useIsFocused } from "@react-navigation/native";
import MealLog from "@/components/MealLog";


const MacroProgressView = ({ data }: { data: { macro: string, amount: number }[] }) => {
  return (
    <Grid className="gap-y-2 gap-x-2" _extra={{ className: "grid-cols-2" }}>
      {
        data.map((entry, index) => {
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
  const [log, setLog] = useState<(FoodDocument)[]>();
  const isFocused = useIsFocused();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  const userData = [
    { macro: "Calories", amount: 25 },
    { macro: "Carbs", amount: 50 },
    { macro: "Protein", amount: 75 },
    { macro: "Fat", amount: 100 }
  ];

  useEffect(() => { getFoodLog(date).then((log) => setLog(log)) }, [date, isFocused]);

  return (
    // need to change data placeholder!
    <ContentLayout data={log?.length}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <VStack className="md:px-10 md:pt-6 w-full px-5" space="2xl">
          {/* font-roboto not working with ios */}
          <HStack className="w-full items-center justify-between">
            <Heading size="3xl" className="font-roboto">
              {date.toLocaleDateString("en-us", options)}
            </Heading>
            <Calendar date={date} setDate={setDate} placement="bottom" />
          </HStack>
          <VStack>
            <MacroProgressView data={userData}/>
            <Center>
              <MealLog title={"Meals logged"} log={log}/>
              <MealLog title={"Meal Plan"} log={[]} />
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </ContentLayout>
  );
};