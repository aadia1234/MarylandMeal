import React, { useContext, useEffect, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { GlobeIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import { UserDocument } from "@/models/UserDocument";
import { getUser } from "@/api/userSession";
import { getMenu } from "@/api/menuSession";
import { FoodDocument } from "@/models/FoodDocument";
import Home from "./home/Home";
import Food from "./food/Food";
import Profile from "./profile/Profile";



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
              <HStack className="h-[100%] w-full">
                <View className="px-4 pt-20 w-full h-full bg-white">
                  {
                    user ? <Content activeTab={activeTab} className="" /> : <Text size="5xl">ERROR</Text>
                  }
                </View>
              </HStack>
              <HStack className="flex justify-between pb-10 pt-4 h-fit absolute bottom-0 border-t border-outline-200 bg-slate-100">
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
                            ? "text-primary-500"
                            : "text-typography-400"
                            }`}
                        />
                        <Text
                          size="xs"
                          className={`${activeTab === tab.label
                            ? "text-primary-500"
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
