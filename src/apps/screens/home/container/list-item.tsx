import { TourItem } from "@/apps/components/ui";
import { Colors } from "@/constants";
import { Tour } from "@/types/implement";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
	listTour: Tour[];
	horizontal?: boolean;
	showTitle?: boolean;
	title?: string;
}

const ListItem = ({ listTour, horizontal = true, showTitle = false, title }: Props) => {
	const [showAll, setShowAll] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const visibleData = horizontal ? listTour : showAll ? listTour : listTour.slice(0, 3);

	const toggleShowAll = () => {
		setIsLoading(true);
		setTimeout(() => {
			setShowAll(!showAll);
			setIsLoading(false);
		}, 300); // giả lập delay một chút cho loading cảm giác mượt hơn
	};

	return (
		<View style={styles.container}>
			{showTitle && title && <Text style={styles.sectionTitle}>{title}</Text>}

			<FlatList
				data={visibleData}
				horizontal={horizontal}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={horizontal ? styles.horizontalContent : styles.verticalContent}
				renderItem={({ item }) => (
					<TourItem
						tour={item}
						horizontal={horizontal}
						discount={Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 5 : 0}
					/>
				)}
				keyExtractor={(item) => item.tourId?.toString() || Math.random().toString()}
			/>

			{isLoading ? (
				<ActivityIndicator
					size="small"
					color={Colors.colorBrand.burntSienna[500]}
					style={{ marginTop: 10 }}
				/>
			) : (
				!horizontal &&
				listTour.length > 3 && (
					<TouchableOpacity
						onPress={toggleShowAll}
						style={styles.seeMoreButton}
					>
						<Text style={styles.seeMoreText}>{showAll ? "Thu gọn" : "Xem thêm"}</Text>
						<Ionicons
							name={showAll ? "chevron-up" : "chevron-down"}
							size={16}
							color={Colors.colorBrand.burntSienna[500]}
						/>
					</TouchableOpacity>
				)
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		color: Colors.gray[800],
	},
	horizontalContent: {
		paddingLeft: 5,
		paddingRight: 20,
	},
	verticalContent: {
		rowGap: 10,
	},
	seeMoreButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		backgroundColor: Colors.colorBrand.burntSienna[50],
		borderRadius: 10,
		marginTop: 10,
	},
	seeMoreText: {
		color: Colors.colorBrand.burntSienna[500],
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 5,
	},
});

export default ListItem;
