import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "../ui/pressable";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";
import { Center } from "../ui/center";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import ContentLayout from "./ContentLayout";

export default function SettingsLayout(props: any) {
    return (
        <ContentLayout data={props.data}>
            <ScrollView
                className="w-full h-full"
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <VStack className="px-5">
                    <HStack className="items-center justify-between mb-10">
                        <Pressable onPress={() => { router.back(); }} >
                            <HStack>
                                <Icon
                                    as={ArrowLeftIcon}
                                    className="stroke-background-800"
                                    size="xl"
                                />
                                {/* <Text>Back</Text> */}
                            </HStack>
                        </Pressable>
                    </HStack>
                    <Center className="w-full">
                        <Card variant="elevated" className="w-full rounded-xl mb-14">
                            <VStack space="lg" className="items-center">
                                <Avatar size="xl" className="bg-primary-50">
                                    <Icon as={props.icon} className=" aspect-square h-12" />
                                </Avatar>
                                <VStack className="gap-1 w-full items-center">
                                    <Text size="2xl" className="font-roboto text-dark">
                                        {props.title}
                                    </Text>
                                    <Text className="font-roboto text-center text-sm text-typography-700">
                                        {props.description}
                                    </Text>
                                </VStack>
                            </VStack>
                        </Card>
                        {props.children}
                    </Center>
                </VStack>
            </ScrollView>
        </ContentLayout>
    );
};