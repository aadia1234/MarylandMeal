import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import "../global.css";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function AppLayout() {

  return (
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
