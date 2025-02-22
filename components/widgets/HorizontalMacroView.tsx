import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

export default function HorizontalMacroView(props: { data: { macro: string, amount: number }[] }) {
    return (
        <HStack className="flex flex-row items-center w-full">
            {props.data.map(({ macro, amount }, index) => {
                return (
                    <HStack className="w-full h-fit flex-row flex-1" key={index}>
                        <VStack className="items-center w-fit mx-auto" space="xs">
                            <Heading size="xs">{amount} g</Heading>
                            <Text size="xs">{macro}</Text>
                        </VStack>
                        {index !== props.data.length - 1 &&
                            <Divider
                                orientation="vertical"
                                className="self-center bg-background-300 h-10"
                            />
                        }
                    </HStack>
                );
            })}
        </HStack>
    );
}