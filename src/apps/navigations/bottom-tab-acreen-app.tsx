<<<<<<< HEAD
import { HomeScreen, MessageScreen, SearchScreen, UserScreen } from "@/apps/screens";
import { Tab } from "@/libs/navigation";
import { Ionicons } from "@expo/vector-icons";
=======
import { Tab } from "@/libs/navigation";
import HomeStack from "../stacks/home-stack";
import SearchStack from "../stacks/search-stack";
import MessageStack from "../stacks/message-stack";
import UserStack from "../stacks/user-stack";
import HomeIcon from "@/assets/svgs/home";
import SearchIcon from "@/assets/svgs/search";
import MessageIcon from "@/assets/svgs/message";
import UserIcon from "@/assets/svgs/user";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b

export const BottomTabScreenApp = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconColor = focused ? "#fff" : "#461409";
					let backgroundColor = focused ? Colors.colorBrand.burntSienna[500] : "#fff";
					let size = 40;
					if (route.name === "HomeStack")
						return (
							<HomeIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
					else if (route.name === "SearchStack")
						return (
							<SearchIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
					else if (route.name === "MessageStack")
						return (
							<MessageIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
					else if (route.name === "UserStack")
						return (
							<UserIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
				},
				tabBarButton: (props: any) => (
					<TouchableOpacity
						{...props} // Chuyển tiếp tất cả các props
						activeOpacity={0.7} // Chỉnh độ mờ khi nhấn
					>
						{/* Thay icon theo từng route */}
						{props.children}
					</TouchableOpacity>
				),
				tabBarIconStyle: {
					width: "100%",
					height: "100%",
					margin: 0,
				},
				tabBarShowLabel: false,
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					borderTopRightRadius: 7,
					borderTopLeftRadius: 7,
				},
			})}
		>
			<Tab.Screen
				name="HomeStack"
<<<<<<< HEAD
				component={HomeScreen}
=======
				component={HomeStack}
				options={({ route }) => {
					const routeName = getFocusedRouteNameFromRoute(route);
					const hideTabBar = routeName === "TourDetailScreen";

					return {
						tabBarStyle: {
							display: hideTabBar ? "none" : "flex",
							borderTopRightRadius: 7,
							borderTopLeftRadius: 7,
						},
					};
				}}
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b
			/>
			<Tab.Screen
				name="SearchStack"
				component={SearchScreen}
			/>
			<Tab.Screen
				name="MessageStack"
				component={MessageScreen}
			/>
			<Tab.Screen
				name="UserStack"
				component={UserScreen}
			/>
		</Tab.Navigator>
	);
};
