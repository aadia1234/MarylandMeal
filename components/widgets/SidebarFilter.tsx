import {
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
    CheckboxGroup,
} from "@/components/ui/checkbox"
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    FormControlHelperText,
} from "@/components/ui/form-control"
import { VStack } from "@/components/ui/vstack"
import { CheckIcon } from "@/components/ui/icon"
import React, { useState } from "react"


const CheckboxFilterView = ({ title, options, values, setValues }: { title: string, options: string[], values: string[], setValues: any }) => {

    return (
        <VStack>
            <FormControlLabel>
                <FormControlLabelText>{title}</FormControlLabelText>
            </FormControlLabel>
            <CheckboxGroup
                className="my-2"
                value={values}
                onChange={(keys) => {
                    setValues(keys)
                }}
            >
                <VStack space="sm">
                    {options.map((option) => {
                        return (
                            <Checkbox size="sm" value={option}>
                                <CheckboxIndicator className="mr-2">
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>
                                <CheckboxLabel>{option}</CheckboxLabel>
                            </Checkbox>
                        );
                    })}
                </VStack>
            </CheckboxGroup>
            <FormControlHelper>
                <FormControlHelperText>
                    Select which dining halls you'd like to view meals from
                </FormControlHelperText>
            </FormControlHelper>
        </VStack>
    );
}


export default function SidebarFilter() {
    const diningHalls = ["Yahentamitsi", "South Campus", "251 North"];
    const allergens = ["fish", "prawn"];
    const [selectedDiningHalls, setSelectedDiningHalls] = useState([]);
    const [selectedAllergens, setSelectedAllergens] = useState([]);


    return (
        <FormControl className="w-full h-full p-5">
            <VStack space="4xl">
                <CheckboxFilterView title="Dining Halls" options={diningHalls} values={selectedDiningHalls} setValues={setSelectedDiningHalls} />
                <CheckboxFilterView title="Allergens" options={allergens} values={selectedAllergens} setValues={setSelectedAllergens} />
            </VStack>
        </FormControl>
    );
}