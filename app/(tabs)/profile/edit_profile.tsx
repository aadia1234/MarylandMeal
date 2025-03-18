import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { CheckIcon, UserPenIcon } from "lucide-react-native";
import { useContext, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { updateDateOfBirth, updateName } from "@/api/updateSession";
import { Input, InputField } from "@/components/ui/input";
import { UserContext } from "../../../components/navigation/UserProvider";
import Calendar from "@/components/widgets/Calendar";


export default function EditProfile() {
    const { user } = useContext(UserContext);
    const goalsDescription = "Set and customize weight and macro goals for your fitness journey.";

    const NamesView = () => {
        const [firstName, setFirstName] = useState(user.name.split(" ")[0]);
        const [lastName, setLastName] = useState(user.name.split(" ")[1]);

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
                            className="w-1/2 border-0"
                        >
                            <InputField
                                value={firstName}
                                placeholder="Enter your first name..."
                                onChangeText={(text) => setFirstName(text)}
                                selectionColor="#E11932"

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
                            className="w-1/2 border-0"
                        >
                            <InputField
                                value={lastName}
                                placeholder="Enter your last name..."
                                onChangeText={(text) => setLastName(text)}
                                selectionColor="#E11932"
                            />
                        </Input>
                    </HStack>
                </Center>
            </SectionView>
        );

    }

    const DateOfBirthView = () => {
        const [date, setDate] = useState(new Date(user.dateOfBirth));

        return (
            <SectionView title="Edit Date of birth" icon={CheckIcon} action={() => { updateDateOfBirth(date); }}>
                <Center className="w-full h-fit">
                    <HStack space="lg" className="justify-normal w-full py-1 items-center">
                        <Text>Date of Birth:</Text>
                        <Calendar date={date} setDate={setDate} placement="top" size="sm" />
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
            <DateOfBirthView />
        </SettingsLayout>
    );
}