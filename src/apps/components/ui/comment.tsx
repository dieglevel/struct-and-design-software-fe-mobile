import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { CommentProps } from "@/types/implement";

const Comment: React.FC<CommentProps> = ({ avatar, name, date, rating, comment }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={{ uri: avatar }}
					style={styles.avatar}
				/>
				<View style={styles.userInfo}>
					<Text style={styles.name}>{name}</Text>
					<View style={styles.rating}>
						{[...Array(5)].map((_, index) => (
							<FontAwesome
								key={index}
								name="star"
								size={16}
								color={index < (rating ?? 0) ? "#FFD700" : "#D3D3D3"}
							/>
						))}
					</View>
				</View>
				<Text style={styles.date}>{date}</Text>
			</View>
			<Text style={styles.comment}>{comment}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F5F5F5",
		padding: 16,
		borderRadius: 10,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	userInfo: {
		flex: 1,
	},
	name: {
		color: Colors.colorBrand.midnightBlue[950],
		fontSize: 16,
		marginBottom: 4,
	},
	rating: {
		flexDirection: "row",
	},
	date: {
		fontSize: 12,
		color: "#999",
	},
	comment: {
		textAlign: "justify",
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
	},
});

export default Comment;
