import { ItemTypeTicket } from "@/apps/components/payment";
import { SelectDate } from "@/apps/components/payment/select-date";
import { Colors } from "@/constants";
import { localePrice } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const date: Date[] = [
	new Date("2025-01-31"),
	new Date("2025-02-01"),
	new Date("2025-03-02"),
	new Date("2025-04-03"),
	new Date("2025-05-04"),
];

export const PaymentScreen = () => {
	const [selectTime, setSelectTime] = useState<Date>(date[0]);
	const [adultCount, setAdultCount] = useState<number>(1);
	const [childCount, setChildCount] = useState<number>(0);
	const [infantCount, setInfantCount] = useState<number>(0);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={{ padding: 16, backgroundColor: Colors.colorBrand.midnightBlue[50], flex: 1 }}>
				<View style={{ backgroundColor: "white", borderRadius: 8, padding: 16 }}>
					<Text style={styles.header}>GIÁ VÉ</Text>

					{/* Month Selector */}
					<View style={styles.monthSelector}>
						<SelectDate
							date={date}
							selectTime={selectTime}
							setSelectTime={setSelectTime}
						/>
					</View>
				</View>

				{/* Date Section */}
				<Text style={styles.date}>
					{selectTime.toLocaleString("default", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
					})}
				</Text>
				<View
					style={{
						backgroundColor: "white",
						borderRadius: 8,
						justifyContent: "space-around",
						alignItems: "center",
						paddingVertical: 16,
					}}
				>
					<Text style={{ fontWeight: "bold", fontSize: 20 }}>Thời gian xuất phát</Text>
					<View style={styles.dateRange}>
						<Text
							style={{
								fontSize: 16,
								color: Colors.colorBrand.midnightBlue[950],
								fontWeight: "500",
							}}
						>
							Ngày đi: 31/01/2025
						</Text>
						<Text
							style={{
								fontSize: 16,
								color: Colors.colorBrand.midnightBlue[950],
								fontWeight: "500",
							}}
						>
							Ngày về: 22/02/2025
						</Text>
					</View>
				</View>

				{/* Price Section */}
				<View
					style={[
						{
							justifyContent: "center",
							alignItems: "center",
							marginTop: 12,
							backgroundColor: "white",
							paddingVertical: 16,
							gap: 8,
						},
						styles.priceSection,
					]}
				>
					<Text style={{ fontWeight: "700", fontSize: 20 }}>Giá Tour</Text>
					<ItemTypeTicket
						title="Người lớn"
						description="Từ 12 tuổi trở lên"
						price={2000000}
						value={adultCount}
						setValue={setAdultCount}
					/>

					<ItemTypeTicket
						title="Trẻ em"
						description="Từ 2 tuổi đến 12 tuổi"
						price={2000000}
						value={childCount}
						setValue={setChildCount}
					/>

					<ItemTypeTicket
						title="Em bé"
						description="Từ 2 tuổi trở xuống"
						price={2000000}
						value={infantCount}
						setValue={setInfantCount}
					/>
				</View>
			</View>

			{/* Button */}
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Đặt ngay</Text>
				<Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
					{localePrice(adultCount * 2000000 + childCount * 2000000 + infantCount * 2000000)}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 16,
	},
	monthSelector: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 8,
		alignItems: "center",
	},
	month: {
		fontSize: 16,
		color: Colors.colorBrand.midnightBlue[950],
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	date: {
		padding: 8,
		fontSize: 30,
		textAlign: "center",
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[500],
		marginBottom: 8,
	},
	dateRange: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		marginTop: 8,
	},
	priceSection: {
		marginBottom: 16,
	},
	priceRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	counter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 60,
	},
	button: {
		backgroundColor: "#ff5722",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
});
