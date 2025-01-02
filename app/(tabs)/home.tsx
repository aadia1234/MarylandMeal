import { Theme } from "@/constants/Colors";
import { StyleSheet } from "react-native";
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
import { CalendarClock, CalendarClockIcon, MinusIcon, PlusIcon } from "lucide-react-native";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import React from "react";

// import dayjs from 'dayjs';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
  scrollView: {
    // height: "auto",
    // backgroundColor: "green"
    padding: 15,
  },
  text: {
    color: Theme.colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    margin: "auto",
    columnGap: 20,
    width: "100%",
  },
  header: {
    height: 150,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 35,
    color: Theme.colors.primary,
    textAlign: "left",
    fontWeight: "bold",
    margin: "auto",
  },
  titleHeader: {
    flexDirection: "row",
    gap: 10,
  },
  icon: {},
});

const DashboardLayout = (props: any) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    props.isSidebarVisible
  );
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }
  return (
    <VStack className="h-full w-full bg-current">
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full"></Box>
          <VStack className="w-full">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
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
}

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
    // <SafeAreaView style={styles.view}>
    //   <ScrollView contentContainerStyle={styles.scrollView}>
    //     {/* <Calendar date={date} onChange={pickDate}></Calendar> */}
    //     <MacroCard text="Calories" num={3000}></MacroCard>
    //     <View style={styles.macros}>
    //       <MacroCard text="Protein" num={100}></MacroCard>
    //       <MacroCard text="Carbs" num={100}></MacroCard>
    //       <MacroCard text="Fat" num={100}></MacroCard>
    //     </View>
    //     <View>
    //       <Text style={styles.text}>Meals Logged</Text>
    //       <FoodCard></FoodCard>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <Box className="flex-1 h-full">
      <ScrollView
        className="mb-20 md:mb-2 h-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 100,
          flexGrow: 1,
        }}
      >
        <VStack className="p-4 pb-0 md:px-10 md:pt-6 w-full" space="2xl">
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
                            <AccordionTitleText>
                              Meals Logged
                            </AccordionTitleText>
                            {isExpanded ? (
                              <AccordionIcon
                                as={ChevronUpIcon}
                                className="ml-3"
                              />
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
                    {/* <AccordionContentText>
                      To place an order, simply select the products you want,
                      proceed to checkout, provide shipping and payment
                      information, and finalize your purchase.
                    </AccordionContentText> */}
                    <FoodCard />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default function Home() {
  return (
    <SafeAreaView className="bg-white">
      <DashboardLayout title="Dashboard" isSidebarVisible={true}>
        <Dashboard />
      </DashboardLayout>
      {/* <MobileFooter footerIcons={bottomTabsList} /> */}
    </SafeAreaView>
  );
}
