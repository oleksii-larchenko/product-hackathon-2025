import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import quizReducer from "./slices/quizSlice";
import chatReducer from "./slices/chatSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			quiz: quizReducer,
			chat: chatReducer,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
