import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "../components";
import { Colors, Texts } from "@/constants";
import { TourItem } from "../components/ui";
import { useEffect, useState } from "react";

interface TourItemProps {
	tourId: string;
	thumbnail: string;
	name: string;
	rating: number;
	price: number;
	discount: number;
	duration: string;
	description: string;
}

export const HomeScreen = () => {
	const listTour = [
		{
			id: "1",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Du lịch biển Nha Trang",
			rating: 4.8,
			price: 2500000,
			discount: 15,
			duration: "3 ngày 2 đêm",
		},
		{
			id: "2",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Khám phá Đà Lạt",
			rating: 4.7,
			price: 1800000,
			discount: 10,
			duration: "2 ngày 1 đêm",
		},
		{
			id: "3",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Tour Phú Quốc",
			rating: 4.9,
			price: 3200000,
			discount: 20,
			duration: "4 ngày 3 đêm",
		},
		{
			id: "4",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Trekking Fansipan",
			rating: 4.5,
			price: 1500000,
			discount: 0,
			duration: "2 ngày 1 đêm",
		},
		{
			id: "5",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Khám phá Sài Gòn",
			rating: 4.6,
			price: 1200000,
			discount: 5,
			duration: "1 ngày",
		},
		{
			id: "6",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Du lịch Hội An",
			rating: 4.8,
			price: 2100000,
			discount: 10,
			duration: "3 ngày 2 đêm",
		},
		{
			id: "7",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Thám hiểm Sơn Đoòng",
			rating: 5.0,
			price: 5000000,
			discount: 25,
			duration: "5 ngày 4 đêm",
		},
	];

	// const [listTour, setListTour] = useState<Array<TourItemProps>>([]);
	const [showAll, setShowAll] = useState<boolean>(false);
	const [showAllTemp, setShowAllTemp] = useState<boolean>(false);

	const displayedTours = showAll ? listTour : listTour.slice(0, 3);
	const displayedToursTemp = showAllTemp ? listTour : listTour.slice(0, 3);

	// useEffect(() => {
	// 	const getTours = async () => {
	// 		try {
	// 			const data = await fetchTours(); // Ensure this returns data matching TourItemProps
	// 			// setListTour(data);
	// 			console.log(data);
	// 		} catch (error) {
	// 			console.error("Không thể tải danh sách tour");
	// 		}
	// 	};

	// 	getTours();
	// }, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff", alignItems: "stretch" }}>
			<ScrollView contentContainerStyle={{ padding: 13 }}>
				<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950] }]}>
					Những địa điểm nổi bật
				</Text>

				{displayedTours.map((item) => (
					<TourItem
						key={item.id}
						{...item}
					/>
				))}

				{listTour.length > 3 && (
					<TouchableOpacity
						onPress={() => setShowAll(!showAll)}
						style={{ borderRadius: 5, marginTop: 10, alignItems: "center" }}
					>
						<Text
							style={{
								color: Colors.colorBrand.burntSienna[500],
								fontSize: 14,
								fontWeight: "bold",
							}}
						>
							{showAll ? "Thu gọn <" : "Xem thêm >"}
						</Text>
					</TouchableOpacity>
				)}

				<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950] }]}>Tour ba miền</Text>

				{displayedToursTemp.map((item) => (
					<TourItem
						key={item.id}
						{...item}
					/>
				))}

				{listTour.length > 3 && (
					<TouchableOpacity
						onPress={() => setShowAllTemp(!showAllTemp)}
						style={{ borderRadius: 5, marginTop: 10, alignItems: "center" }}
					>
						<Text
							style={{
								color: Colors.colorBrand.burntSienna[500],
								fontSize: 14,
								fontWeight: "bold",
							}}
						>
							{showAllTemp ? "Thu gọn <" : "Xem thêm >"}
						</Text>
					</TouchableOpacity>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
