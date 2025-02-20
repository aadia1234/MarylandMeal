import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "./ui/accordion";
import { ChevronDownIcon, ChevronUpIcon, LucideIcon } from "lucide-react-native";
import React from "react";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Icon } from "./ui/icon";
import { Button, ButtonIcon } from "./ui/button";

export default function SectionView({ title, children, icon, action }: { title: string, children: any, icon?: LucideIcon, action?: () => void }) {
    return (
        <Card size="md" variant="elevated" className="w-full h-fit m-5 px-5 rounded-2xl bg-white">
            <VStack>
                <HStack className="mb-2 justify-between">
                    <Heading size="sm">{title}</Heading>
                    {
                        icon && action &&
                        <Button variant="link" size="md" onPress={action} className="p-0 h-fit m-0">
                            <ButtonIcon as={icon} />
                        </Button>
                    }
                </HStack>
                {children}
            </VStack>
            
        </Card>
    );
}