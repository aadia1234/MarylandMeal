import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {
  EditIcon,
  PhoneIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import EditProfile from "@/components/EditProfile";
import SettingsCard from "@/components/SettingsCard";
import { User } from "@/interfaces/User";
import { router } from "expo-router";
import { getUser, logout } from "@/api/userSession";
import ContentLayout from "../contentLayout";
import { View } from "@/components/ui/view";
import HorizontalMacroView from "@/components/HorizontalMacroView";
import LoadingSpinner from "@/components/LoadingSpinner";

const userData = [
  { macro: "Calories", amount: 1000 },
  { macro: "Carbs", amount: 2000 },
  { macro: "Protein", amount: 3000 },
  { macro: "Fat", amount: 4000 }
];




const ProfileView = ({ user }: { user: User }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Center className="md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
      <EditProfile showModal={showModal} setShowModal={setShowModal} />
      <VStack space="lg" className="items-center">
        <Button onPress={() => { console.log(user) }}>
          {/* <Button onPress={() => { logout(); router.replace("/auth/welcome"); }}> */}
          <ButtonText>Logout</ButtonText>
        </Button>
        <Avatar size="2xl" className="bg-primary-600">
          <AvatarImage
            alt="Profile Image"
            height={100}
            width={100}
            source={require("@/assets/images/MarylandMeal.png")}
          />
          <AvatarBadge />
        </Avatar>
        <VStack className="gap-1 w-full items-center">
          <Text size="2xl" className="font-roboto text-dark">
            {user.name}
          </Text>
          <Text className="font-roboto text-sm text-typograpphy-700">
            United States
          </Text>
        </VStack>
        <View className="w-96">
          <HorizontalMacroView data={userData} />
        </View>

        <Button
          variant="outline"
          action="secondary"
          onPress={() => setShowModal(true)}
          className="gap-3 relative"
        >
          <ButtonText className="text-dark">Edit Profile</ButtonText>
          <ButtonIcon as={EditIcon} />
        </Button>
      </VStack>
    </Center>
  );
}

const AccountSettingsView = () => {
  return (
    <VStack className="mx-6" space="2xl">
      <Heading className="font-roboto" size="xl">
        Account
      </Heading>
      <VStack className="py-2 px-4 border rounded-xl border-border-300 justify-between items-center">
        {/* {accountData.map((item, index) => <SettingsCard key={index} {...item} />)} */}
      </VStack>
    </VStack>
  );
}

export default function Profile() {
  const [user, setUser] = useState<User>();
  useEffect(() => { getUser().then((user) => setUser(user)) }, []);

  return (
    <ContentLayout data={user?._id}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-fit w-full"
      >
        <VStack className="h-full w-full mb-16 md:mb-0" space="2xl">
          <ProfileView user={user!} />
          <AccountSettingsView />
        </VStack>
      </ScrollView>
    </ContentLayout>
  );


};


