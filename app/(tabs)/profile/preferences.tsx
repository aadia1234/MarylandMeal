import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { CircleHelpIcon, Edit2Icon, HeartIcon, MenuIcon, PlusIcon, TrashIcon } from "lucide-react-native";
import { View } from "@/components/ui/view";
import { useCallback, useContext, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from "react-native-draggable-flatlist"
import { CloseIcon, Icon, createIcon } from "@/components/ui/icon";
import SwipeableItem, { useSwipeableItemParams } from 'react-native-swipeable-item'
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetIcon,
    ActionsheetFlatList,
} from "@/components/ui/actionsheet"
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal"
import { ScrollView } from "@/components/ui/scroll-view";
import { Circle, Path } from "react-native-svg";
import { VStack } from "@/components/ui/vstack";
import { UserContext } from "./user_provider";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";

export default function Preferences() {
    const { user, setUser } = useContext(UserContext);
    const preferencesDescription = "Personalize food choices, dining preferences, and allergens for your diet.";
    const [showModal, setShowModal] = useState(false);

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
                // <ScaleDecorator>
                    <TouchableOpacity
                        onLongPress={drag}
                    // disabled={isActive}
                    >
                        <HStack className="w-full justify-between items-center py-5">
                            <Text className="">{diningOrder.indexOf(item) + 1}. {item}</Text>
                            <Icon
                                as={MenuIcon}
                                className="px-4 stroke-background-800"
                                size="xl"
                            />
                        </HStack>
                    </TouchableOpacity>
                // </ScaleDecorator>
            );
        };

        return (
            <SectionView title="Dining Hall Preferences" icon={CircleHelpIcon} action={() => setShowModal(true)}>
                <Center className="w-full h-48">
                    <DraggableFlatList
                        data={diningOrder}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        onDragEnd={({ data }) => setDiningOrder(data)}
                    />
                </Center>
            </SectionView>
        );

    }

    const FoodView = () => {

        return (
            <SectionView title="Food Preferences" icon={Edit2Icon} action={() => { }}>
                <Text>Hello World!</Text>
            </SectionView>
        );

    }


    const AllergensView = () => {
        type AllergenType = { name: string, symbol: string, color: string };
        const swipeWidth = 75;
        const allergens = [
            { name: "Dairy", symbol: "D", color: "#1f4e79" },
            { name: "Eggs", symbol: "E", color: "#d4a017" },
            { name: "Fish", symbol: "F", color: "#c73d4b" },
            { name: "Gluten", symbol: "G", color: "#c45b31" },
            { name: "Nuts", symbol: "N", color: "#b94737" },
            { name: "Sesame", symbol: "SS", color: "#e2a655" },
            { name: "Shellfish", symbol: "SF", color: "#5da89b" },
            { name: "Soy", symbol: "S", color: "#71a33d" },
            { name: "Halal Friendly", symbol: "HF", color: "#4c78a8" },
            { name: "Locally Grown", symbol: "L", color: "#8a8d91" },
            { name: "Smart Choice", symbol: "🌿", color: "#ffcc5c" },
            { name: "Vegan", symbol: "VG", color: "#824e9e" },
            { name: "Vegetarian", symbol: "V", color: "#3f602b" }
        ];

        const [userAllergens, setUserAllergens] = useState<AllergenType[]>([]);
        const [showAllergens, setShowAllergens] = useState(false);

        const handleClose = () => setShowAllergens(false);

        const allergenIcon = (symbol: string, color: string) => {
            const radius = 12;

            const icon = createIcon({
                viewBox: "0 0 32 32",
                path: (
                    <>
                        <Path
                            d={`M 16 16 m -${radius}, 0 a ${radius},${radius} 0 1,0 ${2 * radius},0 a ${radius},${radius} 0 1,0 -${2 * radius},0`}
                            fill={color}
                            stroke={color}
                            strokeWidth="2"
                        />
                    </>
                ),
            })

            return icon;
        }

        const UnderlayRight = ({ allergen }: { allergen: AllergenType }) => {
            const { close } = useSwipeableItemParams<AllergenType>();

            // needs to be fixed
            const deleteAllergen = () => {
                setUserAllergens(userAllergens.filter((ua) => ua.name !== allergen.name));
                close();
            }
            
            return (
                <View className="flex-1 bg-red-500 flex-row align-center h-fit justify-start text-center pr-5">
                    <Center className={`w-[${swipeWidth}px]`}>
                        <Button variant="link" className="w-full" onPress={deleteAllergen}>
                            <ButtonIcon as={TrashIcon} size="lg" className="text-white"/>
                        </Button> 
                    </Center>
                </View>
            );
        };

        const renderItem: ListRenderItem<AllergenType> = useCallback(({ item: allergen }) => {
            return (
                <SwipeableItem
                    key={allergen.name}
                    item={allergen}
                    renderUnderlayRight={() => <UnderlayRight allergen={allergen} />}
                    snapPointsRight={[swipeWidth]}
                >
                    <HStack space="md" className="w-fit items-center py-3 bg-white">
                        <Icon
                            as={allergenIcon(allergen.symbol, allergen.color)}
                            className="aspect-square"
                            size="sm"
                        />
                        <Text className="">{allergen.name}</Text>
                    </HStack>
                </SwipeableItem>
            );
        }, []);

        return (
            <>
                <SectionView title="Allergens" icon={PlusIcon} action={() => { setShowAllergens(true) }}>
                    <VStack className="w-full">
                        <FlatList
                            keyExtractor={(allergen) => allergen.name}
                            data={userAllergens}
                            renderItem={renderItem}
                        />
                    </VStack>
                </SectionView>
                <Actionsheet isOpen={showAllergens} onClose={handleClose} snapPoints={[50]}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                            {allergens
                                .filter((allergen) => !userAllergens.some((ua) => ua.name === allergen.name))
                                .map((allergen) => {
                                    return (
                                        <ActionsheetItem key={allergen.name} onPress={() => { setUserAllergens(userAllergens.concat(allergen)); handleClose(); }}>
                                            <ActionsheetIcon as={allergenIcon(allergen.symbol, allergen.color)} />
                                            <ActionsheetItemText>{allergen.name}</ActionsheetItemText>
                                        </ActionsheetItem>
                                    );
                                })
                            }
                        </ScrollView>
                    </ActionsheetContent>
                </Actionsheet>
            </>
        );

    }


    return (
        <SettingsLayout data={[]} icon={HeartIcon} title="Preferences" description={preferencesDescription}>
            <DiningHallsView />
            <FoodView />
            <AllergensView />
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="md"
            >
                <ModalBackdrop />
                <ModalContent className="rounded-xl">
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Dining Hall Preferences
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text size="sm" className="text-typography-500">
                            Elevate user interactions with our versatile modals. Seamlessly
                            integrate notifications, forms, and media displays. Make an impact
                            effortlessly.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="rounded-lg" onPress={() => setShowModal(false)}>
                            <ButtonText>OK</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </SettingsLayout>
    );
}