import { MinusIcon, PlusIcon } from "lucide-react-native";
import { Button, ButtonIcon } from "./ui/button";
import { HStack } from "./ui/hstack";
import { EditIcon, SearchIcon } from "./ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { Text } from "./ui/text";
import { Dispatch, SetStateAction } from "react";

export default function NumberSpinner({ value, setValue }: { value: number, setValue: Dispatch<SetStateAction<number>> }) {

    const changeValue = (amount: number) => {
        const result = value + amount;
        setValue(result === 0 ? value : result);
    }


    return (
        <HStack className="w-full">
            <Input className="flex-1">
                <InputSlot className="pl-3">
                    <InputIcon as={MinusIcon} className="text-primary-500" onTouchEnd={() => changeValue(-1)} />
                </InputSlot>
                <InputField editable={false} placeholder="" selectionColor="rgb(225, 25, 50)" defaultValue={value.toString()} inputMode="numeric" keyboardType="numeric" className="text-center" />
                <InputSlot className="pr-3">
                    <InputIcon as={PlusIcon} className="text-primary-500" onTouchEnd={() => changeValue(1)} />
                </InputSlot>
            </Input>
        </HStack>
    );
}