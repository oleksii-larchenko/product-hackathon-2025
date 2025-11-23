export interface QuizQuestion {
	key: string;
	type: "single" | "multiple" | "text";
	question: string;
	options?: string[];
}

export interface QuizAnswer {
	[key: string]: string | string[];
}

export interface QuizPayload {
	existing_business: string;
	idea_stage: string;
	business_sector: string;
	business_description: string;
	primary_location: string;
	market_understanding: string;
	client_understanding: string;
	finance_skills: string;
	marketing_skills: string;
	promotion_channels: string[];
	tax_understanding: string;
	contracts_experience: string;
	hiring_plan: string;
}

export interface QuizResults {
	overview: string;
	market: string[];
	focus_areas: string[];
	risks: string[];
}

