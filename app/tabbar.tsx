import React, { useContext, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { GlobeIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import Home from "./(tabs)/home";
import Food from "./(tabs)/food";
import { Box } from "@/components/ui/box";
import { ScrollView } from "@/components/ui/scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

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
    label: "Listing",
  },
  {
    icon: GlobeIcon,
    label: "Inbox",
    disabled: true,
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
    return <Food />;
  }
};

export default function Tabbar() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <View>
      <VStack className="h-full">
        <View className="">
          <VStack className="h-fit w-full bg-current">
            <VStack className="h-full w-full">
              <HStack className="h-[90%] w-full">
                <Box className="hidden md:flex h-full"></Box>
                <View className="pt-20">
                  <ScrollView showsVerticalScrollIndicator={false} className="p-4">
                    <Content activeTab={activeTab} />
                  </ScrollView>
                </View>
              </HStack>
              <HStack className="content-center justify-between w-full py-3 px-6 md:hidden h-full bg-gray-200">
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
                    >
                      <VStack className="items-center">
                        <Icon
                          as={GlobeIcon}
                          size={"md"}
                          className={`${
                            activeTab === tab.label
                              ? "text-typography-900"
                              : "text-typography-400"
                          }`}
                        />
                        <Text
                          size="xs"
                          className={`${
                            activeTab === tab.label
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
