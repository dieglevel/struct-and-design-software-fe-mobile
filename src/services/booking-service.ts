import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config";
import { Gateway } from "@/libs/axios";
import { AxiosError } from "axios";
import { Tour } from "@/types/implement/tour";
import { TourHistoryItem } from "@/types/implement/tour-history";
import { FavoriteTourItem } from "@/types/implement/tour-favorite";
import { safeApiCall } from "@/libs/axios/safe-api-call";
import { Category } from "@/types/implement/category";

export const getCategory = async (): Promise<BaseResponse<Category[] | null>> => {
	// return safeApiCall(() => api.get<BaseResponse<Category[] | null>>(`${Gateway.BOOKING}/category-tours`), []);
	const a = await safeApiCall(() => api.get<BaseResponse<any>>(`${Gateway.BOOKING}/category-tours`), []);
	const b = await api.get<BaseResponse<any>>(`${Gateway.BOOKING}/category-tours`);
	return a

};

export const getToursByCategory = async (categoryId: string) => {
	return safeApiCall(() => api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours/${categoryId}/tours`), []);
};

export const searchFullText = async (keyword: string) => {
	return safeApiCall(() => api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours/search/${keyword}`), []);
};

export const getHistoryTours = async (userId: string) => {
	return safeApiCall(() => api.get<BaseResponse<TourHistoryItem[]>>(`${Gateway.BOOKING}/history/${userId}`), []);
};

export const addHistoryTour = async (userId: string, tourId: string) => {
	return safeApiCall(
		() => api.post<BaseResponse<TourHistoryItem[]>>(`${Gateway.BOOKING}/history`, { userId, tourId }),
		[],
	);
};

export const getFavoriteTours = async (userId: string) => {
	return safeApiCall(() => api.get<BaseResponse<FavoriteTourItem[]>>(`${Gateway.BOOKING}/favorites/${userId}`), []);
};

export const addFavoriteTour = async (userId: string, tourId: string) => {
	return safeApiCall(
		() => api.post<BaseResponse<FavoriteTourItem[]>>(`${Gateway.BOOKING}/favorites`, { userId, tourId }),
		[],
	);
};

export const deleteFavoriteTour = async (userId: string, tourId: string) => {
	return safeApiCall(
		() => api.delete<BaseResponse<FavoriteTourItem[]>>(`${Gateway.BOOKING}/favorites/${userId}/${tourId}`),
		[],
	);
};
