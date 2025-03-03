import SectionView from "@/components/widgets/SectionView";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { BellIcon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors"
import { VStack } from "@/components/ui/vstack";
import { useContext } from "react";
import { UserContext } from "./user_provider";

export default function Notifications() {
    const { user, setUser } = useContext(UserContext);
    const preferencesDescription = "Personalize food choices, dining preferences, and allergens for your diet.";

    // (NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList - backed container instead. [Component Stack]
    // When using NestableDraggableFlatLists, all React Native warnings about nested list performance will be disabled.
    const AlertsView = () => {
        return (
            <SectionView title="Alerts">
                <Center className="w-full h-fit">
                    <VStack space="lg">
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="sm">Allow suggestions</Text>
                            <Switch
                                trackColor={{ false: colors.gray[300], true: colors.red[500] }}
                            // thumbColor={colors.gray[50]}
                            // activeThumbColor={colors.gray[50]}
                            // ios_backgroundColor={"255 255 255"}
                            />
                        </HStack>
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="sm">Alerts on when to eat</Text>
                            <Switch
                                trackColor={{ false: colors.gray[300], true: colors.red[500] }}
                            // thumbColor={colors.gray[50]}
                            // activeThumbColor={colors.gray[50]}
                            // ios_backgroundColor={"255 255 255"}
                            />
                        </HStack>
                        <HStack space="md" className="w-full items-center justify-between">
                            <Text size="sm">Alert when new meal plan is created</Text>
                            <Switch
                                trackColor={{ false: colors.gray[300], true: colors.red[500] }}
                            // thumbColor={colors.gray[50]}
                            // activeThumbColor={colors.gray[50]}
                            // ios_backgroundColor={"255 255 255"}
                            />
                        </HStack>
                    </VStack>
                </Center>
            </SectionView>
        );

    }


    return (
        <SettingsLayout data={[]} icon={BellIcon} title="Notifications" description={preferencesDescription}>
            <AlertsView />
        </SettingsLayout>
    );
}