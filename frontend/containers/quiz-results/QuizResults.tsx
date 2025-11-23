"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import type { QuizResults as QuizResultsType } from "@/types/quiz";
import styles from "./styles.module.css";

export const QuizResults = () => {
	const router = useRouter();
	const reduxResults = useAppSelector((state) => state.quiz.results);
	const [results, setResults] = useState<QuizResultsType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (reduxResults) {
			setResults(reduxResults);
			setIsLoading(false);
			return;
		}

		const storedResults = localStorage.getItem("quizResults");

		if (storedResults) {
			try {
				const parsedResults = JSON.parse(storedResults) as QuizResultsType;
				setResults(parsedResults);
			} catch (parseError) {
				console.error(
					"[QuizResults] Failed to parse localStorage data:",
					parseError,
				);
				setError("Failed to parse quiz results");
			}
		} else {
			console.warn(
				"[QuizResults] No quiz results found in Redux or localStorage",
			);
			setError("No quiz results found");
		}

		setIsLoading(false);
	}, [reduxResults]);

	if (isLoading) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<p>Завантаження результатів...</p>
				</div>
			</div>
		);
	}

	if (error || !results) {
		console.error("[QuizResults] Error or no results:", { error, results });
		return (
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<p>Помилка: {error || "Не вдалося завантажити результати"}</p>
					<button
						type="button"
						onClick={() => router.push("/quiz")}
						className={`${styles.button} ${styles.buttonPrimary}`}
					>
						Повернутися до квізу
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.progressBar}>
						<div className={styles.progressBarBg} />
					</div>
					<div className={styles.logo}>
						<Image
							src="/images/logo.webp"
							alt="Logo"
							width={57}
							height={44}
							priority
						/>
					</div>
				</div>
			</div>

			<div className={styles.content}>
				<h1 className={styles.title}>
					Результати пройденого квізу та рекмендації:
				</h1>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Опис бізнес-ідеї</h2>
					<p className={styles.sectionText}>{results.overview}</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Аналіз ринку</h2>
					<ul className={styles.sectionList}>
						{results.market.map((item) => (
							<li key={item} className={styles.listItem}>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Зони фокусу</h2>
					<ul className={styles.sectionList}>
						{results.focus_areas.map((item) => (
							<li key={item} className={styles.listItem}>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ризики</h2>
					<ul className={styles.sectionList}>
						{results.risks.map((item) => (
							<li key={item} className={styles.listItem}>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={`${styles.button} ${styles.buttonPrimary}`}
						onClick={() =>
							window.open(
								"https://www.calculator.net/payback-period-calculator.html",
								"_blank",
							)
						}
					>
						Розрахувати бізнес план
					</button>
					<button
						type="button"
						onClick={() => router.push("/")}
						className={`${styles.button} ${styles.buttonSecondary}`}
					>
						Перейти в кабінет
					</button>
				</div>
			</div>
		</div>
	);
};
