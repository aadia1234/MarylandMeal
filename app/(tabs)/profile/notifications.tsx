import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { BellIcon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors"


export default function Notifications() {
    const preferencesDescription = "Personalize food choices, dining preferences, and allergens for your diet.";

    // (NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList - backed container instead. [Component Stack]
    // When using NestableDraggableFlatLists, all React Native warnings about nested list performance will be disabled.
    const DiningHallsView = () => {
        return (
            <SectionView title="Dining Hall Preferences">
                <Center className="w-full h-fit">
                    <HStack space="md" className="w-full items-center justify-between">
                        <Text size="sm">Allow notifications</Text>
                        <Switch
                            trackColor={{ false: colors.gray[300], true: colors.red[500] }}
                        // thumbColor={colors.gray[50]}
                        // activeThumbColor={colors.gray[50]}
                        // ios_backgroundColor={"255 255 255"}
                        />
                    </HStack>
                </Center>
            </SectionView>
        );

    }


    return (
        <SettingsLayout data={[]} icon={BellIcon} title="Notifications" description={preferencesDescription}>
            <DiningHallsView />
        </SettingsLayout>
    );
}