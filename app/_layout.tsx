import { Theme } from "@/constants/Colors";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import Tabbar from "./(tabs)/tabbar";

// type RootStackParamList = {
// 	Login: {userId: string};
// 	Home: undefined;
// 	Profile: { userId: string };
// 	Feed: { sort: 'latest' | 'top' } | undefined;
//   };

// export type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function AppLayout() {
  return (
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
