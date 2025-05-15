import { Colors } from "@/constants";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
	item: Date;
	selectTime: Date;
	setSelectTime: (date: Date) => void;
}

export const ItemSelectDate = ({ item, selectTime, setSelectTime }: Props) => {
	return (
		<TouchableOpacity
			style={[
				styles.month,
				{
					backgroundColor: selectTime === item ? Colors.colorBrand.burntSienna[500] : "white",
				},
			]}
			onPress={() => setSelectTime(item)}
		>
			<Text
				style={{
					color: selectTime === item ? "white" : Colors.colorBrand.midnightBlue[950],
					fontWeight: "bold",
				}}
			>
				{item.toLocaleString("default", {
					month: "long",
				})}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	month: {
		fontSize: 16,
		color: Colors.colorBrand.midnightBlue[950],
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
});
