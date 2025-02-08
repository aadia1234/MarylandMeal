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
import ContentLayout from "@/components/ContentLayout";
import { View } from "@/components/ui/view";
import HorizontalMacroView from "@/components/HorizontalMacroView";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BellIcon, ChevronRightIcon, GlobeIcon, GoalIcon, HeartIcon, LogOutIcon, StarIcon } from "lucide-react-native";
import { Card } from "@/components/ui/card";


const ProfileView = ({ user }: { user: User }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Center className="w-full">
      <Card variant="elevated" className="w-full">
        <EditProfile showModal={showModal} setShowModal={setShowModal} />
        <VStack space="lg" className="items-center">
          <Avatar size="2xl" className="bg-primary-600">
            <AvatarImage
              alt="Profile Image"
              height={100}
              width={100}
              source={require("@/assets/images/TerrapinLogo.png")}
              className="p-3"
            />
          </Avatar>
          <VStack className="gap-1 w-full items-center">
            <Text size="2xl" className="font-roboto text-dark">
              {user.name}
            </Text>
            <Text className="font-roboto text-sm text-typograpphy-700">
              {user.email}
            </Text>
          </VStack>
          <View className="w-full items-center">
            <Text className="font-roboto text-sm text-typograpphy-700">
              Streaks: -1
            </Text>
          </View>

          <HStack space="lg" className="w-full justify-center">
            <Button
              variant="solid"
              action="primary"
              onPress={() => setShowModal(true)}
              className="gap-3 relative w-32"
            >
              <ButtonText>Edit</ButtonText>
              <ButtonIcon as={EditIcon} />
            </Button>
            <Button className="w-32" onPress={async () => { await logout(); router.replace("/auth/welcome"); }}>
              <ButtonText>Logout</ButtonText>
              <ButtonIcon as={LogOutIcon} />
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Center>
  );
}

const AccountSettingsView = () => {
  return (
    <VStack className="" space="2xl">
      <Heading className="font-roboto" size="xl">
        Account
      </Heading>
      <VStack className="py-2 px-4 rounded-xl justify-between items-center bg-white">
        <SettingsCard key={1} iconName={GoalIcon} subText={"Goals"} endIcon={ChevronRightIcon} />
        <SettingsCard key={2} iconName={HeartIcon} subText={"Preferences"} endIcon={ChevronRightIcon} />
        <SettingsCard key={3} iconName={BellIcon} subText={"Notifications"} endIcon={ChevronRightIcon} isLast={true} />
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
        <VStack className="h-full w-full mb-16 px-5" space="2xl">
          <Heading size="3xl">Hi, {user?.name}</Heading>
          <ProfileView user={user!} />
          <AccountSettingsView />
        </VStack>
      </ScrollView>
    </ContentLayout>
  );


};


