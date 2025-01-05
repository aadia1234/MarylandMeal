// import { Tabs } from 'expo-router';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Theme } from '@/constants/Colors';
// import { BlurView } from "expo-blur"
// import { StyleSheet, View } from 'react-native';
// import { BottomTabBarHeightContext, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


// const styles = StyleSheet.create({
// 	tabbar: {
// 		// bottom: 0,
// 		// left: 0,
// 		// right: 0,
// 		overflow: "hidden",
// 		backgroundColor: "transparent",
// 		...StyleSheet.absoluteFillObject,
// 	}
// });

// export default function TabLayout() {

// 	return (
// 		<Tabs screenOptions={{
// 			tabBarActiveTintColor: Theme.colors.primary,
// 			tabBarInactiveTintColor: Theme.colors.inactive,
// 			tabBarStyle: { position: "absolute" },
// 			tabBarBackground: () =>
// 				(<BlurView tint="systemChromeMaterial" intensity={50} style={styles.tabbar}></BlurView>)
// 		}}>
// 			<Tabs.Screen
// 				name="homes"
// 				options={{
// 					title: "Home",
// 					headerShown: false,
// 					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="food"
// 				options={{
// 					title: "Food",
// 					headerShown: false,
// 					tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="profile"
// 				options={{
// 					title: "Profile",
// 					tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
// 				}}
// 			/>
// 		</Tabs>
// 	);
// }