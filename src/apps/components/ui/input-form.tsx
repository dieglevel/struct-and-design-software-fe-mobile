import { Borders, Colors, Styles, Texts } from "@/constants";
import { useState } from "react";
import { StyleProp, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { Press } from "../press";

interface Props extends React.PropsWithChildren<TextInputProps> {
	label: string;
	left?: React.ReactNode;
	onLeftPress?: () => void;
	right?: React.ReactNode;
	onRightPress?: () => void;
	secureTextEntry?: boolean;
	required?: boolean;
	style?: StyleProp<ViewStyle>;
	inputContainerStyle?: StyleProp<ViewStyle>;
	validator?: (text: string) => string | null; // Hàm kiểm tra
}

export const InputForm = ({
	label,
	value,
	onChangeText,
	placeholder,
	left,
	onLeftPress,
	right,
	onRightPress,
	secureTextEntry,
	required,
	style,
	inputContainerStyle,
	validator,
}: Props) => {
	const [isFocus, setIsFocus] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const validateInput = (text: string) => {
		if (validator) {
			const error = validator(text);
			setErrorMessage(error);
		}
	};

	const handleBlur = () => {
		setIsFocus(false);
		validateInput(value as string);
	};

	return (
		<View style={[Styles.gap8, style]}>
			<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950] }]}>
				{label}
				{required && <Text style={[Texts.bold18, { color: Colors.colorBrand.burntSienna[500] }]}> *</Text>}
			</Text>
			<View
				style={[
					isFocus ? Borders.borderFocus : Borders.border,
					errorMessage ? { borderColor: Colors.colorBrand.burntSienna[500] } : {},
					Styles.px8,
					Styles.gap8,
					{ flexDirection: "row", alignItems: "center", maxHeight: 40 },
					inputContainerStyle,
				]}
			>
				{left && (
					<Press
						onPress={onLeftPress}
						style={{ maxHeight: 25, maxWidth: 25 }}
					>
						{left}
					</Press>
				)}
				<TextInput
					value={value}
					onChangeText={(text) => {
						onChangeText?.(text);
						validateInput(text);
					}}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					style={[Styles.flex, {color: Colors.gray[950]}]}
					onFocus={() => setIsFocus(true)}
					onBlur={handleBlur}
				/>
				{right && (
					<Press
						onPress={onRightPress}
						style={{ maxHeight: 25, maxWidth: 25 }}
					>
						{right}
					</Press>
				)}
			</View>
			{errorMessage && (
				<Text style={{ color: Colors.colorBrand.burntSienna[500], fontSize: 12 }}>{errorMessage}</Text>
			)}
		</View>
	);
};
