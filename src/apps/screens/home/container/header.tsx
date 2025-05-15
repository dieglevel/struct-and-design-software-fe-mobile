import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	StatusBar,
	Dimensions,
	Animated,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { searchFullText } from "@/services/booking-service";
import { Tour } from "@/types/implement";
import SearchResults from "../components/search-results";
import { useAppSelector } from "@/libs/redux/redux.config";

const { width } = Dimensions.get("window");

// Export these constants for the HomeScreen
export const HEADER_HEIGHT = 140;
export const TOP_ROW_HEIGHT = 70;
export const SCROLL_THRESHOLD = TOP_ROW_HEIGHT;

interface HeaderProps {
	scrollY: Animated.Value;
	onSearchStateChange?: (isActive: boolean) => void;
}

const Header = ({ scrollY, onSearchStateChange }: HeaderProps) => {
	const insets = useSafeAreaInsets();
	const [searchText, setSearchText] = useState<string>("");
	const [searchResults, setSearchResults] = useState<Tour[]>([]);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const user = useAppSelector((state) => state.user.data);

	// Calculate the translation for the entire header
	const headerTranslateY = scrollY.interpolate({
		inputRange: [0, SCROLL_THRESHOLD],
		outputRange: [0, -TOP_ROW_HEIGHT],
		extrapolate: "clamp",
	});

	// Calculate the position for search results to match header animation
	const searchResultsTranslateY = scrollY.interpolate({
		inputRange: [0, SCROLL_THRESHOLD],
		outputRange: [0, -TOP_ROW_HEIGHT],
		extrapolate: "clamp",
	});

	// Debounced search function
	const debouncedSearch = useCallback(
		(() => {
			let timer: ReturnType<typeof setTimeout>;
			return (text: string) => {
				clearTimeout(timer);
				timer = setTimeout(() => {
					performSearch(text);
				}, 500); // Delay for 300ms
			};
		})(),
		[],
	);

	const performSearch = async (text: string) => {
		if (text.trim().length > 0) {
			setIsLoading(true);
			try {
				const response = await searchFullText(text);
				if (response.success && response.data) {
					setSearchResults(response.data);
				} else {
					setSearchResults([]);
				}
			} catch (error) {
				console.error("Search error:", error);
				setSearchResults([]);
			} finally {
				setIsLoading(false);
			}
		} else {
			setSearchResults([]);
		}
	};

	const handleSearch = (text: string) => {
		setSearchText(text);

		if (text.trim().length > 0) {
			setIsSearching(true);
			if (onSearchStateChange) {
				onSearchStateChange(true);
			}
			debouncedSearch(text);
		} else {
			setSearchResults([]);
			setIsSearching(false);
			if (onSearchStateChange) {
				onSearchStateChange(false);
			}
		}
	};

	const clearSearch = () => {
		setSearchText("");
		setSearchResults([]);
		setIsSearching(false);
		if (onSearchStateChange) {
			onSearchStateChange(false);
		}
	};

	return (
		<>
			<Animated.View
				style={[
					styles.container,
					{
						paddingTop: insets.top > 0 ? insets.top : 10,
						transform: [{ translateY: headerTranslateY }],
					},
				]}
			>
				<StatusBar
					barStyle="dark-content"
					backgroundColor="#fff"
				/>

				{/* Header Top Row */}
				<View style={styles.topRow}>
					<View style={styles.welcomeContainer}>
						<Text style={styles.welcomeText}>Xin chào,</Text>
						<Text style={styles.nameText}>{user?.fullName}</Text>
					</View>

					<View style={styles.iconContainer}>
						<TouchableOpacity style={styles.iconButton}>
							<Ionicons
								name="heart-outline"
								size={24}
								color={Colors.colorBrand.midnightBlue[800]}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.iconButton}>
							<Ionicons
								name="notifications-outline"
								size={24}
								color={Colors.colorBrand.midnightBlue[800]}
							/>
							<View style={styles.notificationBadge} />
						</TouchableOpacity>
					</View>
				</View>

				{/* Search Bar */}
				<View style={styles.searchContainer}>
					<View style={styles.searchBar}>
						<Ionicons
							name="search"
							size={20}
							color={Colors.gray[400]}
							style={styles.searchIcon}
						/>
						<TextInput
							placeholder="Tìm kiếm địa điểm du lịch..."
							placeholderTextColor={Colors.gray[400]}
							style={styles.searchInput}
							value={searchText}
							onChangeText={handleSearch}
							onFocus={() => {
								setIsSearching(true);
								if (onSearchStateChange) {
									onSearchStateChange(true);
								}
							}}
						/>
						{searchText.length > 0 && (
							<TouchableOpacity onPress={clearSearch}>
								<Ionicons
									name="close-circle"
									size={20}
									color={Colors.gray[400]}
								/>
							</TouchableOpacity>
						)}
					</View>
					<TouchableOpacity style={styles.filterButton}>
						<Ionicons
							name="options-outline"
							size={20}
							color="#fff"
						/>
					</TouchableOpacity>
				</View>
			</Animated.View>

			{isSearching && (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<Animated.View
						style={[
							{
								position: "absolute",
								top: HEADER_HEIGHT,
								left: 0,
								right: 0,
								zIndex: 5,
							},
							{ transform: [{ translateY: searchResultsTranslateY }] },
						]}
					>
						<SearchResults
							results={searchResults}
							isSearching={isSearching}
							onClose={clearSearch}
							searchText={searchText}
							isLoading={isLoading}
						/>
					</Animated.View>
				</TouchableWithoutFeedback>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		// paddingBottom: 15,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		// marginBottom: 15,
		width: width,
		// alignSelf: "center",
		left: 0,
		right: 0,
		position: "absolute",
		zIndex: 10,
		height: HEADER_HEIGHT,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// marginBottom: 8,
		height: TOP_ROW_HEIGHT,
	},
	welcomeContainer: {
		flexDirection: "column",
	},
	welcomeText: {
		fontSize: 14,
		color: Colors.colorBrand.burntSienna[500],
		fontWeight: "bold",
	},
	nameText: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[800],
	},
	iconContainer: {
		flexDirection: "row",
	},
	iconButton: {
		marginLeft: 15,
		position: "relative",
	},
	notificationBadge: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.colorBrand.burntSienna[500],
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	searchBar: {
		flex: 1,
		height: 45,
		backgroundColor: Colors.gray[50],
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		marginRight: 10,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		height: "100%",
		fontSize: 14,
		color: Colors.gray[900],
	},
	filterButton: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		width: 45,
		height: 45,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Header;
