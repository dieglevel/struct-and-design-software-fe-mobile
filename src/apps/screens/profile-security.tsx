import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { changePassword } from "@/services/user-service";

export const ProfileSecurityScreen = () => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Form state
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	// Password visibility toggles
	const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	// Validation states
	const [errors, setErrors] = useState<{
		currentPassword?: string;
		newPassword?: string;
		confirmPassword?: string;
	}>({});

	// Validate password
	const validatePassword = (password: string): boolean => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	// Handle form submission
	const handleChangePassword = async () => {
		// Reset errors
		setErrors({});

		// Validate inputs
		let hasErrors = false;
		const newErrors: {
			currentPassword?: string;
			newPassword?: string;
			confirmPassword?: string;
		} = {};

		if (!currentPassword) {
			newErrors.currentPassword = "Mật khẩu hiện tại là bắt buộc";
			hasErrors = true;
		}

		if (!newPassword) {
			newErrors.newPassword = "Mật khẩu mới là bắt buộc";
			hasErrors = true;
		} else if (!validatePassword(newPassword)) {
			newErrors.newPassword =
				"Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
			hasErrors = true;
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
			hasErrors = true;
		} else if (newPassword !== confirmPassword) {
			newErrors.confirmPassword = "Mật khẩu không khớp";
			hasErrors = true;
		}

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		// Submit the form
		setIsLoading(true);

		try {
			const response = await changePassword(currentPassword, newPassword);

			if (response.success) {
				Alert.alert("Thành công", "Mật khẩu đã được cập nhật thành công", [
					{ text: "OK", onPress: () => navigation.goBack() },
				]);
			} else {
				Alert.alert("Lỗi", response.message || "Không thể cập nhật mật khẩu");
			}
		} catch (error) {
			Alert.alert("Lỗi", "Đã xảy ra lỗi. Vui lòng thử lại sau");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.formContainer}>
					<Text style={styles.formTitle}>Thay đổi mật khẩu</Text>
					<Text style={styles.formDescription}>
						Mật khẩu của bạn phải có ít nhất 8 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc
						biệt.
					</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Mật khẩu hiện tại</Text>
						<View style={styles.inputWrapper}>
							<TextInput
								style={styles.input}
								value={currentPassword}
								onChangeText={setCurrentPassword}
								placeholder="Nhập mật khẩu hiện tại của bạn"
								placeholderTextColor={Colors.gray[400]}
								secureTextEntry={!showCurrentPassword}
							/>
							<TouchableOpacity
								style={styles.eyeIcon}
								onPress={() => setShowCurrentPassword(!showCurrentPassword)}
							>
								<MaterialIcons
									name={showCurrentPassword ? "visibility" : "visibility-off"}
									size={22}
									color={Colors.gray[500]}
								/>
							</TouchableOpacity>
						</View>
						{errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Mật khẩu mới</Text>
						<View style={styles.inputWrapper}>
							<TextInput
								style={styles.input}
								value={newPassword}
								onChangeText={setNewPassword}
								placeholder="Nhập mật khẩu mới"
								placeholderTextColor={Colors.gray[400]}
								secureTextEntry={!showNewPassword}
							/>
							<TouchableOpacity
								style={styles.eyeIcon}
								onPress={() => setShowNewPassword(!showNewPassword)}
							>
								<MaterialIcons
									name={showNewPassword ? "visibility" : "visibility-off"}
									size={22}
									color={Colors.gray[500]}
								/>
							</TouchableOpacity>
						</View>
						{errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

						{newPassword.length > 0 && (
							<View style={styles.passwordStrengthContainer}>
								<Text style={styles.passwordStrengthLabel}>Password strength:</Text>
								<View style={styles.passwordStrengthIndicator}>
									<View
										style={[
											styles.passwordStrengthBar,
											styles.passwordWeak,
											validatePassword(newPassword) && styles.passwordStrong,
										]}
									/>
								</View>
								<Text
									style={[
										styles.passwordStrengthText,
										validatePassword(newPassword)
											? styles.passwordStrongText
											: styles.passwordWeakText,
									]}
								>
									{validatePassword(newPassword) ? "Strong" : "Weak"}
								</Text>
							</View>
						)}
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Nhập lại mật khẩu mới</Text>
						<View style={styles.inputWrapper}>
							<TextInput
								style={styles.input}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder="Xác nhận lại mật khẩu mới của bạn"
								placeholderTextColor={Colors.gray[400]}
								secureTextEntry={!showConfirmPassword}
							/>
							<TouchableOpacity
								style={styles.eyeIcon}
								onPress={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								<MaterialIcons
									name={showConfirmPassword ? "visibility" : "visibility-off"}
									size={22}
									color={Colors.gray[500]}
								/>
							</TouchableOpacity>
						</View>
						{errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
					</View>

					<TouchableOpacity
						style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
						onPress={handleChangePassword}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.saveButtonText}>Thay đổi mật khẩu</Text>
						)}
					</TouchableOpacity>
				</View>

				{/* <View style={styles.securityOptionsContainer}>
					<Text style={styles.formTitle}>Tùy chọn bảo mật bổ sung</Text>

					<TouchableOpacity style={styles.securityOption}>
						<View style={styles.securityOptionContent}>
							<MaterialIcons
								name="lock"
								size={24}
								color={Colors.colorBrand.burntSienna[500]}
							/>
							<View style={styles.securityOptionTextContainer}>
								<Text style={styles.securityOptionTitle}>Xác thực hai yếu tố</Text>
								<Text style={styles.securityOptionDescription}>
									Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
								</Text>
							</View>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.securityOption}>
						<View style={styles.securityOptionContent}>
							<MaterialIcons
								name="history"
								size={24}
								color={Colors.colorBrand.burntSienna[500]}
							/>
							<View style={styles.securityOptionTextContainer}>
								<Text style={styles.securityOptionTitle}>Lịch sử đăng nhập</Text>
								<Text style={styles.securityOptionDescription}>
									Xem lại các phiên đăng nhập gần đây của bạn
								</Text>
							</View>
						</View>
						<MaterialIcons
							name="chevron-right"
							size={24}
							color={Colors.gray[400]}
						/>
					</TouchableOpacity>
				</View> */}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	scrollContainer: {
		paddingBottom: 30,
		paddingTop: 20,
	},
	formContainer: {
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingVertical: 20,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		marginHorizontal: 16,
	},
	formTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.gray[900],
		marginBottom: 8,
	},
	formDescription: {
		fontSize: 14,
		color: Colors.gray[600],
		marginBottom: 20,
		lineHeight: 20,
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
		paddingRight: 40,
	},
	eyeIcon: {
		position: "absolute",
		right: 12,
		top: "50%",
		transform: [{ translateY: -12 }],
	},
	errorText: {
		fontSize: 12,
		color: "#D32F2F",
		marginTop: 4,
	},
	saveButton: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		marginTop: 10,
	},
	saveButtonDisabled: {
		backgroundColor: Colors.colorBrand.burntSienna[300],
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	passwordStrengthContainer: {
		marginTop: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	passwordStrengthLabel: {
		fontSize: 12,
		color: Colors.gray[600],
		marginRight: 8,
	},
	passwordStrengthIndicator: {
		flex: 1,
		height: 4,
		backgroundColor: Colors.gray[200],
		borderRadius: 2,
		overflow: "hidden",
	},
	passwordStrengthBar: {
		height: "100%",
		width: "50%",
	},
	passwordWeak: {
		backgroundColor: "#F44336",
		width: "30%",
	},
	passwordStrong: {
		backgroundColor: "#4CAF50",
		width: "100%",
	},
	passwordStrengthText: {
		fontSize: 12,
		marginLeft: 8,
	},
	passwordWeakText: {
		color: "#F44336",
	},
	passwordStrongText: {
		color: "#4CAF50",
	},
	securityOptionsContainer: {
		backgroundColor: "#fff",
		marginTop: 16,
		paddingHorizontal: 16,
		paddingVertical: 20,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		marginHorizontal: 16,
	},
	securityOption: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[100],
	},
	securityOptionContent: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	securityOptionTextContainer: {
		marginLeft: 12,
		flex: 1,
	},
	securityOptionTitle: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.gray[900],
	},
	securityOptionDescription: {
		fontSize: 13,
		color: Colors.gray[500],
		marginTop: 2,
	},
});
