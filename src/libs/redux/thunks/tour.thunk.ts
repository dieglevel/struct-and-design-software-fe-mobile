import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getFavoriteTours,
	getHistoryTours,
	addFavoriteTour as addFavoriteService,
	addHistoryTour as addHistoryService,
	deleteFavoriteTour,
} from "@/services/booking-service";
import { RootState } from "../redux.config";

export const fetchHistoryTours = createAsyncThunk(
	"history/fetchHistoryTours",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.data?.userId;

			if (!userId) {
				return rejectWithValue("User ID không tồn tại");
			}

			const response = await getHistoryTours(userId);

			return response.success === true
				? response.data
				: rejectWithValue(response.message || "Không lấy được lịch sử tour");
		} catch (error: any) {
			return rejectWithValue(error?.message || "Lỗi khi lấy lịch sử tour");
		}
	},
);

export const fetchFavoriteTours = createAsyncThunk(
	"favorite/fetchFavoriteTours",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.data?.userId;

			if (!userId) {
				return rejectWithValue("User ID không tồn tại");
			}

			const response = await getFavoriteTours(userId);

			return response.success === true
				? response.data
				: rejectWithValue(response.message || "Không lấy được tour yêu thích");
		} catch (error: any) {
			return rejectWithValue(error?.message || "Lỗi khi lấy lịch sử tour");
		}
	},
);

export const addFavoriteTour = createAsyncThunk(
	"favorite/addFavoriteTour",
	async (tourId: string, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.data?.userId;

			if (!userId) {
				return rejectWithValue("User ID không tồn tại");
			}

			const response = await addFavoriteService(userId, tourId);

			return response.success === true
				? response.data
				: rejectWithValue(response.message || "Không thêm được tour yêu thích");
		} catch (error: any) {
			return rejectWithValue(error?.message || "Lỗi khi thêm tour yêu thích");
		}
	},
);

export const removeFavoriteTour = createAsyncThunk(
	"favorite/removeFavoriteTour",
	async (tourId: string, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.data?.userId;

			if (!userId) {
				return rejectWithValue("User ID không tồn tại");
			}

			const response = await deleteFavoriteTour(userId, tourId);

			return response.success === true
				? response.data
				: rejectWithValue(response.message || "Không xóa được tour yêu thích");
		} catch (error: any) {
			return rejectWithValue(error?.message || "Lỗi khi xóa tour yêu thích");
		}
	},
);

export const addHistoryTour = createAsyncThunk(
	"history/addHistoryTour",
	async (tourId: string, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.data?.userId;

			if (!userId) {
				return rejectWithValue("User ID không tồn tại");
			}

			const response = await addHistoryService(userId, tourId);

			return response.success === true
				? response.data
				: rejectWithValue(response.message || "Không thêm được lịch sử tour");
		} catch (error: any) {
			return rejectWithValue(error?.message || "Lỗi khi thêm lịch sử tour");
		}
	},
);
