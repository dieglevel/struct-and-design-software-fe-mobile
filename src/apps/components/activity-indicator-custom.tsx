import { Colors } from "@/constants";
import { ActivityIndicator, View } from "react-native";

export const ActivityIndicatorCustom = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator
				size={"large"}
				color={Colors.colorBrand.burntSienna[500]}
			/>
		</View>
	);
};
