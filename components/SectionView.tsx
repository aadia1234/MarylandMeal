import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "./ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import React from "react";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";

export default function SectionView({ title, children }: { title: string, children: any }) {
    return (
        <Card size="md" variant="elevated" className="m-5 w-full h-fit rounded-2xl bg-white">
            <VStack>
                <HStack className="mb-2">
                    <Heading size="sm">{title}</Heading>
                </HStack>
                {children}
            </VStack>
            
        </Card>
    );
}