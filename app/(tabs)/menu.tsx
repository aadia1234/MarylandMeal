import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import FoodCard from "@/components/FoodCard";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Center } from "@/components/ui/center";
import { FoodDocument } from "@/models/FoodDocument";
import { Spinner } from "@/components/ui/spinner";
import ContentLayout from "../contentLayout";
import { getMenu, resetMenu } from "@/api/menuSession";


const HeaderView = (props: { setSearchText: any }) => {

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
          onChangeText={(text) => props.setSearchText(text.toLowerCase())}
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
  const [menu, setMenu] = useState<FoodDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    if (loading || searchText !== "") { return; }
    setLoading(true);
    const data = await getMenu();
    setMenu(data as FoodDocument[]);
    setLoading(false);
  };

  const onRefresh = () => {
    setMenu([]);
    resetMenu();
    fetchItems();
  };

  useEffect(() => { fetchItems() }, []);

  // VirtualizedList: You have a large list that is slow to update -
  // make sure your renderItem function renders components that follow React performance 
  // best practices like PureComponent, shouldComponentUpdate,
  // etc. { "contentLength": 9748.3330078125, "dt": 3067, "prevDt": 871 }




  const ListEmptyView = () => {
    return (
      <Center className="w-full h-[75%]">
        <Heading size="lg">No results found</Heading>
      </Center>
    );

  };

  const LoadingView = () => {
    return (
      <Center className="w-full h-full">
        <Spinner size="small" className="text-primary-500" />
      </Center>
    );
  };

  const FoodLogMemoView = useCallback(({ item }: { item: FoodDocument }) => (<FoodCard {...item} />), []);

  // if scrolled too fast it can bug out



  return (
    <ContentLayout>
      {
        menu.length > 0 ?
          <FlatList
            className="px-5"
            data={menu.filter((food) => food.menu_item.name.toLowerCase().includes(searchText.toLowerCase()))}
            renderItem={FoodLogMemoView}
            keyExtractor={(food) => food.id.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            onEndReached={fetchItems}
            onEndReachedThreshold={5}
            refreshing={loading}
            onRefresh={onRefresh}
            ListHeaderComponent={<HeaderView setSearchText={setSearchText} />}
            ListEmptyComponent={<ListEmptyView />}
            ListFooterComponent={() => loading && <Spinner size="small" className="text-primary-500" />}
            initialNumToRender={4}
            // getItemLayout={}
            removeClippedSubviews
          // windowSize={}
          // viewabilityConfig
          // debug
          /> :
          <LoadingView />
      }
    </ContentLayout>
  );
}
