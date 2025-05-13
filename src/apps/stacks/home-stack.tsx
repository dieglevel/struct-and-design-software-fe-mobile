import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, TourDetailScreen } from "../screens";
import { CategoryDetailScreen } from "../screens/category-detail/category-detail";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="TourDetailScreen"
				component={TourDetailScreen}
				options={({ route }) => ({
					headerShown: true,
					presentation: "modal" 
				})}
			/>

			<Stack.Screen
				name="CategoryDetailScreen"
				component={CategoryDetailScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
