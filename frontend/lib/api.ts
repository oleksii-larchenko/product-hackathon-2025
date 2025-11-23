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

export const registerUser = async (email: string, password: string) => {
	try {
		const response = await api.post("/auth/register", { email, password });
		return response.data;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await api.post("/auth/login", { email, password });
		return response.data;
	} catch (error) {
		throw new Error(getErrorMessage(error));
	}
};
