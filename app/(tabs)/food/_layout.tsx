import { Theme } from "@/constants/Colors";
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";

  

export default function Layout() {
	return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
