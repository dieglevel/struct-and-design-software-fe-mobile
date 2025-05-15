import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { RatingProps } from "@/types/implement";

const RatingTour = ({ rating, ratingDetails }: RatingProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.rating}>{rating}</Text>
			<View style={styles.starContainer}>
				<FontAwesome
					name="star"
					size={16}
					color="#FFD700"
				/>
				<Text style={styles.text}> Tuyệt vời</Text>
			</View>

			<View style={styles.divider} />

			{ratingDetails?.map((item, index) => (
				<View key={index}>
					<View style={styles.detailContainer}>
						<Text style={styles.label}>{item.label}</Text>
						<View style={{ flex: 1 }}>
							<ProgressBar
								progress={item.value === undefined ? 0 : item.value / 100}
								color="#497e91"
								style={styles.progressBar}
							/>
						</View>
						<Text style={styles.percent}>{item.value}%</Text>
					</View>
					{index === 3 && <View style={styles.divider} />}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#F5F5F5",
		borderRadius: 10,
		elevation: 2,
	},
	rating: {
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center",
		color: "#003366",
	},
	starContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 8,
	},
	text: {
		marginLeft: 5,
		fontSize: 14,
		color: "#7D7D7D",
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: "#D3D3D3",
		marginBottom: 10,
	},
	detailContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	label: {
		width: "25%",
		fontSize: 14,
		color: "#003366",
		fontWeight: "600",
	},
	progressBar: {
		width: "100%",
		height: 4,
		backgroundColor: "#b0b0b0",
	},
	percent: {
		width: "15%",
		textAlign: "right",
		fontSize: 14,
		color: "#7D7D7D",
	},
});

export default RatingTour;
