import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { View } from "@/components/ui/view";
import Allergen, { allergens } from "@/interfaces/Allergen";
import { createIcon, Icon } from "@/components/ui/icon";
import { Path } from "react-native-svg";
import { Center } from "../ui/center";
import AllergenView from "./AllergenView";

export default function FoodAllergenView({ data }: { data?: string[] }) {
    const foodAllergens = allergens.filter((allergen) => { return data?.includes(allergen.name) });

    return (
        <HStack space="xs" className="my-auto flex flex-row  items-center w-full justify-center">
            {foodAllergens.map((allergen, index) => {
                return (
                    <AllergenView size="sm" {...allergen} />
                );
            })}
        </HStack>
    );
}