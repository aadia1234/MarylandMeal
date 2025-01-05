import { Button, ScrollView, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import FoodCard from "@/components/FoodCard";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

export default function Food() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState([
    {
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

  return (
    <View>
      <VStack space="md">
        <Heading size="3xl" className="font-roboto">
          Jan 1st, 1970
        </Heading>
        <Input>
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search..."
          />
        </Input>
      </VStack>

      <VStack className="mt-5">
        {menu.map((food: FoodProps, i) => <FoodCard key={i} {...food} />)}
      </VStack>
    </View>
  );
}
