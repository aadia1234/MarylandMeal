import React, { useContext, useEffect, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { GlobeIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FlatList, View } from "react-native";
import Home from "./home/home";
import Food from "./food/food";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "./profile/profile";
import { UserDocument } from "@/models/UserDocument";
import { getUser } from "@/api/userSession";
import { getMenu } from "@/api/menuSession";
import { FoodDocument } from "@/models/FoodDocument";



export default function Tabbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [user, setUser] = useState<UserDocument>();
  const [menu, setMenu] = useState<FoodDocument[]>([]);

  useEffect(() => { getUser().then((data) => setUser(data)) }, []);
  useEffect(() => { getMenu().then((data) => setMenu(data as FoodDocument[])) }, []);

  const bottomTabs = [
    {
      icon: GlobeIcon,
      label: "Home",
    },
    {
      icon: GlobeIcon,
      label: "Food",
    },
    {
      icon: GlobeIcon,
      label: "Profile",
    },
  ];

  const Content = (props: any) => {
    if (props.activeTab === "Home") {
      return <Home />;
    } else if (props.activeTab === "Food") {
      return <Food menu={menu!} />;
    } else {
      return <Profile {...user!} />;
    }
  };

  return (
    <View>
      <VStack className="h-full">
        <View className="">
          <VStack className="h-fit w-full bg-current">
            <VStack className="h-full w-full">
              <HStack className="h-[90%] w-full">
                <Box className="hidden md:flex h-full"></Box>
                <View className="px-4 pt-20 w-full h-full bg-white">
                  {
                    user ? <Content activeTab={activeTab} className="" /> : <Text size="5xl">ERROR</Text>
                  }
                </View>
              </HStack>
              <HStack className="flex justify-between py-4 md:hidden h-full bg-gray-200">
                {bottomTabs.map((tab: any) => {
                  return (
                    <Pressable
                      key={tab.label}
                      onPress={() => {
                        setActiveTab(tab.label);
                      }}
                      disabled={tab.disabled}
                      //   @ts-ignore
                      opacity={tab.disabled ? 0.5 : 1}
                      className="flex-1 flex-grow"
                    >
                      <VStack className="items-center">
                        <Icon
                          as={GlobeIcon}
                          size={"md"}
                          className={`${activeTab === tab.label
                            ? "text-typography-900"
                            : "text-typography-400"
                            }`}
                        />
                        <Text
                          size="xs"
                          className={`${activeTab === tab.label
                            ? "text-typography-900"
                            : "text-typography-400"
                            }`}
                        >
                          {tab.label}
                        </Text>
                      </VStack>
                    </Pressable>
                  );
                })}
              </HStack>
            </VStack>
          </VStack>
        </View>
      </VStack>
    </View>
  );
}
