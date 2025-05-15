import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from "react-native";
import { Tour } from "@/types/implement";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "@/libs/navigation/navigationService";
import { HEADER_HEIGHT, TOP_ROW_HEIGHT } from "../container/header";

interface SearchResultsProps {
	results: Tour[];
	isSearching: boolean;
	onClose: () => void;
	searchText: string;
	isLoading?: boolean;
}

const SearchResults = ({ results, isSearching, onClose, searchText, isLoading = false }: SearchResultsProps) => {
	const renderTourItem = ({ item }: { item: Tour }) => (
		<TouchableOpacity
			style={styles.resultItem}
			onPress={() => {
				navigate("TourDetailScreen", { tourId: item.tourId });
				onClose();
			}}
		>
			<Image
				source={{ uri: item?.thumbnail || "https://via.placeholder.com/150" }}
				style={styles.thumbnail}
			/>
			<View style={styles.itemContent}>
				<Text
					style={styles.tourName}
					numberOfLines={1}
				>
					{item?.name}
				</Text>
				<View style={styles.locationRow}>
					<Ionicons
						name="location"
						size={14}
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text
						style={styles.locationText}
						numberOfLines={1}
					>
						{item?.name ? item?.name.split(" - ")[1] || "Việt Nam" : "Việt Nam"}
					</Text>
				</View>
				<View style={styles.priceRow}>
					<Text style={styles.priceLabel}>Giá từ:</Text>
					<Text style={styles.priceValue}>
						{typeof item?.price === "number" ? item?.price.toLocaleString("vi-VN") : "0"} đ
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.resultsTitle}>
					{isLoading
						? "Đang tìm kiếm..."
						: results.length > 0
						? `Kết quả tìm kiếm (${results.length})`
						: searchText.trim().length > 0
						? "Không tìm thấy kết quả"
						: "Nhập từ khóa để tìm kiếm"}
				</Text>
				<TouchableOpacity
					onPress={onClose}
					style={styles.closeButton}
				>
					<Ionicons
						name="close"
						size={22}
						color={Colors.gray[600]}
					/>
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size="large"
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text style={styles.loadingText}>Đang tìm kiếm...</Text>
				</View>
			) : searchText.trim().length > 0 && results.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Ionicons
						name="search-outline"
						size={50}
						color={Colors.gray[300]}
					/>
					<Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>
					<Text style={styles.emptySubText}>Vui lòng thử lại với từ khóa khác</Text>
				</View>
			) : (
				<TouchableWithoutFeedback onPress={onClose}>
					<FlatList
						data={results}
						renderItem={renderTourItem}
						keyExtractor={(item) => item.tourId?.toString() || Math.random().toString()}
						contentContainerStyle={styles.listContent}
						showsVerticalScrollIndicator={false}
					/>
				</TouchableWithoutFeedback>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
		maxHeight: 400,
		zIndex: 9,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[100],
	},
	resultsTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.colorBrand.midnightBlue[800],
	},
	closeButton: {
		padding: 5,
	},
	listContent: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	resultItem: {
		flexDirection: "row",
		marginBottom: 15,
		backgroundColor: Colors.gray[50],
		borderRadius: 12,
		overflow: "hidden",
		elevation: 2,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	thumbnail: {
		width: 100,
		height: 100,
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
	},
	itemContent: {
		flex: 1,
		padding: 12,
		justifyContent: "space-between",
	},
	tourName: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.colorBrand.midnightBlue[800],
		marginBottom: 5,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	locationText: {
		fontSize: 13,
		color: Colors.gray[600],
		marginLeft: 4,
	},
	priceRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	priceLabel: {
		fontSize: 13,
		color: Colors.gray[600],
		marginRight: 4,
	},
	priceValue: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.colorBrand.burntSienna[500],
	},
	loadingContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 30,
	},
	loadingText: {
		marginTop: 15,
		fontSize: 16,
		color: Colors.gray[600],
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 30,
	},
	emptyText: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.gray[600],
		marginTop: 10,
	},
	emptySubText: {
		fontSize: 14,
		color: Colors.gray[500],
		marginTop: 5,
	},
});

export default SearchResults;
