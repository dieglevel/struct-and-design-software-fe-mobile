import React, { useState, useRef, useEffect, useCallback } from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Text,
	FlatList,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from "react-native";
import { Colors } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Tour } from "@/types/implement";
import { navigate } from "@/libs/navigation/navigationService";
import { useDispatch } from "react-redux";

interface Props {
	tours: Tour[];
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 40;

export const CarouselBanner = ({ tours }: Props) => {
	const bannerRef = useRef<FlatList>(null);
	const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (tours.length <= 1) return;

		const interval = setInterval(() => {
			nextBanner();
		}, 4000);

		return () => clearInterval(interval);
	}, [currentBannerIndex, tours.length]);

	const nextBanner = useCallback(() => {
		const nextIndex = (currentBannerIndex + 1) % Math.min(tours.length, 5);
		bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });

		// ✅ Cập nhật ngay lập tức thay vì chờ onScroll
		setCurrentBannerIndex(nextIndex);
	}, [currentBannerIndex, tours.length]);

	const handleBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(offsetX / ITEM_WIDTH);

		if (index !== currentBannerIndex && index >= 0 && index < Math.min(tours.length, 5)) {
			setCurrentBannerIndex(index);
		}
	};

	const handlePressBanner = (tour: Tour) => {
		navigate("TourDetailScreen", { tourId: tour.tourId });
	};

	const renderBannerItem = ({ item, index }: { item: Tour; index: number }) => (
		<TouchableOpacity
			key={index}
			activeOpacity={0.9}
			onPress={() => handlePressBanner(item)}
			style={styles.bannerItem}
		>
			<Image
				source={{ uri: item.thumbnail }}
				style={styles.bannerImage}
				resizeMode="cover"
			/>
			<LinearGradient
				colors={["transparent", "rgba(0,0,0,0.7)"]}
				style={styles.bannerOverlay}
			>
				<View style={styles.bannerContent}>
					<Text
						style={styles.bannerTitle}
						numberOfLines={2}
					>
						{item.name}
					</Text>
					<Text style={styles.bannerSubtitle}>{item.duration}</Text>
				</View>
			</LinearGradient>
		</TouchableOpacity>
	);

	return (
		<View style={styles.bannerContainer}>
			<FlatList
				ref={bannerRef}
				data={tours.slice(0, 5)}
				renderItem={renderBannerItem}
				keyExtractor={(item, index) => `banner-${index}`}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleBannerScroll}
				snapToInterval={width - 40}
				snapToAlignment="center"
				decelerationRate="fast"
				scrollEventThrottle={16}
				contentContainerStyle={styles.bannerListContainer}
				getItemLayout={(data, index) => ({
					length: ITEM_WIDTH,
					offset: ITEM_WIDTH * index,
					index,
				})}
				onScrollToIndexFailed={({ index }) => {
					setTimeout(() => {
						bannerRef.current?.scrollToIndex({ index, animated: true });
					}, 300);
				}}
			/>

			{/* Pagination Dots */}
			<View style={styles.paginationContainer}>
				{tours.slice(0, 5).map((_, index) => (
					<View
						key={index}
						style={[styles.paginationDot, currentBannerIndex === index && styles.paginationDotActive]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bannerContainer: {
		marginVertical: 15,
	},
	bannerListContainer: {
		paddingHorizontal: 20,
	},
	bannerItem: {
		width: width - 50,
		height: 180,
		borderRadius: 15,
		overflow: "hidden",
		marginRight: 0,
		marginHorizontal: 10,
	},
	bannerImage: {
		width: "100%",
		height: "100%",
	},
	bannerOverlay: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "60%",
		justifyContent: "flex-end",
	},
	bannerContent: {
		padding: 15,
	},
	bannerTitle: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	bannerSubtitle: {
		color: "#fff",
		fontSize: 14,
		opacity: 0.8,
	},
	paginationContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 3,
		backgroundColor: Colors.gray[300],
	},
	paginationDotActive: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		width: 16,
	},
});
