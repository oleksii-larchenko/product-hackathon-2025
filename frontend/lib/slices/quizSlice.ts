import { createSlice } from "@reduxjs/toolkit";
import type { QuizResults } from "@/types/quiz";

interface QuizState {
	results: QuizResults | null;
}

const initialState: QuizState = {
	results: null,
};

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		setResults: (state, action) => {
			state.results = action.payload;
		},
		clearResults: (state) => {
			state.results = null;
		},
	},
});

export const { setResults, clearResults } = quizSlice.actions;
export default quizSlice.reducer;

