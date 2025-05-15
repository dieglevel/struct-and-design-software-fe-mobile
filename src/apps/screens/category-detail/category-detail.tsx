import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	ActivityIndicator,
	RefreshControl,
	Dimensions,
	StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Texts } from "@/constants";
import { Tour } from "@/types/implement";
import { TourItem } from "@/apps/components/ui";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/libs/navigation/stack-navigator.config";
import { LinearGradient } from "expo-linear-gradient";
import { getToursByCategory } from "@/services/booking-service";

type CategoryDetailRouteProp = RouteProp<RootStackParamList, "CategoryDetailScreen">;

const { width, height } = Dimensions.get("window");

export const CategoryDetailScreen = () => {
	const navigation = useNavigation();
	const route = useRoute<CategoryDetailRouteProp>();
	const { categoryId, categoryName, categoryIcon, categoryImage, categoryDescription } = route.params;

	const [tours, setTours] = useState<Tour[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [sortOption, setSortOption] = useState<"price" | "rating" | "newest">("newest");
	const [filterVisible, setFilterVisible] = useState<boolean>(false);

	useEffect(() => {
		fetchToursByCategory();
	}, []);

	const fetchToursByCategory = async () => {
		try {
			setLoading(true);
			const response = await getToursByCategory(categoryId);

			if (response && response.data) {
				setTours(response.data);
			}
		} catch (error) {
			console.error("Error fetching tours by category:", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const onRefresh = () => {
		setRefreshing(true);
		fetchToursByCategory();
	};

	const sortTours = (tours: Tour[]) => {
		const sortedTours = [...tours];

		switch (sortOption) {
			case "price":
				return sortedTours.sort((a, b) => (a?.price || 0) - (b?.price || 0));
			// case "newest":
			default:
				return sortedTours;
		}
	};

	const renderHeader = () => (
		<View style={styles.headerContainer}>
			<ImageBackground
				source={{ uri: categoryImage }}
				style={styles.headerBackground}
			>
				<LinearGradient
					colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
					style={styles.gradient}
				>
					<View style={styles.headerContent}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => navigation.goBack()}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="white"
							/>
						</TouchableOpacity>

						<View style={styles.headerInfo}>
							<View style={styles.iconContainer}>
								<Ionicons
									name={categoryIcon as keyof typeof Ionicons.glyphMap}
									size={32}
									color={Colors.colorBrand.burntSienna[500]}
								/>
							</View>
							<Text style={styles.headerTitle}>{categoryName}</Text>
							<Text style={styles.tourCount}>Tìm thấy {tours.length} tour</Text>
						</View>
					</View>
				</LinearGradient>
			</ImageBackground>
		</View>
	);

	const renderDescription = () => (
		<View style={styles.descriptionContainer}>
			<Text style={styles.descriptionText}>
				{categoryDescription ||
					`Khám phá các tour du lịch ${categoryName} tuyệt vời nhất. Chúng tôi cung cấp những trải nghiệm độc đáo và đáng nhớ cho mọi du khách.`}
			</Text>
		</View>
	);

	const renderSortOptions = () => (
		<View style={styles.sortContainer}>
			<Text style={styles.sortText}>Sắp xếp theo:</Text>
			<View style={styles.sortOptions}>
				<TouchableOpacity
					style={[styles.sortOption, sortOption === "newest" && styles.sortOptionActive]}
					onPress={() => setSortOption("newest")}
				>
					<Text style={[styles.sortOptionText, sortOption === "newest" && styles.sortOptionTextActive]}>
						Mới nhất
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.sortOption, sortOption === "price" && styles.sortOptionActive]}
					onPress={() => setSortOption("price")}
				>
					<Text style={[styles.sortOptionText, sortOption === "price" && styles.sortOptionTextActive]}>
						Giá
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.sortOption, sortOption === "rating" && styles.sortOptionActive]}
					onPress={() => setSortOption("rating")}
				>
					<Text style={[styles.sortOptionText, sortOption === "rating" && styles.sortOptionTextActive]}>
						Đánh giá
					</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={styles.filterButton}
				onPress={() => setFilterVisible(!filterVisible)}
			>
				<Ionicons
					name="options-outline"
					size={20}
					color={Colors.colorBrand.midnightBlue[700]}
				/>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView
			style={styles.container}
			edges={["bottom"]}
		>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="light-content"
			/>

			<FlatList
				data={sortTours(tours)}
				keyExtractor={(item) => item.tourId}
				renderItem={({ item }) => (
					<View style={styles.tourItemContainer}>
						<TourItem
							tour={item}
							rating={4.5}
							discount={10}
							horizontal={false}
						/>
					</View>
				)}
				numColumns={2}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<>
						{renderHeader()}
						{renderDescription()}
						{renderSortOptions()}
					</>
				}
				ListEmptyComponent={
					!loading ? (
						<View style={styles.emptyContainer}>
							<Ionicons
								name="search-outline"
								size={64}
								color={Colors.gray[300]}
							/>
							<Text style={styles.emptyText}>Không tìm thấy tour nào cho danh mục này</Text>
							<TouchableOpacity
								style={styles.retryButton}
								onPress={fetchToursByCategory}
							>
								<Text style={styles.retryText}>Thử lại</Text>
							</TouchableOpacity>
						</View>
					) : null
				}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[Colors.colorBrand.burntSienna[500]]}
					/>
				}
			/>

			{loading && !refreshing && (
				<View style={styles.loaderContainer}>
					<ActivityIndicator
						size="large"
						color={Colors.colorBrand.burntSienna[500]}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray[50],
	},
	headerContainer: {
		height: height * 0.28,
		width: "100%",
	},
	headerBackground: {
		width: "100%",
		height: "100%",
	},
	gradient: {
		flex: 1,
		justifyContent: "flex-end",
	},
	headerContent: {
		padding: 20,
	},
	backButton: {
		position: "absolute",
		top: 20,
		left: 15,
		zIndex: 10,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	headerInfo: {
		alignItems: "center",
		marginBottom: 20,
	},
	iconContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
	},
	headerTitle: {
		...Texts.bold24,
		color: Colors.gray[0],
		marginBottom: 4,
		textTransform: "capitalize",
	},
	tourCount: {
		...Texts.regular14,
		color: Colors.gray[100],
	},
	sortContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 12,
		backgroundColor: Colors.gray[0],
		marginBottom: 10,
		borderRadius: 10,
		marginHorizontal: 15,
		marginTop: 0, // Changed from -20 to 0
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sortText: {
		...Texts.regular14,
		color: Colors.gray[600],
		marginRight: 10,
	},
	sortOptions: {
		flex: 1,
		flexDirection: "row",
	},
	sortOption: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginRight: 8,
		borderRadius: 20,
		backgroundColor: Colors.gray[100],
	},
	sortOptionActive: {
		backgroundColor: Colors.colorBrand.midnightBlue[100],
	},
	sortOptionText: {
		...Texts.regular12,
		color: Colors.gray[600],
	},
	sortOptionTextActive: {
		color: Colors.colorBrand.midnightBlue[800],
		fontWeight: "bold",
	},
	filterButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
	},
	listContent: {
		paddingBottom: 20,
	},
	tourItemContainer: {
		flex: 1,
		padding: 8,
	},
	loaderContainer: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(255,255,255,0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	emptyContainer: {
		padding: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyText: {
		...Texts.regular16,
		color: Colors.gray[500],
		marginTop: 16,
		marginBottom: 20,
		textAlign: "center",
	},
	retryButton: {
		paddingHorizontal: 30,
		paddingVertical: 12,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderRadius: 25,
	},
	retryText: {
		...Texts.bold16,
		color: Colors.gray[0],
	},

	// Add these new styles
	descriptionContainer: {
		backgroundColor: Colors.gray[0],
		marginHorizontal: 15,
		marginTop: -20,
		marginBottom: 15,
		borderRadius: 10,
		padding: 16,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	descriptionText: {
		...Texts.regular14,
		color: Colors.gray[700],
		lineHeight: 22,
		textAlign: "center",
	},
});
