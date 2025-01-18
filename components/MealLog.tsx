import { FoodDocument } from "@/models/FoodDocument";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "./ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import FoodCard from "./FoodCard";
import React from "react";

export default function MealLog({ title, log }: { title: string, log?: FoodDocument[] }) {
    return (
        <Accordion
            size="md"
            variant="unfilled"
            type="single"
            defaultValue={["a"]}
            className="m-5 w-full border border-outline-200"
        >
            <AccordionItem value="a">
                <AccordionHeader>
                    <AccordionTrigger>
                        {({ isExpanded }) => {
                            return (
                                <>
                                    <AccordionTitleText>{title}</AccordionTitleText>
                                    {isExpanded ? (
                                        <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                                    ) : (
                                        <AccordionIcon
                                            as={ChevronDownIcon}
                                            className="ml-3"
                                        />
                                    )}
                                </>
                            );
                        }}
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                    {log?.map((item, index) => <FoodCard {...item!} key={index} />)}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}