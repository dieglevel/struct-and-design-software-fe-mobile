import { Colors } from "@/constants";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface InfoSectionProps {
	title: string;
	content: string[];
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.title}>{title}</Text>
			{content.map((item, index) => (
				<Text
					key={index}
					style={styles.contentItem}
				>
					- {item}
				</Text>
			))}
		</View>
	);
};

interface TourInfoProps {
	transport: string[];
	accommodation: string[];
	others: string[];
}

const TourInfo: React.FC<TourInfoProps> = ({ transport, accommodation, others }) => {
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps="handled"
			nestedScrollEnabled
		>
			<Text style={styles.header}>{"<Header>"}</Text>
			<InfoSection
				title="Vận chuyển:"
				content={transport}
			/>
			<InfoSection
				title="Lưu trú:"
				content={accommodation}
			/>
			<InfoSection
				title="Khác:"
				content={others}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#F9F9F9",
		borderRadius: 10,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	header: {
		fontWeight: "bold",
		fontSize: 18,
		color: Colors.colorBrand.midnightBlue[900],
		marginBottom: 12,
	},
	sectionContainer: {
		marginBottom: 16,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
		color: Colors.colorBrand.midnightBlue[900],
		marginBottom: 8,
	},
	contentItem: {
		fontSize: 14,
		color: "#333",
		marginBottom: 6,
	},
});

export default TourInfo;
