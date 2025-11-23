"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { QuizPage } from "@/containers/quiz-page/QuizPage";

export default function Quiz() {
	const router = useRouter();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth");
		}
	}, [isAuthenticated, router]);

	return <QuizPage />;
}

