import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
	Animated,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, InputForm } from "../components/ui";
import { Calendar } from "@/assets/svgs/calendar";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Colors } from "@/constants";
import SearchIcon from "@/assets/svgs/search";
import { Ionicons } from "@expo/vector-icons";
import { searchTours } from "@/services/tour-service";
import { navigate } from "@/libs/navigation/navigationService";

const { width } = Dimensions.get("window");
const popularDestinations = [
	{ id: 1, name: "Đà Lạt", image: "https://images.unsplash.com/photo-1589997384675-13ccc9d9da18?q=80&w=2500" },
	{ id: 2, name: "Nha Trang", image: "https://images.unsplash.com/photo-1549867436-403a3e163d11?q=80&w=2500" },
	{ id: 3, name: "Phú Quốc", image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=2500" },
	{ id: 4, name: "Hạ Long", image: "https://images.unsplash.com/photo-1543348750-466b55f32f16?q=80&w=2500" },
];

export const SearchScreen = () => {
	const [departureDateVisible, setDepartureDateVisible] = useState<boolean>(false);
	const [returnDateVisible, setReturnDateVisible] = useState<boolean>(false);
	const [departureDate, setDepartureDate] = useState<string>("");
	const [returnDate, setReturnDate] = useState<string>("");
	const [departureLocation, setDepartureLocation] = useState<string>("");
	const [destination, setDestination] = useState<string>("");
	const [scrollY] = useState(new Animated.Value(0));
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	const handleDepartureConfirm = (date: Date) => {
		const formattedDate = formatDate(date);
		setDepartureDate(formattedDate);
		setDepartureDateVisible(false);
	};

	const handleReturnConfirm = (date: Date) => {
		const formattedDate = formatDate(date);
		setReturnDate(formattedDate);
		setReturnDateVisible(false);
	};

	const formatDate = (date: Date): string => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = String(date.getFullYear()).slice(2);
		return `${day}/${month}/${year}`;
	};

	const handleSearch = () => {
		// Navigate to search results with parameters
		console.log("Searching for:", {
			departureLocation,
			destination,
			departureDate,
			returnDate,
		});

		navigate("SearchResultsScreen", {
			departure: departureLocation,
			destination: destination,
			departureDate: departureDate,
			returnDate: returnDate,
		});
	};

	const handleSelectDestination = (name: string) => {
		setDestination(name);
	};

	const headerOpacity = scrollY.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 1],
		extrapolate: "clamp",
	});

	return (
		<SafeAreaView style={styles.container}>
			<Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Tìm kiếm chuyến đi</Text>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
					useNativeDriver: false,
				})}
				scrollEventThrottle={16}
			>
				<View style={styles.searchContainer}>
					<View style={styles.searchForm}>
						<InputForm
							label="Khởi hành từ"
							placeholder="Nhập điểm khởi hành..."
							value={departureLocation}
							onChangeText={setDepartureLocation}
							left={
								<Ionicons
									name="location"
									size={20}
									color={Colors.colorBrand.burntSienna[500]}
								/>
							}
							style={styles.inputStyle}
							inputContainerStyle={{ borderRadius: 10, borderWidth: 0.5 }}
						/>

						<InputForm
							label="Điểm đến"
							placeholder="Bạn muốn đi đâu?"
							value={destination}
							onChangeText={setDestination}
							left={
								<Ionicons
									name="navigate"
									size={20}
									color={Colors.colorBrand.burntSienna[500]}
								/>
							}
							style={styles.inputStyle}
							inputContainerStyle={{ borderRadius: 10, borderWidth: 0.5 }}
						/>

						<View style={styles.dateContainer}>
							<InputForm
								label="Ngày đi"
								placeholder="DD/MM/YY"
								value={departureDate}
								onChangeText={setDepartureDate}
								left={<Calendar size={20} />}
								onLeftPress={() => setDepartureDateVisible(true)}
								style={styles.dateInput}
								inputContainerStyle={{ borderRadius: 10, borderWidth: 0.5 }}
							/>
							<InputForm
								label="Ngày về"
								placeholder="DD/MM/YY"
								value={returnDate}
								onChangeText={setReturnDate}
								left={<Calendar size={20} />}
								onLeftPress={() => setReturnDateVisible(true)}
								style={styles.dateInput}
								inputContainerStyle={{ borderRadius: 10, borderWidth: 0.5 }}
							/>
						</View>

						<Button
							style={styles.searchButton}
							onPress={handleSearch}
							styleButton={{
								borderRadius: 15,
								backgroundColor: Colors.colorBrand.burntSienna[500],
							}}
						>
							Tìm kiếm
						</Button>
					</View>
				</View>

				{!isKeyboardVisible && (
					<View style={styles.popularSection}>
						<Text style={styles.sectionTitle}>Điểm đến phổ biến</Text>
						<View style={styles.popularGrid}>
							{popularDestinations.map((item) => (
								<TouchableOpacity
									key={item.id}
									style={styles.destinationItem}
									onPress={() => handleSelectDestination(item.name)}
								>
									<ImageBackground
										source={{ uri: item.image }}
										style={styles.destinationImage}
										imageStyle={styles.destinationImageStyle}
									>
										<View style={styles.destinationOverlay}>
											<Text style={styles.destinationName}>{item.name}</Text>
										</View>
									</ImageBackground>
								</TouchableOpacity>
							))}
						</View>
					</View>
				)}
			</ScrollView>

			<DateTimePicker
				isVisible={departureDateVisible}
				onConfirm={handleDepartureConfirm}
				onCancel={() => setDepartureDateVisible(false)}
				mode="date"
				display="default"
				minimumDate={new Date()}
			/>

			<DateTimePicker
				isVisible={returnDateVisible}
				onConfirm={handleReturnConfirm}
				onCancel={() => setReturnDateVisible(false)}
				mode="date"
				display="default"
				minimumDate={
					departureDate
						? new Date(
								parseInt(departureDate.split("/")[2]) + 2000,
								parseInt(departureDate.split("/")[1]) - 1,
								parseInt(departureDate.split("/")[0]),
						  )
						: new Date()
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray[50],
	},
	headerBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 60,

		backgroundColor: Colors.gray[0],
		zIndex: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	header: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		zIndex: 2,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.gray[900],
	},
	scrollContainer: {
		paddingHorizontal: 16,
		paddingBottom: 30,
	},
	searchContainer: {
		marginTop: 16,
	},
	searchForm: {
		backgroundColor: Colors.gray[0],
		borderRadius: 16,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 2,
	},

	formTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.colorBrand.midnightBlue[800],
		marginLeft: 12,
	},
	inputStyle: {
		marginBottom: 16,
	},
	dateContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	dateInput: {
		width: "48%",
	},
	searchButton: {
		marginTop: 8,
	},
	popularSection: {
		marginTop: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.gray[900],
		marginBottom: 16,
	},
	popularGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	destinationItem: {
		width: (width - 40) / 2,
		height: 120,
		marginBottom: 8,
		borderRadius: 12,
		overflow: "hidden",
	},
	destinationImage: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",
	},
	destinationImageStyle: {
		borderRadius: 12,
	},
	destinationOverlay: {
		backgroundColor: "rgba(0,0,0,0.3)",
		padding: 8,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
	destinationName: {
		color: Colors.gray[0],
		fontSize: 16,
		fontWeight: "600",
	},
});
