import { User } from "@/types/implement";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	data: User | null;
}

const initialState: UserState = {
	data: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.data = action.payload;
		},
		reset: () => initialState,
	},
});

export const { setUser, reset } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
