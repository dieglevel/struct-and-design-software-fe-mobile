import { FlatList, ScrollView, View } from "react-native";
import ScheduleItem from "../ui/schedule";
import { ScheduleItemProps, TourDestinationResponse } from "@/types/implement";

export const ScheduleScene = ({ schedules }: { schedules: TourDestinationResponse[] }) => (
	<ScrollView
		style={{ flex: 1 }}
		contentContainerStyle={{ flexGrow: 1 }}
		showsVerticalScrollIndicator={false}
		nestedScrollEnabled
	>
		<FlatList
			contentContainerStyle={{ padding: 10 }}
			data={schedules}
			renderItem={({ item, index }) => (
				<ScheduleItem
					schedules={item}
					index={index}
				/>
			)}
			keyExtractor={(item, index) => index.toString()}
			nestedScrollEnabled
			showsVerticalScrollIndicator={false}
		/>
	</ScrollView>
);
