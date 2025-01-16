import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React from "react";
import { Divider } from "@/components/ui/divider";
import { AccountCardType } from "@/app/profile/AccountCardType";

export default function SettingsCard(props: AccountCardType) {
    return (
        <React.Fragment>
            <HStack
                space="2xl"
                className="justify-between items-center w-full flex-1 py-3 px-2"
            >
                <HStack className="items-center" space="md">
                    <Icon as={props.iconName} className="stroke-[#747474]" />
                    <Text size="lg">{props.subText}</Text>
                </HStack>
                <Icon as={props.endIcon} />
            </HStack>
            {true && (
                <Divider className="my-1" />
            )}
        </React.Fragment>
    );
}