import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, RefreshControl, Dimensions, FlatList, Animated } from "react-native";
import { Loading, LoadingSpin, SafeAreaView } from "../../components";
import { Tour } from "@/types/implement";
import Header, { HEADER_HEIGHT, SCROLL_THRESHOLD } from "./container/header";
import ListItem from "./container/list-item";
import HeadText from "./components/head-text";
import { handleGetTours } from "./handle";
import { Colors } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import { CarouselBanner } from "./components/carousel-banner";
import { CategoriesScroll } from "./components/categories-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/libs/redux/redux.config";

export const HomeScreen = () => {
	const [listTour, setListTour] = useState<Tour[]>([]);
	const [popularTours, setPopularTours] = useState<Tour[]>([]);
	const [discountedTours, setDiscountedTours] = useState<Tour[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const scrollY = useRef(new Animated.Value(0)).current;
	const [isSearchActive, setIsSearchActive] = useState(false);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const favoriteTours = useAppSelector((state) => state.favorite.data);
	console.log("favoriteTours", favoriteTours);

	const fetchData = async () => {
		await handleGetTours(setListTour);
		// In a real app, you would have separate API calls
		// This is just for demonstration
		setPopularTours([...listTour].sort(() => 0.5 - Math.random()).slice(0, 5));
		setDiscountedTours([...listTour].sort(() => 0.5 - Math.random()).slice(0, 5));
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (listTour.length > 0) {
			setPopularTours([...listTour].sort(() => 0.5 - Math.random()).slice(0, 5));
			setDiscountedTours([...listTour].sort(() => 0.5 - Math.random()).slice(0, 5));
		}
	}, [listTour]);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchData();
		setRefreshing(false);
	};

	const renderHeader = () => (
		<View>
			{listTour.length > 0 && <CarouselBanner tours={listTour} />}

			{/* Categories */}
			<View style={styles.section}>
				<HeadText title="Danh Mục Du Lịch" />
				<CategoriesScroll />
			</View>

			{/* Popular Tours Section */}
			<View style={styles.section}>
				<HeadText
					title="Những Địa Điểm Nổi Bật"
					onSeeAll={() => navigate("TourDetailScreen")}
				/>
				<ListItem
					listTour={popularTours}
					horizontal={true}
				/>
			</View>

			{/* Discounted Tours Section */}
			<View style={styles.section}>
				<HeadText
					title="Ưu Đãi Đặc Biệt"
					onSeeAll={() => navigate("TourDetailScreen")}
				/>
				<ListItem
					listTour={discountedTours}
					horizontal={true}
				/>
			</View>

			{/* Regional Tours Section Header */}
			<View style={styles.section}>
				<HeadText
					title="Tour Ba Miền"
					onSeeAll={() => navigate("TourDetailScreen")}
				/>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<>
					<Header
						scrollY={scrollY}
						onSearchStateChange={setIsSearchActive}
					/>

					<Animated.FlatList
						data={listTour}
						renderItem={({ item }) => (
							<View style={styles.section}>
								<ListItem
									listTour={[item]}
									horizontal={false}
								/>
							</View>
						)}
						keyExtractor={(item) => item.tourId?.toString() || Math.random().toString()}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_HEIGHT }]}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
								colors={[Colors.colorBrand.burntSienna[500]]}
							/>
						}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
							useNativeDriver: true,
						})}
						scrollEventThrottle={16}
						ListHeaderComponent={renderHeader}
						scrollEnabled={!isSearchActive}
					/>
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollContent: {
		paddingBottom: 30,
	},
	section: {
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	categoriesContainer: {
		paddingVertical: 10,
	},
	categoryItem: {
		alignItems: "center",
		marginRight: 20,
		width: 65,
	},
	iconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	categoryName: {
		fontSize: 12,
		color: Colors.colorBrand.midnightBlue[800],
		textAlign: "center",
	},
});
