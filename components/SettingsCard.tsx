import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React, { Fragment } from "react";
import { Divider } from "@/components/ui/divider";
import { AccountCardType } from "@/app/(tabs)/profile/AccountCardType";
import { Button } from "./ui/button";
import { Pressable } from "./ui/pressable";
import { Href, router } from "expo-router";

export default function SettingsCard(props: AccountCardType) {
    return (
        <>
            <Pressable className="h-fit" onPress={() => router.navigate(("/(tabs)/profile/" + props.subText.toLowerCase()) as Href)}>
                <HStack
                    space="2xl"
                    className="justify-between items-center w-full h-fit py-3 px-2"
                >
                    <HStack className="items-center" space="md">
                        <Icon as={props.iconName} className="stroke-[#747474]" />
                        <Text size="lg">{props.subText}</Text>
                    </HStack>
                    <Icon as={props.endIcon} />
                </HStack>
            </Pressable>
            {!props.isLast && <Divider className="my-1" />}
        </>
    );
}