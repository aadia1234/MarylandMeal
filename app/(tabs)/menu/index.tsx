import { FlatList, RefreshControl } from "react-native";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import FoodCard from "@/components/cards/FoodCard";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { CameraIcon, FilterIcon, SearchIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Center } from "@/components/ui/center";
import { Meal } from "@/interfaces/Meal";
import { Spinner } from "@/components/ui/spinner";
import ContentLayout from "@/components/layouts/ContentLayout";
import { getMenu, resetMenu } from "@/api/menuSession";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

import SidebarFilter from "@/components/widgets/FilterView";
import { TouchableWithoutFeedback } from "react-native";
import FilterView from "@/components/widgets/FilterView";
import HelpButton from "@/components/widgets/HelpButton";

const HeaderView = ({ setSearchText, menu, setMenu }: { setSearchText: Dispatch<SetStateAction<string>>, menu: Meal[], setMenu: Dispatch<SetStateAction<Meal[]>> }) => {

  return (
    <VStack space="md" className="sticky top-0 pb-3 bg-zinc-100">
      <HStack className="w-full items-center justify-between" >
        <Heading size="3xl" className="text-primary-600">
          Dining Hall Menu
        </Heading>
        <HStack space="2xl">
          <HelpButton title="Legend" message="Lorem Ipsum" />
          <FilterView menu={menu} setMenu={setMenu} />
        </HStack>
      </HStack>
      <Input className="bg-zinc-200 border-outline-100 rounded-lg">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          onChangeText={(text) => setSearchText(text.toLowerCase())}
          placeholder="Search..."
          selectionColor="rgb(225, 25, 50)"
          className="text-md"
        />
      </Input>
    </VStack>
  );
};

export default function Food() {
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState<Meal[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<Meal[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = async () => {
    if (refreshing || searchText !== "" || (filteredMenu.length == 0 && menu.length > 0)) { return; }
    setRefreshing(true);
    const data = await getMenu();
    setMenu(data as Meal[]);
    setFilteredMenu(data as Meal[]);
    setRefreshing(false);
  };

  const onRefresh = async () => {
    setMenu([]);
    resetMenu();
    await fetchItems();
    setFilteredMenu(menu);
  };

  useEffect(() => { fetchItems() }, []);

  // VirtualizedList: You have a large list that is slow to update -
  // make sure your renderItem function renders components that follow React performance 
  // best practices like PureComponent, shouldComponentUpdate,
  // etc. { "contentLength": 9748.3330078125, "dt": 3067, "prevDt": 871 }

  const MenuSpinner = () => {
    return (
      <Center>
        <Spinner size="small" className="py-10 text-primary-500" />
      </Center>
    );
  };

  const ListEmptyView = () => {
    return (
      <Center className="w-full h-[75%]">
        <Heading size="lg">No results found</Heading>
      </Center>
    );

  };



  const FoodLogMemoView = useCallback(({ item }: { item: Meal }) => (<FoodCard item={item} />), []);

  let searchFilter = (food: Meal) => {
    return food.menu_item.name.toLowerCase().includes(searchText.toLowerCase());
  }

  // const [filterMenu, setFilterMenu] = useState(searchFilter);


  // if scrolled too fast it can bug out
  // menu is null at certain times
  return (
    <ContentLayout data={1}>
      <FlatList
        className="px-5"
        data={filteredMenu.filter(searchFilter)}
        renderItem={FoodLogMemoView}
        keyExtractor={(food) => food.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        onEndReached={fetchItems}
        onEndReachedThreshold={5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["red"]} tintColor={"red"} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={<HeaderView setSearchText={setSearchText} menu={menu} setMenu={setFilteredMenu} />}
        ListEmptyComponent={<ListEmptyView />}
        ListFooterComponent={() => refreshing && <MenuSpinner />}
        initialNumToRender={4}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        removeClippedSubviews
      // getItemLayout={}
      // windowSize={}
      // viewabilityConfig
      // debug
      />
    </ContentLayout>
  );


}
