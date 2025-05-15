import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config";
import { Gateway } from "@/libs/axios";
import { User } from "@/types/implement/user";
import { AxiosError } from "axios";
import * as Crypto from "expo-crypto";

export const getProfile = async () => {
	try {
		const response = await api.get<BaseResponse<User>>(`${Gateway.USER}/users/my-info`);
		return response.data;
	} catch (error) {
		const e = error as BaseResponse<null>;
	}
};

export const updateAvatar = async (avatarUri: string): Promise<BaseResponse<User | null>> => {
	const generateFileName = async (uri: string) => {
		const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, uri);
		const fileExtension = uri.split(".").pop(); // Lấy phần mở rộng (jpg, png,...)
		return `${hash}.${fileExtension}`;
	};
	try {
		const formData = new FormData();
		const fileName = await generateFileName(avatarUri);
		console.log("File name:", fileName); // Kiểm tra tên file đã được tạo thành công chưa

		formData.append("avatar", {
			uri: avatarUri,
			name: fileName,
			type: "image/jpeg|jpg|png",
		} as any);

		const response = await api.put<BaseResponse<User>>(`${Gateway.USER}/users/me/avatar`, formData, {
			headers: {
				"Content-Type": "multipart/form-data", // CÓ THỂ LOẠI BỎ để axios tự đặt
			},
		});

		return response.data;
	} catch (error) {
		return {
			message: "Không thể kết nối đến server",
			data: null,
			statusCode: 500,
			success: false,
		};
	}
};

export const updateInfo = async (userInfo: Partial<User>): Promise<BaseResponse<User | null>> => {
	try {
		const response = await api.put<BaseResponse<User>>(`${Gateway.USER}/users/me`, userInfo);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<BaseResponse<null>>;
		if (axiosError.response) {
			return axiosError.response.data;
		}
		return {
			message: "Không thể kết nối đến server",
			data: null,
			statusCode: 500,
			success: false,
		};
	}
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<BaseResponse<User | null>> => {
	try {
		const response = await api.post<BaseResponse<User>>(`${Gateway.USER}/users/change-password`, {
			oldPassword,
			newPassword,
		});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<BaseResponse<null>>;
		if (axiosError.response) {
			return axiosError.response.data;
		}
		return {
			message: "Không thể kết nối đến server",
			data: null,
			statusCode: 500,
			success: false,
		};
	}
};
