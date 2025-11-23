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

export const submitQuiz = async (answers: Record<string, string | string[]>) => {
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

	console.log("Quiz payload:", payload);

	const mockResponse = {
		business_description:
			"Ваша ідея створити кав'ярню біля бізнес-центру є цікавою та має потенціал, особливо з акцентом на працевлаштуванні ветеранів. Це може залучити місцеву громаду та людей, які підтримують ветеранів.",
		market_analysis: [
			"У секторі харчової промисловості та ресторанному бізнесі спостерігається стабільний попит на кав'ярні та заклади з їжею у невеликих містах, де конкуренція може бути меншою, ніж у великих містах.",
			"Типові конкуренти — це локальні кав'ярні, кондитерські та мережі швидкого харчування, але акцент на ветеранах може виділити вашу кав'ярню на фоні інших.",
			"Основні послуги включають приготування кави, продаж сендвічів та десертів, а базове обладнання — це кавомашина, холодильник та піч для випічки.",
			"Зазвичай для такого бізнесу потрібна команда з 3–10 осіб, включаючи бариста, кухаря та обслуговуючий персонал.",
		],
		focus_areas: [
			"Покращити маркетингові навички для ефективного просування бізнесу.",
			"Глибше вивчити податкове законодавство та звітність, щоб уникнути проблем.",
			"Розробити детальний фінансовий план для управління витратами та доходами.",
		],
		risks: [
			"Економічні ризики: нестабільність курсу гривні може вплинути на вартість продуктів; рекомендується формувати запас фінансів.",
			"Правові ризики: можливі зміни в законодавстві щодо ведення бізнесу; слідкуйте за оновленнями та консультуйтесь з юристом.",
			"Інфраструктурні ризики: поганий стан доріг або комунікацій може вплинути на постачання товарів; варто розглянути альтернативних постачальників.",
		],
	};

	return Promise.resolve(mockResponse);
};
