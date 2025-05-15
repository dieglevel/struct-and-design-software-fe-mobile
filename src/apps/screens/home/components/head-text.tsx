import { Colors, Texts } from "@/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
	title: string;
	onSeeAll?: () => void;
}

const HeadText = ({ title, onSeeAll }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<View style={styles.titleAccent} />
				<Text style={styles.title}>{title}</Text>
			</View>

			{onSeeAll && (
				<TouchableOpacity
					style={styles.seeAllButton}
					onPress={onSeeAll}
				>
					<Text style={styles.seeAllText}>Xem tất cả</Text>
					<Ionicons
						name="chevron-forward"
						size={16}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 15,
		paddingHorizontal: 5,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	titleAccent: {
		width: 4,
		height: 20,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderRadius: 2,
		marginRight: 8,
	},
	title: {
		...Texts.bold20,
		color: Colors.colorBrand.midnightBlue[950],
	},
	seeAllButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	seeAllText: {
		fontSize: 14,
		color: Colors.colorBrand.burntSienna[500],
		fontWeight: "600",
	},
});

export default HeadText;
