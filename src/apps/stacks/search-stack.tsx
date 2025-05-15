import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SearchScreen } from "../screens";
import { SearchResultsScreen } from "../screens/search-results";

const Stack = createNativeStackNavigator();
export default function SearchStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="SearchScreen"
				component={SearchScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SearchResultsScreen"
				component={SearchResultsScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
