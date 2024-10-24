import { Theme } from "@/constants/Colors";
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from "react-native";

// type RootStackParamList = {
// 	Login: {userId: string};
// 	Home: undefined;
// 	Profile: { userId: string };
// 	Feed: { sort: 'latest' | 'top' } | undefined;
//   };
  
// export type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function Layout() {
	return (
		<ThemeProvider value={Theme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</ThemeProvider>
	);
}
