import * as ImagePicker from "expo-image-picker";

/**
 * Chọn ảnh từ thư viện và trả về URI của ảnh đã chọn
 * @returns {Promise<string | null>}
 */
const imagePicker = async (): Promise<string | null> => {
	try {
		// Yêu cầu quyền truy cập ảnh
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted) {
			alert("Bạn cần cấp quyền truy cập ảnh!");
			return null;
		}

		// Mở thư viện chọn ảnh
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"], // Dùng chuỗi thay vì MediaTypeOptions.Images
			allowsEditing: true, // Cho phép chỉnh sửa ảnh
			aspect: [1, 1], // Cắt ảnh theo tỷ lệ 1:1
			quality: 1, // Chất lượng ảnh cao nhất
		});

		return result.canceled || !result.assets?.length ? null : result.assets[0].uri;
	} catch (error) {
		console.error("Lỗi khi chọn ảnh:", error);
		return null;
	}
};

export default imagePicker;
