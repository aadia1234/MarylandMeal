import SectionView from "@/components/SectionView";
import SettingsLayout from "@/components/SettingsLayout";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";
import { ChevronDownIcon, GoalIcon, SparkleIcon, SparklesIcon } from "lucide-react-native";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { View } from "@/components/ui/view";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem,
    SelectScrollView,
} from "@/components/ui/select"
import { User } from "@/interfaces/User";
import { getUser } from "@/api/userSession";
import { updateGoalMacros, updateWeight } from "@/api/updateSession";
import Macros from "@/interfaces/Macros";

export default function Goals() {
    const [user, setUser] = useState<User>();
    const [macros, setMacros] = useState<Macros>({
        calories: 0,
        fats: 0,
        protein: 0,
        carbs: 0
    });
    const [userUpdated, setUserUpdated] = useState(false);
    const goalsDescription = "Set and customize weight and macro goals for your fitness journey.";

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
            setMacros(user.goalMacros);
            setUserUpdated(false);
        })
    }, [userUpdated]);


    const WeightGoalsView = () => {
        const [selectedWeight, setSelectedWeight] = useState(0);

        const WeightRow = ({ title, weight }: { title: string, weight?: number }) => {
            const weights = Array.from({ length: 200 }, (_, i) => (i+1) * 2.5);
            const isGoalWeight = title.toLowerCase().includes("goal");

            return (
                <HStack className="justify-between w-full py-1 items-center">
                    <Text>{title}</Text>
                    <Select onValueChange={(weight) => updateWeight(isGoalWeight ? { targetWeight: parseInt(weight) } : { currentWeight: parseInt(weight) })}>
                        <SelectTrigger variant="outline" size="md" className="border-0">
                            <SelectInput placeholder={weight + " lbs"} className="text-primary-700" />
                            <SelectIcon className="mr-1" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal snapPoints={[50]}>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectScrollView>
                                    {weights.map((wt, index) => <SelectItem label={wt + " lbs"} value={wt.toString()} key={index} />)}
                                </SelectScrollView>
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </HStack>
            );
        }

        return (
            <SectionView title="Weight Goals" icon={SparkleIcon} action={() => {}}>
                <Center className="w-full h-fit">
                    <WeightRow title="Current Weight" weight={user?.currentWeight} />
                    <Divider />
                    <WeightRow title="Goal Weight" weight={user?.goalWeight} />
                </Center>

            </SectionView>
        );

    }

    const MacroGoals = () => {
        const [selectedGrams, setSelectedGrams] = useState(0);
        const [selectedCalories, setSelectedCalories] = useState(0);

        const MacroRow = ({ macro, amount }: { macro: string, amount: number }) => {
            const title = macro[0].toUpperCase() + macro.substring(1, macro.length) + " Goal";
            const grams = Array.from({ length: 201 }, (_, i) => i * 5);
            const calories = Array.from({ length: 201 }, (_, i) => i * 25)
            const isCalories = macro === "calorie";

            function updateMacro(amt: number) {
                if (isCalories) {
                    macros.calories = amt;
                } else if (macro === "protein") {
                    macros.protein = amt;
                } else if (macro === "carbs") {
                    macros.carbs = amt;
                } else {
                    macros.fats = amt;
                }

                console.log(macros);

                updateGoalMacros(macros);
            }

            return (
                <HStack className="justify-between w-full py-1 items-center">
                    <Text>{title}</Text>
                    <Select onValueChange={(amt) => updateMacro(parseInt(amt))}>
                        <SelectTrigger variant="outline" size="md" className="border-0">
                            <SelectInput placeholder={amount + (isCalories ? " Cal" : " g")} className="text-primary-700" />
                            <SelectIcon className="mr-1" as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal snapPoints={[50]}>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectScrollView>
                                    {isCalories ?
                                        calories.map((cal, index) => <SelectItem label={cal + " Cal"} value={cal.toString()} key={index} />)
                                        :
                                        grams.map((gram, index) => <SelectItem label={gram + " g"} value={gram.toString()} key={index} />)}
                                </SelectScrollView>
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </HStack>
            );
        }

        return (
            <SectionView title="Daily Macro Goals" icon={SparklesIcon} action={() => { }}>
                <Center className="w-full h-fit">
                    <MacroRow macro="calorie" amount={macros.calories} />
                    <Divider />
                    <MacroRow macro="protein" amount={macros.protein} />
                    <Divider />
                    <MacroRow macro="carbs" amount={macros.carbs} />
                    <Divider />
                    <MacroRow macro="fats" amount={macros.fats} />
                </Center>
            </SectionView>
        );

    }

    // ui bugs when loading isn't instantaneous
    return (
        <SettingsLayout data={{}} icon={GoalIcon} title={"Goals"} description={goalsDescription}>
            <WeightGoalsView />
            <MacroGoals />
        </SettingsLayout>
    );
}