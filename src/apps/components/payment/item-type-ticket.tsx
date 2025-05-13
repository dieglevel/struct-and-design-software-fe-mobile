import { Colors } from "@/constants";
import { localePrice } from "@/utils";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	title: string;
	description: string;
	price: number;
	icon: string;
	value: number;
	setValue: (value: number) => void;
	minValue?: number;
}

export const ItemTypeTicket = ({ title, description, price, value, setValue, icon, minValue = 0 }: Props) => {
	const renderIcon = () => {
		switch (icon) {
			case "user":
				return (
					<FontAwesome5
						name="user"
						size={18}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				);
			case "child":
				return (
					<FontAwesome5
						name="child"
						size={18}
						color={Colors.colorBrand.burntSienna[400]}
					/>
				);
			case "baby":
				return (
					<FontAwesome5
						name="baby"
						size={18}
						color={Colors.colorBrand.burntSienna[300]}
					/>
				);
			default:
				return (
					<FontAwesome5
						name="user"
						size={18}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				);
		}
	};

	return (
		<View style={[styles.priceRow, { width: "100%", paddingHorizontal: 0 }]}>
			<View style={styles.infoRow}>
				<View style={styles.iconBox}>{renderIcon()}</View>
				<View>
					<Text style={{ fontSize: 18, color: Colors.colorBrand.midnightBlue[950], fontWeight: "bold" }}>
						{title}
					</Text>
					<Text style={{ fontSize: 12, color: Colors.gray[500], marginBottom: 2 }}>({description})</Text>
					<Text
						style={{
							fontSize: 16,
							color: Colors.colorBrand.burntSienna[500],
							fontWeight: "bold",
						}}
					>
						{localePrice(price)}
					</Text>
				</View>
			</View>
			<View style={styles.counter}>
				<TouchableOpacity style={{ padding: 8 }}>
					<AntDesign
						name="minus"
						size={16}
						color={value > 0 && value > minValue ? Colors.colorBrand.burntSienna[500] : Colors.gray[300]}
						onPress={() => {
							if (value > 0 && value > minValue) {
								setValue(value - 1);
							}
						}}
					/>
				</TouchableOpacity>
				<Text style={{ fontSize: 16, fontWeight: "bold", minWidth: 18, textAlign: "center" }}>{value}</Text>
				<TouchableOpacity
					style={{ padding: 8 }}
					onPress={() => {
						setValue(value + 1);
					}}
				>
					<AntDesign
						name="plus"
						size={16}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	priceRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	iconBox: {
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: Colors.colorBrand.burntSienna[50],
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	counter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 12,
		paddingHorizontal: 4,
	},
});
