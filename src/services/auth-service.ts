import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { Gateway } from "@/libs/axios";
import { Auth, RegisterParams, RegisterResponse } from "@/types/implement";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";

export const loginApi = async (username: string, password: string) => {
	try {
		const response = await api.post<BaseResponse<Auth>>(`${Gateway.USER}/auth/token`, { username, password });
		console.log("response", response);

		const { data, statusCode } = response.data;
		if (statusCode === 200) {
			AsyncStorage.setItem(AsyncStorageKey.TOKEN, data?.token || "");
		}
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};

export const logoutApi = async () => {
	try {
		const response = await api.post<BaseResponse<null>>(`${Gateway.USER}/auth/logout`);
		if (response.data.statusCode === 200) {
			await AsyncStorage.removeItem(AsyncStorageKey.TOKEN);
		}
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};

export const registerApi = async (params: RegisterParams) => {
	try {
		const response = await api.post<BaseResponse<RegisterResponse>>(`${Gateway.USER}/users/register`, params);

		if (response.data.statusCode === 200) {
			return response.data;
		}
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};
