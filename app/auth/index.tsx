import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";

const SplashScreen = () => {

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
          size="sm"
          source={require("../../assets/images/MarylandMeal.png")}
          alt="MarylandMeals"
          className="rounded-xl"
        />
        <Center>
          <Heading bold size="3xl">
            MarylandMeals
          </Heading>
        </Center>
      </HStack>
      <VStack className="w-full h-14" space="lg">
        <Button className="w-full h-full rounded-lg" onPress={login}>
          <ButtonText size="lg" className="font-medium">Log in</ButtonText>
        </Button>
        <Button className="w-full h-full rounded-lg" onPress={signup}>
          <ButtonText size="lg" className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export default function Index() {
  return (
    <AuthLayout>
      <SplashScreen />
    </AuthLayout>
  );
}
