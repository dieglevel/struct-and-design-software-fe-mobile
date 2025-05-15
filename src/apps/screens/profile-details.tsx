import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfile, updateInfo } from "@/services/user-service";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/libs/redux/redux.config";
import { setUser } from "@/libs/redux/stores/user.store.";
import { ActivityIndicatorCustom } from "../components/activity-indicator-custom";
import { Calendar } from "@/assets/svgs/calendar";
import { Colors } from "@/constants";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Gender } from "@/types/implement";

// Format date from timestamp to display string (dd/MM/yyyy)
const formatDateFromTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};

// Format date string (dd/MM/yyyy) to timestamp for API
const formatDateForApi = (dateStr: string): string => {
	const [day, month, year] = dateStr.split("/").map(Number);
	return `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`;
};

export const ProfileDetailsScreen = () => {
	const isFocused = useIsFocused();
	const user = useAppSelector((state) => state.user.data);
	const dispatch = useAppDispatch<AppDispatch>();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [isDatePickVisible, setDatePickVisible] = useState<boolean>(false);

	// Form state
	const [name, setName] = useState<string>(user?.fullName ?? "");
	const [gender, setGender] = useState<Gender>(user?.gender ?? Gender.Male);
	const [dateOfBirth, setDateOfBirth] = useState<string>(
		user?.birthday ? formatDateFromTimestamp(Number(user.birthday)) : formatDateFromTimestamp(Date.now()),
	);
	const [phone, setPhone] = useState<string>(user?.phone ?? "");
	const [email, setEmail] = useState<string>(user?.email ?? "");

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await getProfile();
				if (response && response.statusCode === 200) {
					dispatch(setUser(response.data ?? null));
				} else {
					console.error("Error fetching profile:", response?.message ?? "Unknown error");
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		if (isFocused) {
			setIsLoading(true);
			fetchProfile();
			setTimeout(() => {
				setIsLoading(false);
			}, 800);
		}
	}, [isFocused, dispatch]);

	useEffect(() => {
		if (user) {
			setName(user?.fullName ?? "");
			setGender(user?.gender === Gender.Male ? Gender.Male : Gender.Female);
			setDateOfBirth(
				user?.birthday
					? formatDateFromTimestamp(Number(user.birthday))
					: formatDateFromTimestamp(Date.now()),
			);
			setPhone(user?.phone ?? "");
			setEmail(user?.email ?? "");
		}
	}, [user]);

	const showDatePicker = () => {
		setDatePickVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickVisible(false);
	};

	// Handle date selection
	const handleConfirm = (date: Date) => {
		const formattedDate = formatDateFromTimestamp(date.getTime());
		setDateOfBirth(formattedDate);
		validateDOB(formattedDate);
		hideDatePicker();
	};

	// Validate date of birth
	const validateDOB = (text: string) => {
		const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // dd/MM/yyyy format
		if (!dateRegex.test(text)) return "Ngày sinh phải có định dạng dd/MM/yyyy!";

		const [day, month, year] = text.split("/").map(Number);
		const birthDate = new Date(year, month - 1, day);
		const today = new Date();

		// Calculate date 16 years ago
		const sixteenYearsAgo = new Date();
		sixteenYearsAgo.setFullYear(today.getFullYear() - 16);

		if (birthDate >= today) {
			return "Ngày sinh không hợp lệ!";
		}

		if (birthDate > sixteenYearsAgo) {
			return "Người dùng phải trên 16 tuổi!";
		}

		return null;
	};

	// Handle save changes
	const handleSaveChanges = async () => {
		// Validation
		if (!name.trim()) {
			Alert.alert("Lỗi", "Họ và tên không được để trống");
			return;
		}

		if (!phone.trim()) {
			Alert.alert("Lỗi", "Số điện thoại không được để trống");
			return;
		}

		const dobError = validateDOB(dateOfBirth);
		if (dobError) {
			Alert.alert("Lỗi", dobError);
			return;
		}

		setIsSaving(true);
		try {
			const userInfo = {
				fullName: name,
				phone: phone,
				birthday: formatDateForApi(dateOfBirth),
				gender: gender,
				email: email,
			};
			console.log("User Info:", userInfo);

			const response = await updateInfo(userInfo);

			if (response.success) {
				Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật", [
					{ text: "OK", onPress: () => navigation.goBack() },
				]);
			} else {
				Alert.alert("Lỗi", response.message || "Không thể cập nhật thông tin");
			}
		} catch (error) {
			Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật thông tin");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<ActivityIndicatorCustom />
			) : (
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.formContainer}>
						<ProfileInput
							label="Họ và tên"
							value={name}
							onChangeText={setName}
							placeholder="Nhập họ tên của bạn"
						/>

						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Giới tính</Text>
							<View style={styles.genderContainer}>
								<TouchableOpacity
									style={[
										styles.genderOption,
										gender === Gender.Male && styles.genderOptionSelected,
									]}
									onPress={() => setGender(Gender.Male)}
								>
									<Text
										style={[
											styles.genderText,
											gender === Gender.Male && styles.genderTextSelected,
										]}
									>
										Nam
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[
										styles.genderOption,
										gender === Gender.Female && styles.genderOptionSelected,
									]}
									onPress={() => setGender(Gender.Female)}
								>
									<Text
										style={[
											styles.genderText,
											gender === Gender.Female && styles.genderTextSelected,
										]}
									>
										Nữ
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						<ProfileInput
							label="Ngày sinh"
							value={dateOfBirth}
							onChangeText={setDateOfBirth}
							placeholder="dd/MM/yyyy"
							icon={<Calendar />}
							onIconPress={showDatePicker}
						/>

						<DateTimePicker
							isVisible={isDatePickVisible}
							onConfirm={handleConfirm}
							mode="date"
							display="compact"
							onCancel={hideDatePicker}
							maximumDate={new Date()}
							minimumDate={new Date(1900, 0, 1)}
							
						/>

						<ProfileInput
							label="Điện thoại"
							value={phone}
							onChangeText={setPhone}
							placeholder="Nhập vào số điện thoại của bạnbạn"
							keyboardType="phone-pad"
						/>

						<ProfileInput
							label="Email"
							value={email}
							onChangeText={setEmail}
							placeholder="Nhập vào địa chỉ email của bạn"
							keyboardType="email-address"
							editable={false}
							info="Địa chỉ email không thể thay đổi"
						/>

						<TouchableOpacity
							style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
							onPress={handleSaveChanges}
							disabled={isSaving}
						>
							{isSaving ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.saveButtonText}>Lưu thông tin</Text>
							)}
						</TouchableOpacity>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

