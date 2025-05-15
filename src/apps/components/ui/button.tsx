import { Colors, Texts } from "@/constants";
import { Text, View, ViewStyle } from "react-native";
import { Press } from "../press";

interface Props {
	children?: React.ReactNode;
	onPress?: () => void;
	disabled?: boolean;
	variant?: "fill" | "outline";
	style?: ViewStyle;
	styleButton?: ViewStyle;
}

export const Button = ({ children, onPress, disabled = false, style, styleButton }: Props) => {
	const handleOnPress = () => {
		if (disabled == true) {
			return;
		}
		onPress && onPress();
	};

	return (
		<Press
			onPress={handleOnPress}
			disabled={disabled}
			style={{ ...style }}
		>
			<View
				style={[
					{
						alignItems: "center",
						justifyContent: "center",
						minHeight: 50,
						backgroundColor: disabled
							? Colors.colorBrand.burntSienna[300]
							: Colors.colorBrand.burntSienna[600],
						borderRadius: 4,
					},
					styleButton,
				]}
			>
				<Text style={[Texts.bold18, { color: Colors.gray[0] }]}>{children}</Text>
			</View>
		</Press>
	);
};
