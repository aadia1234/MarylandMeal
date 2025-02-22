import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { CircleHelpIcon, Edit2Icon, HeartIcon, MenuIcon, PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from "react-native-draggable-flatlist"
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@/components/ui/icon";


export default function Preferences() {
    const preferencesDescription = "Personalize food choices, dining preferences, and allergens for your diet.";


    type Item = {
        key: string;
        label: string;
        height: number;
        width: number;
        backgroundColor: string;
    };

    // (NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList - backed container instead. [Component Stack]
    // When using NestableDraggableFlatLists, all React Native warnings about nested list performance will be disabled.
    const DiningHallsView = () => {
        const diningHalls = ["251 North", "Yahentamitsi", "South Campus"];
        const [diningOrder, setDiningOrder] = useState(diningHalls);

        const renderItem = ({ item, drag, isActive }: RenderItemParams<string>) => {
            return (
                <ScaleDecorator>
                    <TouchableOpacity
                        onLongPress={drag}
                    // disabled={isActive}
                    >
                        <HStack className="w-full justify-between items-center py-5">
                            <Text className="">{item}</Text>
                            <Icon
                                as={MenuIcon}
                                className="px-4 stroke-background-800"
                                size="xl"
                            />
                        </HStack>
                    </TouchableOpacity>
                </ScaleDecorator>
            );
        };

        return (
            <SectionView title="Dining Hall Preferences" icon={CircleHelpIcon} action={() => { }}>
                <Center className="w-full h-fit">
                    <GestureHandlerRootView className="flex-1 w-full">
                        <DraggableFlatList
                            data={diningOrder}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                            onDragEnd={({ data }) => setDiningOrder(data)}
                        />
                    </GestureHandlerRootView>
                </Center>
            </SectionView>
        );

    }

    const FoodView = () => {

        return (
            <SectionView title="Food Preferences" icon={Edit2Icon} action={() => { }}>
                <Center className="w-full h-fit">
                </Center>
            </SectionView>
        );

    }


    const AllergensView = () => {

        return (
            <SectionView title="Allergens" icon={PlusIcon} action={() => { }}>
                <Center className="w-full h-fit">
                </Center>
            </SectionView>
        );

    }


    return (
        <SettingsLayout data={[]} icon={HeartIcon} title="Preferences" description={preferencesDescription}>
            <DiningHallsView />
            <FoodView />
            <AllergensView />
        </SettingsLayout>
    );
}