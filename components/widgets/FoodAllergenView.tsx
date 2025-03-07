import React from "react";
import { HStack } from "@/components/ui/hstack";
import { allergens } from "@/types/Allergen";
import AllergenView from "./AllergenView";

export default function FoodAllergenView({ data }: { data?: string[] }) {
    const foodAllergens = allergens.filter((allergen) => { return data?.includes(allergen.name) });

    return (
        <HStack space="xs" className="my-auto flex flex-row  items-center w-full justify-center">
            {foodAllergens.map((allergen, index) => {
                return (
                    <AllergenView key={index} size="sm" {...allergen} />
                );
            })}
        </HStack>
    );
}