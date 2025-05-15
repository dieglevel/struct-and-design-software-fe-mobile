<<<<<<< HEAD
import { LoginScreen, SignupScreen } from "@/apps/screens";
=======
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { LoginScreen, PaymentScreen, SignupScreen } from "@/apps/screens";
import { RootStackParamList, Stack } from "@/libs/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";
import { navigationRef } from "@/libs/navigation/navigationService";
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import { RootStackParamList, Stack, StackScreenNavigationProp } from "@/libs/navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
<<<<<<< HEAD
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";
import { useEffect } from "react";
import { eventEmitter } from "@/libs/eventemitter3";
=======
import WelcomeScreen from "../screens/home/welcome-screen";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/user-service";
import { setUser } from "@/libs/redux/stores/user.store.";
import { LoadingSpin } from "../components";
import * as Linking from 'expo-linking';

import React from "react";
const prefix = Linking.createURL('/');
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b

export const RootScreenApp = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			const profile = await getProfile();
			if (profile?.statusCode === 200) {
				dispatch(setUser(profile.data || null));
			}
			setIsLoading(false);
		};

		getUser();
	}, []);

	const linking: LinkingOptions<RootStackParamList> = {
		prefixes: [prefix, 'https://app.example.com', "myapp://"],
		config: {
			screens: {
				WelcomeScreen: "welcome",
				LoginScreen: "login",
				RegisterScreen: "register",
				ForgotPasswordScreen: "forgot-password",
				PaymentScreen: "payment",
				

			},
		},
	}

	const navigation = useNavigation<StackScreenNavigationProp>();

	useEffect(() => {
		const logoutListener = () => {
			navigation.navigate("LoginScreen");
		};

		eventEmitter.on("logout", logoutListener);

		return () => {
			eventEmitter.off("logout", logoutListener);
		};
	}, [navigation]);

	return (
		<>
<<<<<<< HEAD
			<Stack.Navigator
				initialRouteName="LoginScreen"
				screenOptions={{
					headerShown: false,
					animation: "fade_from_bottom",
				}}
			>
				<Stack.Screen
					name="BottomTabScreenApp"
					component={BottomTabScreenApp}
				/>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
				/>
				<Stack.Screen
					name="RegisterScreen"
					component={SignupScreen} // Add RegisterScreen here
				/>
				<Stack.Screen
					name="ForgotPassowrdScreen"
					component={ForgotPasswordScreen} // Add RegisterScreen here
				/>
			</Stack.Navigator>
			<Toast />
=======
			{isLoading ? (
				<LoadingSpin />
			) : (
				<NavigationContainer ref={navigationRef} linking={linking}>
					<Stack.Navigator
						initialRouteName="LoginScreen"
						screenOptions={{
							headerShown: false,
							animation: "fade_from_bottom",
						}}
					>
						<Stack.Screen
							name="WelcomeScreen"
							component={WelcomeScreen}
						/>
						<Stack.Screen
							name="BottomTabScreenApp"
							component={BottomTabScreenApp}
						/>
						<Stack.Screen
							name="LoginScreen"
							component={LoginScreen}
						/>
						<Stack.Screen
							name="RegisterScreen"
							component={SignupScreen}
						/>
						<Stack.Screen
							name="ForgotPasswordScreen"
							component={ForgotPasswordScreen}
						/>
						<Stack.Screen
							name="PaymentScreen"
							options={{
								headerShown: true,
							}}
							component={PaymentScreen}
						/>
					</Stack.Navigator>
					<Toast />
				</NavigationContainer>
			)}
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b
		</>
	);
};
