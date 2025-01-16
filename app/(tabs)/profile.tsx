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
import { UserDocument } from "@/models/UserDocument";
import { router } from "expo-router";
import { logout } from "@/api/userSession";
import ContentLayout from "../contentLayout";

const userData = [
  { macro: "Calories", amount: 1000 },
  { macro: "Carbs", amount: 2000 },
  { macro: "Protein", amount: 3000 },
  { macro: "Fat", amount: 4000 }
];


const ProfileView = (user: UserDocument) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Center className="md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
      <EditProfile showModal={showModal} setShowModal={setShowModal} />
      <VStack space="lg" className="items-center">
        <Button onPress={() => { logout(); router.replace("/auth/welcome"); }}>
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
        <HStack className="items-center h-fit pb-3 gap-1">
          {userData.map(({ macro, amount }, index) => {
            return (
              <>
                <VStack className="py-0 px-4 items-center" space="xs">
                  <Text className="text-dark font-roboto font-semibold justify-center items-center">
                    {amount}g
                  </Text>
                  <Text className="text-dark text-xs font-roboto">
                    {macro}
                  </Text>
                </VStack>
                {index !== userData.length - 1 &&
                  <Divider
                    orientation="vertical"
                    className="self-center bg-background-300 flex sm:hidden"
                  />
                }
              </>
            );
          })}
        </HStack>

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

export default function Profile(props: UserDocument) {

  return (
    <ContentLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-fit w-full bg-current"
      >
        <VStack className="h-full w-full mb-16 md:mb-0">
          <VStack className="h-full w-full" space="2xl">
            <ProfileView {...props} />
            <VStack className="mx-6" space="2xl">
              <Heading className="font-roboto" size="xl">
                Account
              </Heading>
              <VStack className="py-2 px-4 border rounded-xl border-border-300 justify-between items-center">
                {/* {accountData.map((item, index) => <SettingsCard key={index} {...item} />)} */}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </ContentLayout>
  );
};


