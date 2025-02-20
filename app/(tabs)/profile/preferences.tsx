import SectionView from "@/components/SectionView";
import SettingsLayout from "@/components/SettingsLayout";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";
import { ChevronDownIcon, ChevronUpIcon, GoalIcon, HeartIcon, MenuIcon, PlusIcon, Target, TargetIcon, Wifi } from "lucide-react-native";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { View } from "@/components/ui/view";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
    SelectScrollView,
} from "@/components/ui/select"
import DraggableFlatList, { NestableScrollContainer, NestableDraggableFlatList, ScaleDecorator, RenderItemParams } from "react-native-draggable-flatlist"
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
            <SectionView title="Dining Hall Preferences">
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
        const [diningOrder, setDiningOrder] = useState(["251 North", "Yahentamitsi", "South Campus"]);

        return (
            <SectionView title="Food Preferences">
                <Center className="w-full h-full">
                </Center>
            </SectionView>
        );

    }


    const AllergensView = () => {

        return (
            <SectionView title="Allergens" icon={PlusIcon} action={() => {}}>
                <Center className="w-full h-fit">
                </Center>
            </SectionView>
        );

    }


    return (
        <SettingsLayout data={[]} icon={HeartIcon} title="Preferences" description={preferencesDescription}>
            <DiningHallsView />
            {/* <FoodView /> */}
            <AllergensView />
        </SettingsLayout>
    );
}