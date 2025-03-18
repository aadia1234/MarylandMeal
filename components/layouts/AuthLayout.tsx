import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";

export default function AuthLayout(props: any) {
    return (
        <SafeAreaView className="w-full h-full bg-zinc-100">
            <ScrollView
                className="w-full h-full bg-current"
                contentContainerClassName="flex-grow pb-safe"
            >
                <VStack className="md:items-center md:justify-center h-full w-full px-9 ">
                    {props.children}
                </VStack>
                <HStack className="w-full h-full justify-center">
                    <VStack
                        className="relative hidden md:flex h-full w-full flex-1 items-center justify-center"
                        space="md"
                    >
                        <Image
                            height={100}
                            width={100}
                            source={require("@/assets/images/MarylandMeal.png")}
                            className="object-cover h-full w-full"
                            alt="MarylandMeals"
                        />
                    </VStack>
                </HStack>
            </ScrollView>
        </SafeAreaView>
    );
};