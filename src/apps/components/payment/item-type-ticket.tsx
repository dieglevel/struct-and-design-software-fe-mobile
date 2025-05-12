import { Colors } from "@/constants";
import { localePrice } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	title: string;
	description: string;
	price: number;

	value: number;
	setValue: (value: number) => void;
}

export const ItemTypeTicket = ({ title, description, price, value, setValue }: Props) => {
	return (
		<View style={[styles.priceRow, { width: "100%", paddingHorizontal: 16 }]}>
			<View>
				<Text style={{ fontSize: 18, color: Colors.colorBrand.midnightBlue[950] }}>{title}</Text>
				<Text style={{ fontSize: 12, color: Colors.gray[500] }}>({description})</Text>
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
			<View style={styles.counter}>
				<TouchableOpacity style={{ padding: 8 }}>
					<AntDesign
						name="minus"
						size={10}
						color="black"
						onPress={() => {
							if (value > 0) {
								setValue(value - 1);
							}
						}}
					/>
				</TouchableOpacity>
				<Text>{value}</Text>
				<TouchableOpacity
					style={{ padding: 8 }}
					onPress={() => {
						setValue(value + 1);
					}}
				>
					<AntDesign
						name="plus"
						size={10}
						color="black"
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
		marginBottom: 8,
	},
	counter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 60,
	},
});
