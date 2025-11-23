import axios, { type AxiosError } from "axios";

const api = axios.create({
	baseURL: "http://localhost:8082",
});

const getErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError<{
			message?: string;
			error?: string;
		}>;
		return (
			axiosError.response?.data?.message ||
			axiosError.response?.data?.error ||
			axiosError.message ||
			"An error occurred"
		);
	}
	if (error instanceof Error) {
		return error.message;
	}
	return "An unexpected error occurred";
};

export interface RegisterResponse {
	user_id: number;
}

export interface LoginResponse {
	user_id: number;
}

export const registerUser = async (
	email: string,
	password: string,
): Promise<RegisterResponse> => {
	try {
		const response = await api.post<RegisterResponse>("/auth/register", {
			email,
			password,
		});
		if (!response.data || typeof response.data.user_id !== "number") {
			console.error("[API] Invalid register response:", response.data);
			throw new Error("Invalid response from server");
		}
		return response.data;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
};

export const loginUser = async (
	email: string,
	password: string,
): Promise<LoginResponse> => {
	try {
		const response = await api.post<LoginResponse>("/auth/login", {
			email,
			password,
		});
		if (!response.data || typeof response.data.user_id !== "number") {
			console.error("[API] Invalid login response:", response.data);
			throw new Error("Invalid response from server");
		}
		return response.data;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
};

export interface QuizResponse {
	overview: string;
	market: string[];
	focus_areas: string[];
	risks: string[];
}

export const submitQuiz = async (
	answers: Record<string, string | string[]>,
	userId: number,
): Promise<QuizResponse> => {
	if (!userId || userId <= 0 || !Number.isInteger(userId)) {
		throw new Error("Invalid user ID");
	}

	const payload = {
		existing_business: answers.existing_business || "",
		idea_stage: answers.idea_stage || "",
		business_sector: answers.business_sector || "",
		business_description: answers.business_description || "",
		primary_location: answers.primary_location || "",
		market_understanding: answers.market_understanding || "",
		client_understanding: answers.client_understanding || "",
		finance_skills: answers.finance_skills || "",
		marketing_skills: answers.marketing_skills || "",
		promotion_channels: answers.promotion_channels || [],
		tax_understanding: answers.tax_understanding || "",
		contracts_experience: answers.contracts_experience || "",
		hiring_plan: answers.hiring_plan || "",
	};

	try {
		const response = await api.post<string | QuizResponse>(
			`/summary/${userId}`,
			payload,
		);

		let parsedData: QuizResponse;
		if (typeof response.data === "string") {
			parsedData = JSON.parse(response.data) as QuizResponse;
		} else {
			parsedData = response.data as QuizResponse;
		}

		return parsedData;
	} catch (error) {
		console.error("[API] Error submitting quiz:", error);
		throw new Error(getErrorMessage(error));
	}
};

export interface ChatMessageResponse {
	role: "user" | "assistant";
	content: string;
}

export interface ChatMessagesResponse {
	[orderNumber: number]: ChatMessageResponse;
}

export const sendChatMessage = async (
	userId: number,
	message: string,
): Promise<ChatMessageResponse> => {
	if (!userId || userId <= 0 || !Number.isInteger(userId)) {
		throw new Error("Invalid user ID");
	}
	try {
		const response = await api.post<ChatMessageResponse>(`/chat/${userId}`, {
			message,
		});
		return response.data;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
};

export const getChatMessages = async (
	userId: number,
): Promise<ChatMessagesResponse> => {
	if (!userId || userId <= 0 || !Number.isInteger(userId)) {
		throw new Error("Invalid user ID");
	}
	try {
		const response = await api.get<ChatMessagesResponse>(`/chat/${userId}`);
		return response.data;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
};
