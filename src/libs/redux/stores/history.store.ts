import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHistoryTour, fetchHistoryTours } from "../thunks/tour.thunk";
import { TourHistoryItem } from "@/types/implement/tour-history";

interface HistoryState {
	data: TourHistoryItem[];
	loading: boolean;
	error: string | null;
}

const initialState: HistoryState = {
	data: [],
	loading: false,
	error: null,
};

const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		addToHistory: (state, action: PayloadAction<TourHistoryItem>) => {
			const exists = state.data.some((t) => t.tour.tourId === action.payload.tour.tourId);
			if (!exists) state.data.push(action.payload);
		},
		clearHistory: (state) => {
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistoryTours.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchHistoryTours.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload ?? [];
			})
			.addCase(fetchHistoryTours.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string | null;
			})
			.addCase(addHistoryTour.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addHistoryTour.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload ?? [];
			})
			.addCase(addHistoryTour.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string | null;
			});
	},
});

export const { addToHistory, clearHistory } = historySlice.actions;
const historyReducer = historySlice.reducer;
export default historyReducer;
