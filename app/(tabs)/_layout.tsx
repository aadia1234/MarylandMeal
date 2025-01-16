import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function TabLayout() {
    return (

        <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }} >
            <SafeAreaView className="w-full h-full">
                <View className="px-4 w-full h-full">
                    <Tabs.Screen name="home" options={{ title: "Home" }} />
                    <Tabs.Screen name="menu" options={{ title: "Menu" }} />
                    <Tabs.Screen name="profile" options={{ title: "Profile" }} />
                </View>
            </SafeAreaView>
        </Tabs>
    );
}