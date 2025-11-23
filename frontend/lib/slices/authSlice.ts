import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api";

interface AuthState {
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	isLoading: false,
	error: null,
	isAuthenticated: false,
};

export const registerAsync = createAsyncThunk(
	"auth/register",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue },
	) => {
		try {
			const data = await registerUser(email, password);
			return data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue("Registration failed");
		}
	},
);

export const loginAsync = createAsyncThunk(
	"auth/login",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue },
	) => {
		try {
			const data = await loginUser(email, password);
			return data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue("Login failed");
		}
	},
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		logout: (state) => {
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerAsync.fulfilled, (state) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(registerAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(loginAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginAsync.fulfilled, (state) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.error = null;
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
