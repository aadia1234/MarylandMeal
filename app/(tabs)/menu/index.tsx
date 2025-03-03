import { FlatList } from "react-native";
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
import { Button, ButtonIcon } from "@/components/ui/button";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet"
import SidebarFilter from "@/components/widgets/SidebarFilter";
import { TouchableWithoutFeedback } from "react-native";

const HeaderView = ({ setSearchText, menu }: { setSearchText: Dispatch<SetStateAction<string>>, menu: Meal[] }) => {

  const FilterView = () => {
    const [showActionsheet, setShowActionsheet] = useState(false);
    const handleClose = () => setShowActionsheet(false);
    const DATA = [
      {
        title: "Gender",
        data: ["Men", "Women", "Boy", "Girl"],
      },
    ]

    return (
      <>
        <Button variant="link" size="md" className="rounded-md" onPress={() => setShowActionsheet(true)}>
          <ButtonIcon as={FilterIcon} />
        </Button>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose} snapPoints={[50]}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <SidebarFilter />
          </ActionsheetContent>
        </Actionsheet>
      </>
    );
  }

  return (
    <VStack space="md" className="sticky top-0 pb-3 bg-zinc-100">
      <HStack className="w-full items-center justify-between" >
        <Heading size="3xl" className="text-primary-600">
          Dining Hall Menu
        </Heading>
        <Button variant="link" size="md" className="rounded-md">
          <ButtonIcon as={CameraIcon} />
        </Button>
        <FilterView />
      </HStack>
      <Input className="bg-zinc-200 border-outline-100">
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
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    if (loading || searchText !== "") { return; }
    setLoading(true);
    const data = await getMenu();
    setMenu(data as Meal[]);
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



  const FoodLogMemoView = useCallback(({ item }: { item: Meal }) => (<FoodCard item={item} />), []);

  // if scrolled too fast it can bug out

  // menu is null at certain times
  return (
    <ContentLayout data={1}>
      <FlatList
        className="px-5"
        data={menu?.filter((food) => food.menu_item.name.toLowerCase().includes(searchText.toLowerCase()))}
        renderItem={FoodLogMemoView}
        keyExtractor={(food) => food.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        onEndReached={fetchItems}
        onEndReachedThreshold={5}
        refreshing={loading}
        onRefresh={onRefresh}
        ListHeaderComponent={<HeaderView setSearchText={setSearchText} menu={menu} />}
        ListEmptyComponent={<ListEmptyView />}
        ListFooterComponent={() => loading && <Spinner size="small" className="text-primary-500" />}
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