interface ProfileInputProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	secureTextEntry?: boolean;
	icon?: React.ReactNode;
	onIconPress?: () => void;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	editable?: boolean;
	info?: string;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry = false,
	icon,
	onIconPress,
	keyboardType = "default",
	editable = true,
	info,
}) => (
	<View style={styles.inputContainer}>
		<Text style={styles.inputLabel}>{label}</Text>
		<View style={[styles.inputWrapper, !editable && styles.inputDisabled]}>
			<TextInput
				style={[styles.input, icon ? styles.inputWithIcon : null, !editable && styles.inputTextDisabled]}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={Colors.gray[400]}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
				editable={editable}
			/>
			{icon && (
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={onIconPress}
					disabled={!editable}
				>
					{icon}
				</TouchableOpacity>
			)}
		</View>
		{info && <Text style={styles.infoText}>{info}</Text>}
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	scrollContainer: {
		paddingBottom: 30,
	},
	formContainer: {
		paddingHorizontal: 16,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputLabel: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.gray[800],
		marginBottom: 8,
	},
	inputWrapper: {
		position: "relative",
		borderWidth: 1,
		borderColor: Colors.gray[300],
		borderRadius: 8,
		backgroundColor: "#fff",
	},
	input: {
		fontSize: 16,
		color: Colors.gray[900],
		padding: 12,
	},
	inputWithIcon: {
		paddingRight: 40,
	},
	iconContainer: {
		position: "absolute",
		right: 12,
		top: "50%",
		transform: [{ translateY: -12 }],
	},
	infoText: {
		fontSize: 12,
		color: Colors.gray[500],
		marginTop: 4,
	},
	inputDisabled: {
		backgroundColor: Colors.gray[100],
		borderColor: Colors.gray[300],
	},
	inputTextDisabled: {
		color: Colors.gray[600],
	},
	saveButton: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		marginTop: 20,
	},
	saveButtonDisabled: {
		backgroundColor: Colors.colorBrand.burntSienna[300],
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	genderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	genderOption: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.gray[300],
		backgroundColor: "#fff",
	},
	genderOptionSelected: {
		borderColor: Colors.colorBrand.burntSienna[500],
		backgroundColor: Colors.colorBrand.burntSienna[50],
	},
	genderText: {
		fontSize: 16,
		color: Colors.gray[700],
	},
	genderTextSelected: {
		color: Colors.colorBrand.burntSienna[500],
		fontWeight: "500",
	},
});
