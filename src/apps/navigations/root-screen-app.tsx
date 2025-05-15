import { LinkingOptions } from "@react-navigation/native";
import { LoginScreen, PaymentScreen, SignupScreen } from "@/apps/screens";
import { navigationRef } from "@/libs/navigation/navigationService";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import { RootStackParamList, Stack, StackScreenNavigationProp } from "@/libs/navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";
import { eventEmitter } from "@/libs/eventemitter3";
import WelcomeScreen from "../screens/home/welcome-screen";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/user-service";
import { setUser } from "@/libs/redux/stores/user.store.";
import { LoadingSpin } from "../components";
import * as Linking from "expo-linking";

import React from "react";
const prefix = Linking.createURL("/");

// Separate component for event listener logic inside NavigationContainer
const NavigationEventListener = () => {
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

	return null;
};

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
		prefixes: [prefix, "https://app.example.com", "myapp://"],
		config: {
			screens: {
				WelcomeScreen: "welcome",
				LoginScreen: "login",
				RegisterScreen: "register",
				ForgotPasswordScreen: "forgot-password",
				PaymentScreen: "payment",
			},
		},
	};

	return (
		<>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<NavigationContainer
					ref={navigationRef}
					linking={linking}
				>
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
					<NavigationEventListener />
					<Toast />
				</NavigationContainer>
			)}
		</>
	);
};
