import { Colors } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import { Tour } from "@/types/implement";
import { localePrice } from "@/utils";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addHistoryTour } from "@/libs/redux/thunks/tour.thunk";
import { useAppDispatch } from "@/libs/redux/redux.config";
import { useNavigation } from "@react-navigation/native";

interface Props {
	tour: Tour;
	rating?: number;
	discount?: number;
	horizontal?: boolean;
	showDiscount?: boolean;
}

export const TourItem = React.memo(
	({ discount = 0, tour, rating = 3.5, horizontal = false, showDiscount = true }: Props) => {
		const dispatch = useAppDispatch();
		const discountCalculation = (price: number, discount: number) => {
			if (discount > 0) {
				return price - (price * discount) / 100;
			}
			return price;
		};
		const handleAddHistory = async () => {
			await dispatch(addHistoryTour(tour.tourId));
			navigate("TourDetailScreen", { tourId: tour.tourId });
		};

		return (
			<TouchableOpacity
				delayPressIn={500}
				style={[
					styles.container,
					horizontal ? styles.horizontalContainer : null,
					discount > 0 && styles.containerDiscount,
				]}
				onPress={handleAddHistory}
			>
				<View style={horizontal ? styles.horizontalImageContainer : styles.imageContainer}>
					<Image
						source={{ uri: tour.thumbnail }}
						style={styles.image}
						resizeMode="cover"
						borderTopLeftRadius={16}
						borderTopRightRadius={16}
					/>

					{/* Location tag */}
					<LinearGradient
						colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
						style={styles.gradientOverlay}
					>
						<View style={styles.locationContainer}>
							<Ionicons
								name="location"
								size={14}
								color="#fff"
							/>
							<Text
								style={styles.locationText}
								numberOfLines={1}
							>
								{tour.name ? tour.name.split(" - ")[1] || "Việt Nam" : "Việt Nam"}
							</Text>
						</View>
					</LinearGradient>

					{/* Favorite button */}
					{/* <TouchableOpacity style={styles.favoriteButton}>
					<Ionicons
						name="heart-outline"
						size={20}
						color="#fff"
					/>
				</TouchableOpacity> */}

					{discount > 0 && (
						<View style={styles.discountBadge}>
							<Text style={styles.discountText}>-{discount}%</Text>
						</View>
					)}
				</View>

				<View style={styles.details}>
					<Text
						style={styles.name}
						numberOfLines={horizontal ? 1 : 2}
					>
						{tour.name}
					</Text>

					<View style={styles.infoRow}>
						<View style={styles.infoItem}>
							<Ionicons
								name="time-outline"
								size={14}
								color={Colors.gray[500]}
							/>
							<Text style={styles.infoText}>{tour.duration}</Text>
						</View>

						<View style={styles.infoItem}>
							<Ionicons
								name="star"
								size={14}
								color="#FFD700"
							/>
							<Text style={styles.infoText}>{rating.toFixed(1)}</Text>
						</View>
					</View>

					<View style={styles.priceContainer}>
						{discount > 0 ? (
							<>
								{showDiscount && (
									<Text style={styles.originalPrice}>
										{localePrice(tour.price ? tour.price : 0)}
									</Text>
								)}
								<Text style={styles.discountedPrice}>
									{localePrice(discountCalculation(tour.price ? tour.price : 0, discount))}
								</Text>
							</>
						) : (
							<Text style={styles.discountedPrice}>
								{localePrice(tour.price ? tour.price : 0)}
							</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
		overflow: "hidden",
	},
	horizontalContainer: {
		width: 300,
		marginRight: 15,
	},
	containerDiscount: {
		borderWidth: 0,
	},
	imageContainer: {
		width: "100%",
		height: 180,
		position: "relative",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: "hidden",
	},
	horizontalImageContainer: {
		width: "100%",
		height: 160,
		position: "relative",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	gradientOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 80,
		justifyContent: "flex-end",
		paddingBottom: 12,
		paddingHorizontal: 12,
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	locationText: {
		color: "#fff",
		fontSize: 12,
		marginLeft: 4,
		fontWeight: "600",
	},
	favoriteButton: {
		position: "absolute",
		top: 10,
		right: 10,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	details: {
		flex: 1,
		padding: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[950],
		marginBottom: 12,
		lineHeight: 22,
	},
	infoRow: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginBottom: 12,
	},
	infoItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.gray[50],
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	infoText: {
		fontSize: 12,
		color: Colors.gray[700],
		marginLeft: 6,
		fontWeight: "600",
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 4,
	},
	discountedPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[600],
	},
	originalPrice: {
		fontSize: 14,
		color: Colors.gray[500],
		textDecorationLine: "line-through",
		marginRight: 8,
	},
	discountBadge: {
		position: "absolute",
		top: 12,
		left: 12,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 20,
	},
	discountText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
	},
});
