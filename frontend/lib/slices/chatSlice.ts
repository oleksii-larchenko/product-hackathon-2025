import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
	timestamp?: string;
	orderNumber?: number;
}

interface ChatState {
	isOpen: boolean;
	messages: ChatMessage[];
	isLoading: boolean;
}

const initialState: ChatState = {
	isOpen: false,
	messages: [],
	isLoading: false,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		openChat: (state) => {
			state.isOpen = true;
		},
		closeChat: (state) => {
			state.isOpen = false;
		},
		addMessage: (state, action: PayloadAction<ChatMessage>) => {
			state.messages.push(action.payload);
			state.messages.sort(
				(a, b) => (a.orderNumber || 0) - (b.orderNumber || 0),
			);
		},
		setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
			state.messages = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const { openChat, closeChat, addMessage, setMessages, setLoading } =
	chatSlice.actions;
export default chatSlice.reducer;
