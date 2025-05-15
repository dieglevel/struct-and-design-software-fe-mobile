import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { navigate, reset } from "@/libs/navigation/navigationService";

const WelcomeScreen = () => {
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

	useEffect(() => {
		const loadData = async () => {
			setTimeout(() => {
				setIsDataLoaded(true); // Khi tải xong dữ liệu
			}, 3000); // Giả lập thời gian tải dữ liệu (3 giây)
		};

		loadData();
	}, []);

	useEffect(() => {
		if (isDataLoaded) {
			reset("BottomTabScreenApp");
		}
	}, [isDataLoaded]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				margin: 15.5,
				backgroundColor: "#fffefe",
			}}
		>
			<LottieView
				source={require("../../../assets/svgs/welcome.json")}
				autoPlay
				loop
				style={{ width: 350, height: 350 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f8ff", // Màu nền nhẹ nhàng
	},
	lottie: {
		width: 200,
		height: 200,
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#2c3e50", // Màu chữ chính
		textAlign: "center",
		marginTop: 20,
		fontFamily: "Roboto", // Thêm font chữ đẹp (chắc chắn bạn đã cài font này trong dự án)
		textShadowColor: "#ecf0f1", // Màu đổ bóng chữ
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
		transform: [{ translateY: 10 }],
	},
});

export default WelcomeScreen;
