import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api";

interface AuthState {
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;
	user_id: number | null;
}

const loadAuthFromStorage = (): Partial<AuthState> => {
	if (typeof window === "undefined") {
		return {};
	}
	const storedUserId = localStorage.getItem("auth_user_id");
	const storedIsAuthenticated = localStorage.getItem("auth_is_authenticated");
	return {
		user_id: storedUserId ? Number(storedUserId) : null,
		isAuthenticated: storedIsAuthenticated === "true",
	};
};

const initialState: AuthState = {
	isLoading: false,
	error: null,
	isAuthenticated: false,
	user_id: null,
	...loadAuthFromStorage(),
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

const saveAuthToStorage = (user_id: number | null, isAuthenticated: boolean) => {
	if (typeof window !== "undefined") {
		if (user_id !== null) {
			localStorage.setItem("auth_user_id", String(user_id));
		} else {
			localStorage.removeItem("auth_user_id");
		}
		localStorage.setItem("auth_is_authenticated", String(isAuthenticated));
	}
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user_id = null;
			saveAuthToStorage(null, false);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user_id = action.payload.user_id;
				state.error = null;
				saveAuthToStorage(action.payload.user_id, true);
			})
			.addCase(registerAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(loginAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user_id = action.payload.user_id;
				state.error = null;
				saveAuthToStorage(action.payload.user_id, true);
			})
			.addCase(loginAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
