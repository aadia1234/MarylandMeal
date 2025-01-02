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
import MacroCard from "@/components/MacroCard";
import DateTimePicker from "react-native-ui-datepicker";
import Calendar from "@/components/Calendar";
import { BlurView } from "expo-blur";
import IconButton from "@/components/IconButton";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Grid, GridItem } from "@/components/ui/grid";

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
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden">
        {/* <MobileHeader title={props.title} /> */}
      </Box>
      <Box className="hidden md:flex">
        {/* <WebHeader toggleSidebar={toggleSidebar} title={props.title} /> */}
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {/* {isSidebarVisible && <Sidebar />} */}
          </Box>
          <VStack className="w-full">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
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
    <Box className="flex-1">
      <ScrollView
        className="flex-1 mb-20 md:mb-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 100,
          flexGrow: 1,
        }}
      >
        <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
          {/* font-roboto not working with ios */}
          <Heading size="2xl" className="font-roboto">
            Jan 1st, 1970
          </Heading>

          <VStack>
            <MacroCard text="Calories" num={3000} />
            <HStack space="md" className="">
              <MacroCard text="Calories" num={0} />
              <MacroCard text="Calories" num={0} />
              <MacroCard text="Calories" num={0} />
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default function Home() {
  return (
    <SafeAreaView className="h-full w-full">
      <DashboardLayout title="Dashboard" isSidebarVisible={true}>
        <Dashboard />
      </DashboardLayout>
      {/* <MobileFooter footerIcons={bottomTabsList} /> */}
    </SafeAreaView>
  );
}
