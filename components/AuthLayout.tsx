import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";

export default function AuthLayout(props: any) {
    return (
        <SafeAreaView className="w-full h-full bg-white">
            <ScrollView
                className="w-full h-full"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <HStack className="w-full h-full bg-current flex-grow justify-center">
                    <VStack className="md:items-center md:justify-center flex-1 w-full p-9 md:gap-10 gap-16 md:m-auto md:w-1/2 h-full">
                        {props.children}
                    </VStack>
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