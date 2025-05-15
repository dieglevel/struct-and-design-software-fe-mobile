import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreenBooking from "../screens/profile";
import { ProfileDetailsScreen } from "../screens/profile-details";
import { ProfileSecurityScreen } from "../screens/profile-security";
import { Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants";

const Stack = createNativeStackNavigator();
export default function UserStack() {
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ProfileScreenBooking"
				component={ProfileScreenBooking}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="ProfileDetailsScreen"
				component={ProfileDetailsScreen}
				options={{
					title: "Thông tin cá nhân",
					headerTitleAlign: "center",
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
						>
							<Ionicons
								name="chevron-back"
								size={24}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="ProfileSecurityScreen"
				component={ProfileSecurityScreen}
				options={{
					title: "Bảo mật tài khoản",
					headerTitleAlign: "center",
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
						>
							<Ionicons
								name="chevron-back"
								size={24}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack.Navigator>
	);
}
