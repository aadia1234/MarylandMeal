import Tabbar from "@/components/navigation/Tabbar";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <Tabbar {...props} />} screenOptions={{ headerShown: false, lazy: false }} >
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="menu" options={{ title: "Menu" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}