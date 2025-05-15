// stores/thunks/user.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/implement";
import { setUser } from "../stores/user.store.";

// Giả sử bạn có một API fetch profile
import { getProfile } from "@/services/user-service";

export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { dispatch, rejectWithValue }) => {
	try {
		const response = await getProfile();
		if (response?.statusCode === 200) {
			dispatch(setUser(response.data as User));
			return response.data;
		} else {
			return rejectWithValue("Không lấy được thông tin user");
		}
	} catch (error) {
		return rejectWithValue(error);
	}
});
