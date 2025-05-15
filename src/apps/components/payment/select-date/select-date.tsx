import { Colors } from "@/constants";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ItemSelectDate } from "./item-select-date";

interface Props {
	date: Date[];
	selectTime: Date;
	setSelectTime: (date: Date) => void;
}

export const SelectDate = ({ date, selectTime, setSelectTime }: Props) => {
	return (
		<FlatList
			data={date}
			renderItem={({ item }) => (
				<ItemSelectDate
					item={item}
					selectTime={selectTime}
					setSelectTime={setSelectTime}
				/>
			)}
			keyExtractor={(item) => item.toString()}
			horizontal
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
		/>
	);
};
