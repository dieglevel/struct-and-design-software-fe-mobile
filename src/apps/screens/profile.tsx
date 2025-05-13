import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateAvatar } from "@/services/user-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/libs/redux/redux.config";
import { setUser, reset } from "@/libs/redux/stores/user.store.";
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants";
import imagePicker from "@/services/image-picker";
import { fetchFavoriteTours, fetchHistoryTours } from "@/libs/redux/thunks/tour.thunk";

const ProfileScreenBooking = () => {
	const user = useAppSelector((state) => state.user.data);
	const favorites = useAppSelector((state) => state.favorite.data);
	const history = useAppSelector((state) => state.history.data);
	const favoriteLoading = useAppSelector((state) => state.favorite.loading);
	const historyLoading = useAppSelector((state) => state.history.loading);

	const navigate = useNavigation();

	const dispatch = useAppDispatch<AppDispatch>();
	const navigation = useNavigation();

	useEffect(() => {
		if (user?.userId) {
			dispatch(fetchFavoriteTours());
			dispatch(fetchHistoryTours());
		}
	}, [dispatch, user?.userId]);

	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem(AsyncStorageKey.TOKEN);
			dispatch(reset());
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "LoginScreen" }],
				}),
			);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const handleChangAvatar = async () => {
		const newImage = await imagePicker();
		const response = await updateAvatar(newImage ?? "");
		if (response.statusCode === 200) {
			dispatch(setUser(response.data ?? null));
		}
	};

	// Chuyển đổi ngày sang định dạng dd/MM/yyyy
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}/${date.getFullYear()}`;
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header Section */}
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<View style={styles.avatarContainer}>
							<Image
								source={{ uri: user?.avatarUrl || "https://via.placeholder.com/150" }}
								style={styles.avatar}
							/>
							<TouchableOpacity
								onPress={handleChangAvatar}
								style={styles.editAvatarButton}
							>
								<MaterialIcons
									name="camera-alt"
									size={16}
									color={Colors.gray[950]}
								/>
							</TouchableOpacity>
						</View>

						<View style={styles.userInfo}>
							<Text style={styles.userName}>{user?.fullName || "User Name"}</Text>
							<Text style={styles.userLevel}>{user?.gender === 0 ? "Nam" : "Nữ"}</Text>
							{/* <View style={styles.badge}>
								<MaterialIcons
									name="star"
									size={12}
									color="#fff"
								/>
								<Text style={styles.badgeText}>10% Genius discount</Text>
							</View> */}
						</View>
					</View>

					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Text style={styles.statValue}>{history.length || 0}</Text>
							<Text style={styles.statLabel}>Stays</Text>
						</View>
						<View style={styles.statDivider} />
						<View style={styles.statItem}>
							<Text style={styles.statValue}>{favorites.length || 0}</Text>
							<Text style={styles.statLabel}>Saved</Text>
						</View>
						<View style={styles.statDivider} />
						<View style={styles.statItem}>
							<Text style={styles.statValue}>$216</Text>
							<Text style={styles.statLabel}>Rewards</Text>
						</View>
					</View>
				</View>

				{/* Account Settings Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => navigate.navigate("ProfileDetailsScreen")}
					>
						<View style={styles.menuIconContainer}>
							<Ionicons
								name="person-outline"
								size={22}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
						<View style={styles.menuTextContainer}>
							<Text style={styles.menuItemText}>Thông tin cá nhân</Text>
							<Text style={styles.menuItemSubtext}>Họ tên, email, điện thoại</Text>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => navigate.navigate("ProfileSecurityScreen")}
					>
						<View style={styles.menuIconContainer}>
							<Ionicons
								name="lock-closed-outline"
								size={22}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
						<View style={styles.menuTextContainer}>
							<Text style={styles.menuItemText}>Mật khẩu và bảo mật</Text>
							<Text style={styles.menuItemSubtext}>Thay đổi mật khẩu</Text>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuIconContainer}>
							<MaterialIcons
								name="payment"
								size={22}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
						<View style={styles.menuTextContainer}>
							<Text style={styles.menuItemText}>Thông tin thanh toán</Text>
							<Text style={styles.menuItemSubtext}>Phương thức thanh toán</Text>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuIconContainer}>
							<Ionicons
								name="notifications-outline"
								size={22}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
						<View style={styles.menuTextContainer}>
							<Text style={styles.menuItemText}>Thông báo</Text>
							<Text style={styles.menuItemSubtext}>Đặt tour, đặt trước</Text>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>
				</View>

				{/* Saved Places Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Đã Thích</Text>
						{/* <TouchableOpacity>
							<Text style={styles.seeAllText}>Xem tất cả</Text>
						</TouchableOpacity> */}
					</View>

					{favoriteLoading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator
								size="large"
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
					) : favorites.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>Không có địa điểm đã thích</Text>
						</View>
					) : (
						<FlatList
							data={favorites}
							horizontal
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item) => item.tour.tourId}
							contentContainerStyle={styles.savedPlacesContainer}
							style={{ paddingHorizontal: 2 }}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.savedPlaceItem}
									onPress={() =>
										navigate.navigate("TourDetailScreen", { tourId: item.tour.tourId })
									}
								>
									<Image
										source={{
											uri: item.tour.thumbnail || "https://via.placeholder.com/150",
										}}
										style={styles.savedPlaceImage}
									/>
									<View style={styles.savedPlaceOverlay}>
										<MaterialIcons
											name="favorite"
											size={20}
											color="#fff"
											style={styles.favoriteIcon}
										/>
									</View>
									<View style={styles.savedPlaceInfo}>
										<Text
											style={styles.savedPlaceName}
											numberOfLines={1}
										>
											{item.tour.name}
										</Text>
										<Text
											style={styles.savedPlaceLocation}
											numberOfLines={1}
										>
											{item.tour.duration || "Unknown location"}
										</Text>
										{/* <Text style={styles.savedPlaceDate}>
											Saved on{" "}
											{item.createdDate ? formatDate(item.createdDate) : "N/A"}
										</Text> */}
									</View>
								</TouchableOpacity>
							)}
						/>
					)}
				</View>

				{/* Recent Bookings Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Tour Đã Xem Gần Đây</Text>
						{/* <TouchableOpacity>
							<Text style={styles.seeAllText}>Xem tất cả</Text>
						</TouchableOpacity> */}
					</View>

					{historyLoading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator
								size="large"
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
					) : history.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>Không có lịch sử đặt tour</Text>
						</View>
					) : (
						history.slice(0, 3).map((booking) => (
							<TouchableOpacity
								key={booking.tour.tourId}
								style={styles.bookingItem}
								onPress={() =>
									navigate.navigate("TourDetailScreen", { tourId: booking.tour.tourId })
								}
							>
								<Image
									source={{
										uri: booking.tour.thumbnail || "https://via.placeholder.com/150",
									}}
									style={styles.bookingImage}
								/>
								<View style={styles.bookingContent}>
									<Text
										style={styles.bookingName}
										numberOfLines={1}
									>
										{booking.tour.name}
									</Text>
									<Text style={styles.bookingLocation}>
										{booking.tour.duration || "Unknown location"}
									</Text>
									{/* <Text style={styles.bookingDate}>{booking.tour.duration || "N/A"}</Text> */}
									{/* <View
										style={[
											styles.bookingStatus,
											new Date(booking.endDate) < new Date()
												? styles.completedStatus
												: styles.upcomingStatus,
										]}
									>
										<Text style={styles.bookingStatusText}>
											{new Date(booking.endDate) < new Date()
												? "Completed"
												: "Upcoming"}
										</Text>
									</View> */}
								</View>
							</TouchableOpacity>
						))
					)}
				</View>

				{/* Support & Help Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Hỗ trợ & Trợ giúp</Text>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuIconContainer}>
							<FontAwesome
								name="question-circle-o"
								size={22}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
						<View style={styles.menuTextContainer}>
							<Text style={styles.menuItemText}>Cộng đồng hỗ trợ</Text>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuIconContainer}>
							<FontAwesome5
								name="headset"
								size={22}
								color={Colors.colorBrand.burntSienna[500]}
							/>
						</View>
						<View style={styles.menuTextContainer}>
							<Text style={styles.menuItemText}>Liên hệ dịch vụ khách hàng</Text>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>
				</View>

				{/* Logout Button */}
				<TouchableOpacity
					style={styles.logoutButton}
					onPress={handleLogout}
				>
					<Text style={styles.logoutText}>Đăng xuất</Text>
				</TouchableOpacity>

				<View style={styles.versionContainer}>
					<Text style={styles.versionText}>Phiên bản 1.0.0</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		backgroundColor: "#fff",
		paddingVertical: 20,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		
	},
	headerContent: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	avatarContainer: {
		position: "relative",
		marginRight: 16,
	},
	avatar: {
		width: 70,
		height: 70,
		borderRadius: 35,
		borderWidth: 2,
		borderColor: Colors.colorBrand.burntSienna[500],
	},
	editAvatarButton: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: "#fff",
		borderRadius: 15,
		width: 28,
		height: 28,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.gray[200],
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.gray[900],
		marginBottom: 4,
	},
	userLevel: {
		fontSize: 14,
		color: Colors.gray[700],
		marginBottom: 8,
	},
	badge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.colorBrand.burntSienna[500],
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		alignSelf: "flex-start",
	},
	badgeText: {
		color: "#fff",
		fontSize: 12,
		marginLeft: 4,
		fontWeight: "500",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.gray[50],
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 8,
	},
	statItem: {
		flex: 1,
		alignItems: "center",
	},
	statValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.gray[900],
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		color: Colors.gray[600],
	},
	statDivider: {
		width: 1,
		height: 30,
		backgroundColor: Colors.gray[300],
	},
	section: {
		marginHorizontal: 8,
		backgroundColor: "#fff",
		marginTop: 16,
		paddingHorizontal: 16,
		paddingVertical: 20,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.gray[900],
		marginBottom: 16,
	},
	seeAllText: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.colorBrand.burntSienna[500],
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[100],
	},
	menuIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.colorBrand.burntSienna[50],
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	menuTextContainer: {
		flex: 1,
	},
	menuItemText: {
		fontSize: 16,
		color: Colors.gray[900],
		fontWeight: "500",
	},
	menuItemSubtext: {
		fontSize: 13,
		color: Colors.gray[500],
		marginTop: 2,
	},
	savedPlacesContainer: {
		paddingVertical: 8,
	},
	savedPlaceItem: {
		width: 200,
		marginRight: 12,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	savedPlaceImage: {
		width: "100%",
		height: 120,
	},
	savedPlaceOverlay: {
		position: "absolute",
		top: 8,
		right: 8,
		zIndex: 1,
	},
	favoriteIcon: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	savedPlaceInfo: {
		padding: 12,
	},
	savedPlaceName: {
		fontSize: 15,
		fontWeight: "bold",
		color: Colors.gray[900],
		marginBottom: 4,
	},
	savedPlaceLocation: {
		fontSize: 13,
		color: Colors.gray[600],
		marginBottom: 4,
	},
	savedPlaceDate: {
		fontSize: 12,
		color: Colors.gray[500],
	},
	bookingItem: {
		flexDirection: "row",
		marginBottom: 16,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	bookingImage: {
		width: 100,
		height: 100,
	},
	bookingContent: {
		flex: 1,
		padding: 12,
	},
	bookingName: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.gray[900],
		marginBottom: 4,
	},
	bookingLocation: {
		fontSize: 14,
		color: Colors.gray[600],
		marginBottom: 4,
	},
	bookingDate: {
		fontSize: 14,
		color: Colors.gray[700],
		marginBottom: 8,
	},
	bookingStatus: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
		alignSelf: "flex-start",
	},
	completedStatus: {
		backgroundColor: Colors.gray[200],
	},
	upcomingStatus: {
		backgroundColor: Colors.colorBrand.midnightBlue[100],
	},
	bookingStatusText: {
		fontSize: 12,
		fontWeight: "500",
	},
	logoutButton: {
		marginTop: 16,
		marginHorizontal: 16,
		marginBottom: 8,
		backgroundColor: "#fff",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.colorBrand.burntSienna[500],
	},
	logoutText: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[500],
	},
	versionContainer: {
		alignItems: "center",
		paddingVertical: 16,
	},
	versionText: {
		fontSize: 12,
		color: Colors.gray[500],
	},
	loadingContainer: {
		padding: 20,
		alignItems: "center",
	},
	loadingText: {
		fontSize: 14,
		color: Colors.gray[500],
	},
	emptyContainer: {
		padding: 20,
		alignItems: "center",
		backgroundColor: Colors.gray[50],
		borderRadius: 8,
	},
	emptyText: {
		fontSize: 14,
		color: Colors.gray[500],
	},
});

export default ProfileScreenBooking;
