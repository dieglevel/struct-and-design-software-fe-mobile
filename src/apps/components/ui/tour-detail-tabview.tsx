import React, { useCallback, useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import { ScheduleScene } from "../tour-detail-scenes/schedule-scene";
import { ReviewScene } from "../tour-detail-scenes/review-scene";
import { InfoScene } from "../tour-detail-scenes/tour-info-scene";
import { CommentProps, RatingDetail, ScheduleItemProps, TourDestinationResponse } from "@/types/implement";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Định nghĩa type cho props
interface TourDetailProps {
	schedules: TourDestinationResponse[];
	ratingDetails: RatingDetail[];
	commentData: CommentProps[];
}

interface Route {
	key: string;
	title: string;
}

const TourDetail: React.FC<TourDetailProps> = ({ schedules, ratingDetails, commentData }) => {
	const [index, setIndex] = useState(0);
	const routes: Route[] = [
		{ key: "schedule", title: "Lịch trình" },
		{ key: "review", title: "Đánh giá" },
		// { key: "info", title: "Thông tin" },
	];

	const renderScene = useCallback(
		({ route }: { route: Route }) => {
			switch (route.key) {
				case "schedule":
					return <ScheduleScene schedules={schedules} />;
				case "review":
					return (
						<ReviewScene
							ratingDetails={ratingDetails}
							commentData={commentData}
						/>
					);
				// case "info":
				// 	return (
				// 		<InfoScene
				// 			transport={[
				// 				"Vé máy bay khứ hồi Vietjet Air bao gồm 7kg hành lý xách tay + 20kg hành lý ký gửi.",
				// 				"Xe du lịch hiện đại, điều hòa, đưa đón tham quan.",
				// 				"Tàu câu cá và lặn ngắm san hô với đầy đủ dụng cụ.",
				// 			]}
				// 			accommodation={[
				// 				"Khách sạn 3 sao tiêu chuẩn (2-3 khách/phòng).",
				// 				"Phòng tiện nghi điều hòa, tivi, nóng lạnh.",
				// 			]}
				// 			others={[
				// 				"Ăn uống theo lịch trình tham quan.",
				// 				"Vé vào cửa các điểm tham quan.",
				// 				"HDV nhiệt tình, kinh nghiệm.",
				// 				"Nước uống lạnh phục vụ du lịch.",
				// 				"Bảo hiểm du lịch mức cao nhất.",
				// 				"Y tế dự phòng trên xe.",
				// 			]}
				// 		/>
				// 	);
				default:
					return null;
			}
		},
		[schedules, ratingDetails, commentData],
	);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			style={{ flex: 1 }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					style={[styles.tabBar]}
					activeColor="#fff"
					inactiveColor="#7D7D7D"
					renderTabBarItem={({ route }) => {
						const isFocused =
							props.navigationState.index === props.navigationState.routes.indexOf(route);
						return (
							<TouchableOpacity
								style={[styles.tabItem, isFocused && styles.activeTab]}
								onPress={() => props.jumpTo(route.key)}
							>
								<Text style={[styles.tabText, isFocused && styles.activeTabText]}>
									{route.title}
								</Text>
							</TouchableOpacity>
						);
					}}
					contentContainerStyle={{ justifyContent: "space-evenly" }}
					indicatorContainerStyle={{ display: "none" }}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	scene: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	tabBar: {
		backgroundColor: "#fff",
		elevation: 2,
		paddingVertical: 10,
	},

	tabItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	activeTab: {
		backgroundColor: "#ff6347", // Màu nền cam khi chọn
	},
	tabText: {
		color: "#7D7D7D",
		fontWeight: "bold",
	},
	activeTabText: {
		color: "#fff", // Màu trắng khi active
	},
});

export default TourDetail;
