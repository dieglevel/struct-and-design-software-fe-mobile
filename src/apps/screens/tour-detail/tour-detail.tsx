import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Texts } from "@/constants";
import { TourItem } from "../../components/ui";
import BookingButton from "../../components/ui/booking-btn";
import { Divider } from "react-native-paper";
import TourDetail from "@/apps/components/ui/tour-detail-tabview";
import { useEffect, useState, useRef } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { getTourDetails } from "@/services/tour-service";
import { TourDetailRouteProp } from "@/libs/navigation";
import { Tour, TourDestinationResponse } from "@/types/implement";
import { handleGetTours } from "../home/handle";
import { LoadingSpin } from "@/apps/components";
import React from "react";

export const TourDetailScreen = () => {
	const route = useRoute<TourDetailRouteProp>();

	const tourId = route.params?.tourId;

	const [data, setData] = useState<Tour | null>(null);
	const [listData, setListData] = useState<Tour[]>([]);

	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const windowWidth = Dimensions.get("window").width;
	const flatListRef = useRef<FlatList>(null);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const focus = useIsFocused();

	useEffect(() => {
		setIsLoading(true);
	}, [focus]);

	useEffect(() => {
		const fetchTourData = async () => {
			try {
				handleGetTours(setListData);
			} catch (error) {
				console.error("Error fetching tour data:", error);
			}

			try {
				const data = await getTourDetails(tourId);
				if (data) {
					setData(data.data || null);
					console.log("Tour data fetched:", data);
				}
			} catch (error) {
				console.error("Error fetching tour data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTourData();
	}, []);

	const renderTourDestination = (tourDestinations: TourDestinationResponse[] | null) => {
		// String
		let destinationString = "";

		if (!tourDestinations) return destinationString;

		tourDestinations.forEach((destination) => {
			if (destination.name) {
				destinationString += destination.name + " - ";
			}
		});

		return destinationString.slice(0, -3); // Remove the last " - "
	};

	return (
		<>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<View
					style={{
						marginTop: 10,
						backgroundColor: Colors.gray[0],
						flex: 1,
						paddingHorizontal: 10,
						paddingVertical: 8,
					}}
				>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={listData}
						renderItem={({ item }) => <TourItem tour={item} />}
						keyExtractor={(item, index) => index.toString()}
						style={{ marginBottom: 20 }}
						contentContainerStyle={{ paddingBottom: 50 }} // Tạo khoảng cách để không bị che
						ListHeaderComponent={
							<View style={[styles.container, { gap: 8 }]}>
								<View style={styles.imageContainer}>
									<FlatList
										ref={flatListRef}
										data={data?.tourImageResponses || []}
										horizontal
										pagingEnabled
										showsHorizontalScrollIndicator={false}
										keyExtractor={(item, index) => index.toString()}
										onMomentumScrollEnd={(event) => {
											const newIndex = Math.round(
												event.nativeEvent.contentOffset.x / (windowWidth - 20),
											);
											setCurrentImageIndex(newIndex);
										}}
										renderItem={({ item }) => (
											<TouchableOpacity
												onPress={() => {
													setSelectedImage(item.imageUrl);
													setModalVisible(true);
												}}
											>
												<Image
													source={{ uri: item.imageUrl }}
													style={[styles.image, { width: windowWidth - 20 }]}
													resizeMode="cover"
												/>
											</TouchableOpacity>
										)}
									/>
									<View style={styles.paginationContainer}>
										{(data?.tourImageResponses || []).map((_, index) => (
											<View
												key={index.toString()}
												style={[
													styles.paginationDot,
													index === currentImageIndex &&
														styles.paginationDotActive,
												]}
											/>
										))}
									</View>
								</View>

								<Modal
									animationType="fade"
									transparent={true}
									visible={modalVisible}
									onRequestClose={() => setModalVisible(false)}
								>
									<TouchableOpacity
										style={styles.modalContainer}
										activeOpacity={1}
										onPress={() => setModalVisible(false)}
									>
										<Image
											source={{ uri: selectedImage || "" }}
											style={styles.modalImage}
											resizeMode="contain"
										/>
									</TouchableOpacity>
								</Modal>

								<View style={styles.content}>
									<Text style={styles.title}>{data?.name || "Error"}</Text>
									<Text style={styles.description}>{data?.description || ""}</Text>
									<View style={styles.row}>
										<Text style={styles.location}>
											{renderTourDestination(data?.tourDestinationResponses ?? null)}
										</Text>
										<View style={styles.ratingContainer}>
											<FontAwesome
												name="star"
												size={14}
												color="#FFB400"
											/>
											<Text style={styles.rating}>4.8</Text>
											<Text style={styles.reviews}>(24 đánh giá)</Text>
										</View>
									</View>
								</View>

								<View style={{ flex: 1, minHeight: 400 }}>
									<TourDetail
										schedules={data?.tourDestinationResponses || []}
										ratingDetails={ratingDetails}
										commentData={commentData}
									/>
								</View>
								<Divider />

								<Text
									style={[
										Texts.bold16,
										{
											color: Colors.colorBrand.midnightBlue[950],
											alignSelf: "flex-start",
										},
									]}
								>
									Có thể bạn sẽ thích
								</Text>
							</View>
						}
					/>
					{data && <BookingButton tour={data} />}
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		overflow: "hidden",
	},
	imageContainer: {
		height: 200,
		borderRadius: 10,
		overflow: "hidden",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	paginationContainer: {
		position: "absolute",
		bottom: 10,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "rgba(255, 255, 255, 0.88)",
		marginHorizontal: 4,
	},
	paginationDotActive: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		width: 10,
		height: 10,
		borderRadius: 5,
	},
	content: {
		padding: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 4,
	},
	description: {
		fontSize: 14,
		color: "#0077CC",
		marginBottom: 6,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	location: {
		fontSize: 12,
		color: "#666",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	rating: {
		fontSize: 12,
		fontWeight: "bold",
		marginLeft: 4,
	},
	reviews: {
		fontSize: 12,
		color: "red",
		marginLeft: 4,
	},
	scene: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	modalImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	// backgroundColor: "#fff",
});


const commentData = [
	{
		id: "9",
		avatar: "https://i.pravatar.cc/150?img=1",
		name: "Phung Anh Minh",
		date: "10/11/2022",
		rating: 5,
		comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
	{
		id: "10",
		avatar: "https://i.pravatar.cc/150?img=2",
		name: "Nguyen Van A",
		date: "15/02/2023",
		rating: 4,
		comment: "Great service and amazing experience. Will definitely recommend to others!",
	},
	{
		id: "11",
		avatar: "https://i.pravatar.cc/150?img=3",
		name: "Tran Thi B",
		date: "05/05/2023",
		rating: 3,
		comment: "It was a decent experience. Could improve the customer service a bit more.",
	},
];
const listTour = [
	{
		tourId: "1",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Du lịch biển Nha Trang",
		rating: 4.8,
		price: 2500000,
		discount: 15,
		duration: "3 ngày 2 đêm",
	},
	{
		tourId: "2",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Khám phá Đà Lạt",
		rating: 4.7,
		price: 1800000,
		discount: 10,
		duration: "2 ngày 1 đêm",
	},
	{
		tourId: "3",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Tour Phú Quốc",
		rating: 4.9,
		price: 3200000,
		discount: 20,
		duration: "4 ngày 3 đêm",
	},
	{
		tourId: "4",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Trekking Fansipan",
		rating: 4.5,
		price: 1500000,
		discount: 0,
		duration: "2 ngày 1 đêm",
	},
	{
		tourId: "5",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Khám phá Sài Gòn",
		rating: 4.6,
		price: 1200000,
		discount: 5,
		duration: "1 ngày",
	},
	{
		tourId: "6",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Du lịch Hội An",
		rating: 4.8,
		price: 2100000,
		discount: 10,
		duration: "3 ngày 2 đêm",
	},
	{
		tourId: "7",
		image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
		name: "Thám hiểm Sơn Đoòng",
		rating: 5.0,
		price: 5000000,
		discount: 25,
		duration: "5 ngày 4 đêm",
	},
];

const ratingDetails = [
	{ label: "Xuất sắc", value: 90 },
	{ label: "Tốt", value: 80 },
	{ label: "Trung bình", value: 70 },
	{ label: "Kém", value: 40 },
	{ label: "Vị trí", value: 85 },
	{ label: "Giá cả", value: 75 },
	{ label: "Phục vụ", value: 88 },
	{ label: "Tiện nghi", value: 78 },
];
