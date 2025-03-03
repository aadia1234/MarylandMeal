import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Accordion, AccordionContent, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";
import { CheckIcon, ChevronDownIcon, GoalIcon, SparkleIcon, SparklesIcon, UserPenIcon } from "lucide-react-native";
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
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
import { updateGoalMacros, updateName, updateWeight } from "@/api/updateSession";
import Macros from "@/interfaces/Macros";
import { Input, InputField } from "@/components/ui/input";
import { UserContext } from "./user_provider";

export default function EditProfile() {
    const { user } = useContext(UserContext);
    const goalsDescription = "Set and customize weight and macro goals for your fitness journey.";

    const NamesView = () => {
        const [firstName, setFirstName] = useState(user?.name.split(" ")[0]);
        const [lastName, setLastName] = useState(user?.name.split(" ")[1]);

        return (
            <SectionView title="Edit Name" icon={CheckIcon} action={() => { updateName(firstName + " " + lastName); }}>
                <Center className="w-full h-fit">
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>First Name:</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            className="w-1/2"
                        >
                            <InputField
                                value={firstName}
                                placeholder="Enter Text here..."
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </Input>
                    </HStack>
                    <Divider />
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>Last Name:</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                            className="w-1/2"
                        >
                            <InputField 
                                value={lastName}
                                placeholder="Enter Text here..."
                                onChangeText={(text) => setLastName(text)}    
                            />
                        </Input>
                    </HStack>
                </Center>
            </SectionView>
        );

    }

    // ui bugs when loading isn't instantaneous
    return (
        <SettingsLayout data={{}} icon={UserPenIcon} title={"Edit Profile"} description={goalsDescription}>
            {/* <WeightGoalsView />
            <MacroGoals /> */}
            <NamesView />
        </SettingsLayout>
    );
}