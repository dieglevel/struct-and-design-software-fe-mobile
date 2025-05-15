import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ScrollView,
	Modal,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TourItem } from "../components/ui";
import { Colors } from "@/constants";
import { Tour } from "@/types/implement";
import { searchTours } from "@/services/tour-service";
import { InputForm } from "../components/ui";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Button } from "../components/ui";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Cities available for filtering
const cities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Nha Trang", "Đà Lạt", "Phú Quốc", "Hạ Long", "Hội An"];

// Categories for tours
const categories = ["Biển", "Núi", "Văn hóa", "Ẩm thực", "Mạo hiểm", "Nghỉ dưỡng", "Thăm quan", "Trải nghiệm"];

// Define search params interface
interface SearchParams {
	query?: string;
	minPrice?: number;
	maxPrice?: number;
	city?: string;
	destination?: string;
	category?: string;
}

// Define route params interface
interface RouteParams {
	params?: {
		departure?: string;
		destination?: string;
		departureDate?: string;
		returnDate?: string;
	};
}

export const SearchResultsScreen = ({ route }: { route: RouteParams }) => {
	const navigation = useNavigation<any>();
	// Initial search parameters from search screen
	const initialParams = route.params || {};

	// Filter states
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(10000000); // 10 million VND
	const [selectedCity, setSelectedCity] = useState(initialParams.departure || "");
	const [selectedDestination, setSelectedDestination] = useState(initialParams.destination || "");
	const [selectedCategory, setSelectedCategory] = useState("");

	// UI states
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [tours, setTours] = useState<Tour[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// Search query text
	const [searchQuery, setSearchQuery] = useState(initialParams.destination || "");

	// Function to perform API search
	const performSearch = async (params: SearchParams) => {
		try {
			setLoading(true);

			// Convert filter parameters to Tour object for API
			const tourSearchParams: Tour = {
				tourId: "",
				name: params.query || undefined,
				price: params.maxPrice || undefined,
				// Additional filters can be added based on your API capability
			};

			const response = await searchTours(tourSearchParams);

			if (response.data) {
				// Apply client-side filtering for parameters not supported by API
				let filteredResults = response.data;

				// Filter by price range
				if (params.minPrice !== undefined) {
					filteredResults = filteredResults.filter((tour) => (tour.price || 0) >= params.minPrice!);
				}

				// Filter by destination if selected
				if (params.destination) {
					filteredResults = filteredResults.filter((tour) => {
						return tour.tourDestinationResponses?.some((dest) =>
							dest.name?.toLowerCase().includes(params.destination!.toLowerCase()),
						);
					});
				}

				// More client-side filters can be added here

				setTours(filteredResults);
			} else {
				setTours([]);
			}
		} catch (error) {
			console.error("Error searching tours:", error);
			setTours([]);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	// Debounced search function
	const debouncedSearch = useCallback(
		debounce((params: SearchParams) => {
			performSearch(params);
		}, 500),
		[],
	);

	// Apply all current filters
	const applyFilters = () => {
		const params: SearchParams = {
			query: searchQuery,
			minPrice: minPrice,
			maxPrice: maxPrice,
			city: selectedCity,
			destination: selectedDestination,
			category: selectedCategory,
		};

		performSearch(params);
		setIsFilterVisible(false);
	};

	// Reset all filters
	const resetFilters = () => {
		setMinPrice(0);
		setMaxPrice(10000000);
		setSelectedCity("");
		setSelectedDestination("");
		setSelectedCategory("");
	};

	// Handle search query text change
	const handleSearchChange = (text: string) => {
		setSearchQuery(text);

		debouncedSearch({
			query: text,
			minPrice: minPrice,
			maxPrice: maxPrice,
			city: selectedCity,
			destination: selectedDestination,
			category: selectedCategory,
		});
	};

	// Handle refresh
	const handleRefresh = () => {
		setRefreshing(true);
		applyFilters();
	};

	// Initial search on component mount
	useEffect(() => {
		const params: SearchParams = {
			query: initialParams.destination || "",
			minPrice: minPrice,
			maxPrice: maxPrice,
			city: initialParams.departure || "",
			destination: initialParams.destination || "",
			category: selectedCategory,
		};

		performSearch(params);
	}, []);

	// Format price to VND
	const formatPrice = (price: number) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
	};

	// Render empty state
	const renderEmptyState = () => (
		<View style={styles.emptyContainer}>
			<MaterialIcons
				name="search-off"
				size={64}
				color={Colors.gray[400]}
			/>
			<Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>
			<Text style={styles.emptySubtext}>Vui lòng thử lại với bộ lọc khác</Text>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header with back button and search input */}
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Ionicons
						name="arrow-back"
						size={24}
						color={Colors.gray[800]}
					/>
				</TouchableOpacity>

				<View style={styles.searchContainer}>
					<InputForm
						label=""
						placeholder="Tìm kiếm tour..."
						value={searchQuery}
						onChangeText={handleSearchChange}
						left={
							<Ionicons
								name="search"
								size={20}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						}
						style={styles.searchInput}
						inputContainerStyle={styles.searchInputContainer}
					/>
				</View>

				<TouchableOpacity
					onPress={() => setIsFilterVisible(true)}
					style={styles.filterButton}
				>
					<Ionicons
						name="filter"
						size={24}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				</TouchableOpacity>
			</View>

			{/* Results count and sort */}
			<View style={styles.resultInfo}>
				<Text style={styles.resultCount}>
					{tours.length} kết quả {selectedDestination ? `cho "${selectedDestination}"` : ""}
				</Text>
				<TouchableOpacity style={styles.sortButton}>
					<Text style={styles.sortText}>Sắp xếp</Text>
					<Ionicons
						name="chevron-down"
						size={16}
						color={Colors.gray[700]}
					/>
				</TouchableOpacity>
			</View>

			{/* Filter tags */}
			{(selectedCity || selectedDestination || selectedCategory || minPrice > 0 || maxPrice < 10000000) && (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.filterTagsContainer}
					contentContainerStyle={styles.filterTagsContent}
				>
					{selectedCity && (
						<View style={styles.filterTag}>
							<Text style={styles.filterTagText}>Từ: {selectedCity}</Text>
							<TouchableOpacity onPress={() => setSelectedCity("")}>
								<Ionicons
									name="close-circle"
									size={16}
									color={Colors.gray[600]}
								/>
							</TouchableOpacity>
						</View>
					)}

					{selectedDestination && (
						<View style={styles.filterTag}>
							<Text style={styles.filterTagText}>Đến: {selectedDestination}</Text>
							<TouchableOpacity onPress={() => setSelectedDestination("")}>
								<Ionicons
									name="close-circle"
									size={16}
									color={Colors.gray[600]}
								/>
							</TouchableOpacity>
						</View>
					)}

					{selectedCategory && (
						<View style={styles.filterTag}>
							<Text style={styles.filterTagText}>{selectedCategory}</Text>
							<TouchableOpacity onPress={() => setSelectedCategory("")}>
								<Ionicons
									name="close-circle"
									size={16}
									color={Colors.gray[600]}
								/>
							</TouchableOpacity>
						</View>
					)}

					{(minPrice > 0 || maxPrice < 10000000) && (
						<View style={styles.filterTag}>
							<Text style={styles.filterTagText}>
								{formatPrice(minPrice)} - {formatPrice(maxPrice)}
							</Text>
							<TouchableOpacity
								onPress={() => {
									setMinPrice(0);
									setMaxPrice(10000000);
								}}
							>
								<Ionicons
									name="close-circle"
									size={16}
									color={Colors.gray[600]}
								/>
							</TouchableOpacity>
						</View>
					)}

					<TouchableOpacity
						style={[styles.filterTag, styles.clearFiltersTag]}
						onPress={resetFilters}
					>
						<Text style={[styles.filterTagText, styles.clearFiltersText]}>Xóa tất cả</Text>
					</TouchableOpacity>
				</ScrollView>
			)}

			{/* Tour results */}
			{loading && !refreshing ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size="large"
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text style={styles.loadingText}>Đang tìm kiếm tour...</Text>
				</View>
			) : (
				<FlatList
					data={tours}
					renderItem={({ item }) => (
						<TourItem
							tour={item}
							discount={0} // You can set discount logic here
						/>
					)}
					keyExtractor={(item) => item.tourId}
					contentContainerStyle={styles.toursList}
					showsVerticalScrollIndicator={false}
					onRefresh={handleRefresh}
					refreshing={refreshing}
					ListEmptyComponent={renderEmptyState}
				/>
			)}

			{/* Filter Modal */}
			<Modal
				visible={isFilterVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setIsFilterVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Bộ lọc</Text>
							<TouchableOpacity onPress={() => setIsFilterVisible(false)}>
								<Ionicons
									name="close"
									size={24}
									color={Colors.gray[700]}
								/>
							</TouchableOpacity>
						</View>

						<ScrollView style={styles.modalBody}>
							{/* Price Range Filter */}
							<View style={styles.filterSection}>
								<Text style={styles.filterSectionTitle}>Khoảng giá</Text>
								<View style={styles.priceRangeContainer}>
									<Text style={styles.priceValue}>{formatPrice(minPrice)}</Text>
									<Text style={styles.priceValue}>{formatPrice(maxPrice)}</Text>
								</View>
								<Slider
									style={styles.slider}
									minimumValue={0}
									maximumValue={10000000}
									step={100000}
									value={minPrice}
									onValueChange={setMinPrice}
									minimumTrackTintColor={Colors.colorBrand.burntSienna[300]}
									maximumTrackTintColor={Colors.gray[300]}
									thumbTintColor={Colors.colorBrand.burntSienna[500]}
								/>
								<Slider
									style={styles.slider}
									minimumValue={0}
									maximumValue={10000000}
									step={100000}
									value={maxPrice}
									onValueChange={setMaxPrice}
									minimumTrackTintColor={Colors.colorBrand.burntSienna[300]}
									maximumTrackTintColor={Colors.gray[300]}
									thumbTintColor={Colors.colorBrand.burntSienna[500]}
								/>
							</View>

							{/* Categories Filter */}
							<View style={styles.filterSection}>
								<Text style={styles.filterSectionTitle}>Danh mục</Text>
								<View style={styles.categoriesContainer}>
									{categories.map((category) => (
										<TouchableOpacity
											key={category}
											style={[
												styles.categoryItem,
												selectedCategory === category &&
													styles.categoryItemSelected,
											]}
											onPress={() =>
												setSelectedCategory(
													selectedCategory === category ? "" : category,
												)
											}
										>
											<Text
												style={[
													styles.categoryItemText,
													selectedCategory === category &&
														styles.categoryItemTextSelected,
												]}
											>
												{category}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							{/* Departure City Filter */}
							<View style={styles.filterSection}>
								<Text style={styles.filterSectionTitle}>Điểm khởi hành</Text>
								<View style={styles.citiesContainer}>
									{cities.map((city) => (
										<TouchableOpacity
											key={city}
											style={[
												styles.cityItem,
												selectedCity === city && styles.cityItemSelected,
											]}
											onPress={() =>
												setSelectedCity(selectedCity === city ? "" : city)
											}
										>
											<Text
												style={[
													styles.cityItemText,
													selectedCity === city && styles.cityItemTextSelected,
												]}
											>
												{city}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							{/* Destination Filter */}
							<View style={styles.filterSection}>
								<Text style={styles.filterSectionTitle}>Điểm đến</Text>
								<InputForm
									label=""
									placeholder="Nhập điểm đến..."
									value={selectedDestination}
									onChangeText={setSelectedDestination}
									left={
										<Ionicons
											name="location"
											size={20}
											color={Colors.colorBrand.burntSienna[500]}
										/>
									}
									inputContainerStyle={styles.destinationInput}
								/>
							</View>
						</ScrollView>

						<View style={styles.modalFooter}>
							<TouchableOpacity
								style={styles.resetButton}
								onPress={resetFilters}
							>
								<Text style={styles.resetButtonText}>Đặt lại</Text>
							</TouchableOpacity>

							<Button
								style={styles.applyButton}
								onPress={applyFilters}
								styleButton={{
									borderRadius: 8,
									backgroundColor: Colors.colorBrand.burntSienna[500],
								}}
							>
								Áp dụng
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray[50],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: Colors.gray[0],
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[200],
	},
	backButton: {
		marginRight: 8,
	},
	searchContainer: {
		flex: 1,
	},
	searchInput: {
		marginBottom: 0,
	},
	searchInputContainer: {
		borderRadius: 20,
		borderWidth: 0.5,
		height: 40,
	},
	filterButton: {
		marginLeft: 8,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: Colors.colorBrand.burntSienna[50],
	},
	resultInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	resultCount: {
		fontSize: 14,
		color: Colors.gray[700],
	},
	sortButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	sortText: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.gray[700],
		marginRight: 4,
	},
	filterTagsContainer: {
		maxHeight: 40,
		paddingLeft: 16,
	},
	filterTagsContent: {
		paddingRight: 16,
	},
	filterTag: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.gray[100],
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		marginRight: 8,
	},
	filterTagText: {
		fontSize: 12,
		color: Colors.gray[800],
		marginRight: 4,
	},
	clearFiltersTag: {
		backgroundColor: Colors.colorBrand.burntSienna[50],
	},
	clearFiltersText: {
		color: Colors.colorBrand.burntSienna[700],
	},
	toursList: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: Colors.gray[600],
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 100,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.gray[800],
		marginTop: 16,
	},
	emptySubtext: {
		fontSize: 14,
		color: Colors.gray[600],
		marginTop: 8,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: Colors.gray[0],
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: "80%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[200],
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.gray[900],
	},
	modalBody: {
		paddingHorizontal: 16,
	},
	modalFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: Colors.gray[200],
	},
	filterSection: {
		marginVertical: 16,
	},
	filterSectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.gray[900],
		marginBottom: 12,
	},
	priceRangeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	priceValue: {
		fontSize: 14,
		color: Colors.gray[700],
	},
	slider: {
		width: "100%",
		height: 40,
	},
	categoriesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	categoryItem: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: Colors.gray[100],
		marginRight: 8,
		marginBottom: 8,
	},
	categoryItemSelected: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
	},
	categoryItemText: {
		fontSize: 14,
		color: Colors.gray[800],
	},
	categoryItemTextSelected: {
		color: Colors.gray[0],
	},
	citiesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	cityItem: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: Colors.gray[100],
		marginRight: 8,
		marginBottom: 8,
	},
	cityItemSelected: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
	},
	cityItemText: {
		fontSize: 14,
		color: Colors.gray[800],
	},
	cityItemTextSelected: {
		color: Colors.gray[0],
	},
	destinationInput: {
		borderRadius: 8,
		borderWidth: 0.5,
		height: 40,
	},
	resetButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.gray[400],
	},
	resetButtonText: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.gray[700],
	},
	applyButton: {
		flex: 1,
		marginLeft: 12,
	},
});
