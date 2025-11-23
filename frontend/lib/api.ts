import axios, { type AxiosError } from "axios";

const api = axios.create({
	baseURL: "http://localhost:8082",
	headers: {
		"Content-Type": "application/json",
	},
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
	const payload = {
		existing_business: answers.existing_business as string,
		idea_stage: answers.idea_stage as string,
		business_sector: answers.business_sector as string,
		business_description: answers.business_description as string,
		primary_location: answers.primary_location as string,
		market_understanding: answers.market_understanding as string,
		client_understanding: answers.client_understanding as string,
		finance_skills: answers.finance_skills as string,
		marketing_skills: answers.marketing_skills as string,
		promotion_channels: answers.promotion_channels as string[],
		tax_understanding: answers.tax_understanding as string,
		contracts_experience: answers.contracts_experience as string,
		hiring_plan: answers.hiring_plan as string,
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
