import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import React from "react";


export default function MacroCard(props: any) {
    return (
        <Center>
            <Card variant="outline" className="rounded-lg m-3 w-full">
                <VStack className="">
                    <Center>
                        <Image
                            source={require("@/assets/images/clock.png")}
                            className="mb-6 w-10 h-10 rounded-md"
                            alt="image"
                        />
                        <Text bold>{props.num}</Text>
                        <Text bold>{props.text}</Text>
                    </Center>
                </VStack>
            </Card>
        </Center>
    );
};