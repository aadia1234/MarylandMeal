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

export default function Food() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 2,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 3,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 4,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 5,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 6,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 7,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 8,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 9,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 10,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 11,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 12,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 13,
      name: "Grilled Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
    {
      id: 14,
      name: "Rice Chicken",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ligula non ante auctor cursus at sed erat. Cras gravida neque libero, viverra auctor nunc condimentum vel. Mauris odio nisi, bibendum eu efficitur ut, vulputate in velit. Aenean vehicula cursus magna. Ut vestibulum ornare augue, a lobortis dui finibus non. Cras commodo ipsum eget nisl consequat, ut accumsan erat dapibus. Duis at suscipit leo. Nulla odio ipsum, tempus at maximus sit amet, egestas id turpis.",
      image: require("@/assets/images/MarylandMeal.png"),
      calories: 1000,
      carbs: 60,
      protein: 45,
      fat: 30,
    },
  ]);

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
      data={menu.filter((food) => food.name.toLowerCase().includes(searchText))}
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
