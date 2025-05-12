import { RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
	BottomTabScreenApp: undefined;
	LoginScreen: undefined;
	RegisterScreen: undefined;
	ForgotPasswordScreen: undefined;
	WelcomeScreen: undefined;
	// Register: undefined;
	// ProductDetail: { productId: string };
	// SubCategory: { categoryId: string };
	// PaymentOption: { selectedItems: CartItem[]; totalPrice: number };
	// Order: undefined;
	// OrderDetail: { order: Order };
	// Feedback: undefined;
	// PaymentResult: undefined;
	// Cart: { productId: string; callback: () => void };
	// ChatAdmin: { userId: string };
	TourDetailScreen: { tourId: string };
	ProfileScreen: undefined;
	ProfileScreenBooking: undefined;
	ProfileDetailsScreen: undefined;
	ProfileSecurityScreen: undefined;
	SearchResultsScreen: {
		departure?: string;
		destination?: string;
		departureDate?: string;
		returnDate?: string;
	};
	CategoryDetailScreen: {
		categoryId: string;
		categoryName: string;
		categoryIcon: string;
		categoryImage: string;
		categoryDescription: string;
	};
	PaymentScreen: undefined
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type StackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type TourDetailRouteProp = RouteProp<RootStackParamList, "TourDetailScreen">;

// export type ProductDetailRouteProp = RouteProp<
// 	RootStackParamList,
// 	'ProductDetail'
// >;
// export type OrderDetailRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;
// export type CartRouteProp = RouteProp<RootStackParamList, 'Cart'>;
// export type ChatAdminRouteProp = RouteProp<RootStackParamList, 'ChatAdmin'>;
// export type PaymentOptionRouteProp = RouteProp<
// 	RootStackParamList,
// 	'PaymentOption'
// >;
