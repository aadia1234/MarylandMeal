import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import "../global.css";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";


/* MUST USE BUILD VERSION TO FIX EXPO GO FONT LOADING ISSUES!!! */
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded, error] = useFonts({
    'Interstate Regular': require('@/assets/fonts/Interstate-Regular.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
