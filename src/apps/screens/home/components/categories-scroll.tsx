import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { getCategory } from "@/services/booking-service";
import { Category } from "@/types/implement/category";
import { navigate } from "@/libs/navigation/navigationService";

const categoryIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
	biển: "water-outline",
	núi: "triangle-outline",
	"đô thị": "business-outline",
	"di tích": "fitness-outline",
	"khám phá": "compass-outline",
	"ẩm thực": "restaurant-outline",
};

export const CategoriesScroll = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	useEffect(() => {
		fetchCategory();
	}, []);

	const fetchCategory = async () => {
		const response = await getCategory();
		if (response.success) {
			setCategories(response.data ?? []);
		}
	};

	const categoriesWithIcon = categories.map((category) => ({
		...category,
		icon: categoryIconMap[category.name?.toLowerCase() as keyof typeof categoryIconMap] || "compass-outline",
	}));

	const handleCategoryPress = (category: {
		categoryTourId?: string;
		name?: string;
		icon?: string;
		image?: string;
		description?: string;
	}) => {
		navigate("CategoryDetailScreen", {
			categoryId: category.categoryTourId || "",
			categoryName: category.name || "",
			categoryIcon: category.icon || "compass-outline",
			categoryImage: category.image || "",
			categoryDescription: category.description || "",
		});
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.categoriesContainer}
		>
			{categoriesWithIcon.map(
				(category) =>
					category.active === true && (
						<TouchableOpacity
							key={category.categoryTourId}
							style={styles.categoryItem}
							onPress={() => handleCategoryPress(category)}
						>
							<View style={styles.iconContainer}>
								<Ionicons
									name={category.icon as keyof typeof Ionicons.glyphMap}
									size={24}
									color={Colors.colorBrand.burntSienna[500]}
								/>
							</View>
							<Text style={styles.categoryName}>{category.name}</Text>
						</TouchableOpacity>
					),
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	categoriesContainer: {
		paddingVertical: 10,
	},
	categoryItem: {
		alignItems: "center",
		marginRight: 20,
		width: 65,
	},
	iconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	categoryName: {
		fontSize: 12,
		color: Colors.colorBrand.midnightBlue[800],
		textAlign: "center",
	},
});
