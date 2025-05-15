import { Colors } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import { RootState, useAppDispatch } from "@/libs/redux/redux.config";
import { addFavoriteTour, fetchFavoriteTours, removeFavoriteTour } from "@/libs/redux/thunks/tour.thunk";
import { Tour } from "@/types/implement";
import { FontAwesome } from "@expo/vector-icons";
import { is } from "date-fns/locale";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const BookingButton = ({ tour }: { tour: Tour }) => {
	const [isSubbmitFavorite, setIsSubmitFavorite] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const favoriteItem = useSelector(
		(state: RootState) => state.favorite.data?.some((favorite) => favorite.tour.tourId === tour.tourId) ?? false,
	);

	const handleBooking = () => {
		navigate("PaymentScreen", {
			tourId: tour.tourId,
		});
	};

	const handleToggleFavorite = async () => {
		try {
			setIsSubmitFavorite(true);
			if (!favoriteItem) {
				// Add to favorite
				const result = await dispatch(addFavoriteTour(tour.tourId ?? ""));
				if (addFavoriteTour.fulfilled.match(result)) {
					Toast.show({
						type: "success",
						text1: "Đã thêm vào yêu thích!",
					});
				} else {
					Toast.show({
						type: "error",
						text1: "Thêm yêu thích thất bại",
					});
				}
			} else {
				// Remove from favorite
				const result = await dispatch(removeFavoriteTour(tour.tourId ?? ""));
				if (removeFavoriteTour.fulfilled.match(result)) {
					Toast.show({
						type: "info",
						text1: "Đã xóa khỏi yêu thích!",
					});
				} else {
					Toast.show({
						type: "error",
						text1: "Xóa yêu thích thất bại",
					});
				}
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Có lỗi xảy ra",
			});
		}
		setIsSubmitFavorite(false);
	};

	return (
		<View style={styles.bookingContainer}>
			<TouchableOpacity
				style={styles.favoriteButton}
				onPress={handleToggleFavorite}
				disabled={isSubbmitFavorite}
				activeOpacity={isSubbmitFavorite ? 1 : 0.7}
			>
				{isSubbmitFavorite ? (
					<ActivityIndicator
						size="small"
						color={Colors.colorBrand.burntSienna[500]}
					/>
				) : (
					<FontAwesome
						name={favoriteItem ? "heart" : "heart-o"}
						size={20}
						color={favoriteItem ? Colors.colorBrand.burntSienna[500] : Colors.gray[500]}
					/>
				)}
			</TouchableOpacity>
			<TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
				<Text style={styles.bookingText}>Đặt ngay ↗</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	bookingContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: Colors.gray[0],
		paddingVertical: 8,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
	},
	favoriteButton: {
		width: 48,
		height: 48,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#FF7F66",
		justifyContent: "center",
		alignItems: "center",
	},
	bookingButton: {
		flex: 1,
		marginLeft: 10,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 14,
	},
	bookingText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default BookingButton;
