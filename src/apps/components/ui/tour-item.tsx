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
}

export const TourItem = React.memo(({ discount = 0, tour, rating = 3.5, horizontal = false }: Props) => {
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
							<Text style={styles.originalPrice}>{localePrice(tour.price ? tour.price : 0)}</Text>
							<Text style={styles.discountedPrice}>
								{localePrice(discountCalculation(tour.price ? tour.price : 0, discount))}
							</Text>
						</>
					) : (
						<Text style={styles.discountedPrice}>{localePrice(tour.price ? tour.price : 0)}</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
});

const { width } = Dimensions.get("window");
const cardWidth = width * 0.75;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 16,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		elevation: 4,
	},
	horizontalContainer: {
		width: cardWidth,
		marginRight: 15,
		height: 280,
	},
	containerDiscount: {
		borderWidth: 0,
	},
	imageContainer: {
		width: "100%",
		height: 180,
		position: "relative",
	},
	horizontalImageContainer: {
		width: "100%",
		height: 160,
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	gradientOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
		justifyContent: "flex-end",
		paddingBottom: 10,
		paddingHorizontal: 12,
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
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
		padding: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[950],
		marginBottom: 8,
	},
	infoRow: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginBottom: 8,
	},
	infoItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 16,
	},
	infoText: {
		fontSize: 12,
		color: Colors.gray[700],
		marginLeft: 4,
		fontWeight: "bold",
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	discountedPrice: {
		fontSize: 16,
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
		top: 10,
		left: 10,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	discountText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
	},
});
