import { Theme } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { SetStateAction, useLayoutEffect, useRef, useState } from "react";
// import NavButton from "../../../components/NavButton";
// import type { NavigationProps } from "./_layout";
import { Link, router, useNavigation } from "expo-router";
// import registerUser from "../../../scripts/createUser.mjs";
import axios from "axios";
import { SafeAreaView } from "react-native";
import FoodCard from "@/components/FoodCard";
// import MacroCard from "@/components/MacroCard";
import DateTimePicker from "react-native-ui-datepicker";
import Calendar from "@/components/Calendar";
import { BlurView } from "expo-blur";
import IconButton from "@/components/IconButton";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Grid, GridItem } from "@/components/ui/grid";
import {
  CalendarClock,
  CalendarClockIcon,
  MessageCircle,
  MinusIcon,
  Plus,
  PlusIcon,
  SlidersHorizontal,
  User,
} from "lucide-react-native";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import React from "react";
import Tabbar from "../tabbar";

// import dayjs from 'dayjs';

const DashboardLayout = (props: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="h-fit w-full bg-current">
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full"></Box>
          <VStack className="w-full">{props.children}</VStack>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

const MacroCard = (props: any) => {
  return (
    <Center>
      <Card variant="outline" className="rounded-lg m-3 w-full">
        <VStack className="">
          <Center>
            <Image
              source={require("@/assets/images/clock.png")}
              className="mb-6 w-10 h-10 rounded-md"
              alt="image"
            />
            <Text bold>{props.num}</Text>
            <Text bold>{props.text}</Text>
          </Center>
        </VStack>
      </Card>
    </Center>
  );
};

const Dashboard = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());

  const options: Intl.DateTimeFormatOptions = {
    year: undefined,
    month: "short",
    day: "numeric",
    weekday: "short",
  };

  function pickDate(newDate: Date) {
    setDate(newDate);
  }

  return (
    <VStack className="md:px-10 md:pt-6 w-full" space="2xl">
      {/* font-roboto not working with ios */}
      <HStack className="w-full items-center justify-between">
        <Heading size="3xl" className="font-roboto">
          Jan 1st, 1970
        </Heading>
        <Button size="lg" className="rounded-full p-3.5">
          <ButtonIcon as={CalendarClock} />
        </Button>
      </HStack>
      <VStack>
        <MacroCard text="Calories" num={0} />
        <HStack space="2xl" className="w-full justify-between">
          <MacroCard text="Calories" num={0} />
          <MacroCard text="Calories" num={0} />
          <MacroCard text="Calories" num={0} />
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
                <FoodCard
                  id={1}
                  name={"Test"}
                  description={"test"}
                  image={require("@/assets/images/MarylandMeal.png")}
                  calories={0}
                  fat={0}
                  carbs={0}
                  protein={0}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Center>
      </VStack>
    </VStack>
  );
};

export default function Home() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}
