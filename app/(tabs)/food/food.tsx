import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import FoodCard from "@/components/FoodCard";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { FoodDocument } from "@/models/FoodDocument";

export default function Food(props: { menu: FoodDocument[] }) {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const menu = props.menu;

  // VirtualizedList: You have a large list that is slow to update -
  // make sure your renderItem function renders components that follow React performance 
  // best practices like PureComponent, shouldComponentUpdate,
  // etc. { "contentLength": 9748.3330078125, "dt": 3067, "prevDt": 871 }

  const HeaderView = () => {
    return (
      <VStack space="md" className="sticky top-0 pb-3 bg-white">
        <Heading size="3xl" className="font-roboto">
          Dining Hall Menu
        </Heading>
        <Input className="">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            onChangeText={(text) => setSearchText(text.toLowerCase())}
            placeholder="Search..."
            className="text-md"
          />
        </Input>
      </VStack>
    );
  };

  const ListEmptyView = () => {
    return (
      <Center className="w-full h-[75%]">
        <Heading size="lg">No results found</Heading>
      </Center>
    );

  };

  return (
    <FlatList
      data={menu.filter((food) => food.menu_item.name.toLowerCase().includes(searchText.toLowerCase()))}
      renderItem={(elem) => <FoodCard {...elem.item} />}
      keyExtractor={(food) => food.id.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={HeaderView()}
      ListEmptyComponent={ListEmptyView()}
    />
  );
}
