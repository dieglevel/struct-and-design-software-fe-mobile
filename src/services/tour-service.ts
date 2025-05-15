import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { Gateway } from "@/libs/axios";
import { Tour } from "@/types/implement";

export const getTours = async () => {
	try {
		const response = await api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours`, {
			validateStatus: (status) => status < 400, // Chấp nhận tất cả mã < 400 vì server trả về 302 có data
		});
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};

export const searchTours = async (tour: Tour) => {
	try {
		const response = await api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours/search`, {
			params: tour,
		});
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};

export const getTourDetails = async (id: string) => {
	try {
		const response = await api.get<BaseResponse<Tour>>(`${Gateway.BOOKING}/tours/${id}`);
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};
