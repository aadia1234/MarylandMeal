import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Card } from "../ui/card";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Button, ButtonIcon } from "../ui/button";
import { Center } from "../ui/center";

export default function SectionView({ title, children, icon, action }: { title: string, children: any, icon?: LucideIcon, action?: () => void }) {
    return (
        <Card size="md" variant="elevated" className="w-full h-fit m-5 px-5 rounded-xl bg-white">
            <VStack>
                <HStack className={`justify-between items-center mb-0`}>
                    <Heading size="sm">{title}</Heading>
                    {
                        icon && action &&
                        <Button variant="link" size="md" onPress={action} className="p-0 h-fit m-0">
                            <ButtonIcon as={icon} className="text-primary-500" />
                        </Button>
                    }
                </HStack>
                <Center className="w-full h-fit">
                    {children}
                </Center>
            </VStack>

        </Card>
    );
}