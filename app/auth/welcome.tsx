import { Theme } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useRef } from "react";
import NavButton from "../../components/NavButton";
// import type { NavigationProps } from "./_layout";
import { Link, router, useNavigation } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import colors from "tailwindcss/colors";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import { Center } from "@/components/ui/center";
import AuthLayout from "./AuthLayout";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white"
  },
  titleTextGroup: {
    alignItems: "center",
    marginTop: 0,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.red[400],
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25,
    marginTop: 75,
    marginBottom: 75,
  },
  buttonGroup: {
    width: 200,
    height: 150,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SplashScreen = () => {
  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, [navigation]);

  function login() {
    router.push("/auth/login");
  }

  function signup() {
    router.push("/auth/signup");
  }

  return (
    <VStack
      className="w-full max-w-[440px] items-center h-full justify-center"
      space="4xl"
    >
      <HStack className="w-fit" space="md">
        <Image
          size="md"
          source={require("../../assets/images/MarylandMeal.png")}
          alt="MarylandMeals"
          className="rounded-xl w-11 h-11"
        />
        <Heading bold size="3xl">
          MarylandMeals
        </Heading>
      </HStack>
      <VStack className="w-full" space="lg">
        <Button className="w-full" onPress={login}>
          <ButtonText className="font-medium">Log in</ButtonText>
        </Button>
        <Button onPress={signup}>
          <ButtonText className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export default function Welcome() {
  return (
    <AuthLayout>
      <SplashScreen />
    </AuthLayout>
  );
}
