"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { quiz } from "@/constants/quiz";
import { submitQuiz } from "@/lib/api";
import type { QuizAnswer } from "@/types/quiz";
import styles from "./styles.module.css";

export const QuizPage = () => {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<QuizAnswer>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const currentQuestion = quiz[currentIndex];
	const progress = ((currentIndex + 1) / quiz.length) * 100;
	const isLastQuestion = currentIndex === quiz.length - 1;

	const handleAnswerChange = (value: string | string[]) => {
		setAnswers((prev) => ({
			...prev,
			[currentQuestion.key]: value,
		}));
	};

	const handleSingleSelect = (option: string) => {
		if (
			currentQuestion.key === "business_sector" &&
			option === "Інше (вкажіть)"
		) {
			handleAnswerChange("");
		} else {
			handleAnswerChange(option);
		}
	};

	const handleMultipleSelect = (option: string) => {
		const currentValue = (answers[currentQuestion.key] as string[]) || [];
		const newValue = currentValue.includes(option)
			? currentValue.filter((v) => v !== option)
			: [...currentValue, option];
		handleAnswerChange(newValue);
	};

	const handleTextChange = (value: string) => {
		handleAnswerChange(value);
	};

	const handleOtherTextChange = (value: string) => {
		handleAnswerChange(value);
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleNext = async () => {
		if (isLastQuestion) {
			setIsSubmitting(true);
			try {
				await submitQuiz(answers);
				router.push("/quiz/results");
			} catch (error) {
				console.error("Failed to submit quiz:", error);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const canProceed = () => {
		const answer = answers[currentQuestion.key];
		if (!answer) return false;
		if (currentQuestion.type === "multiple") {
			return Array.isArray(answer) && answer.length > 0;
		}
		if (currentQuestion.key === "business_sector") {
			const isOtherSelected =
				currentQuestion.options?.includes("Інше (вкажіть)") &&
				!currentQuestion.options?.includes(answer as string);
			if (isOtherSelected) {
				return typeof answer === "string" && answer.trim().length > 0;
			}
		}
		return true;
	};

	const renderQuestion = () => {
		switch (currentQuestion.type) {
			case "single": {
				const currentAnswer = answers[currentQuestion.key] as string;
				const isBusinessSector = currentQuestion.key === "business_sector";
				const otherOption = "Інше (вкажіть)";
				const isOtherSelected =
					isBusinessSector &&
					currentQuestion.options?.includes(otherOption) &&
					!currentQuestion.options?.includes(currentAnswer || "");

				return (
					<div className={styles.options}>
						{currentQuestion.options?.map((option) => {
							const isSelected = isOtherSelected
								? option === otherOption
								: currentAnswer === option;
							return (
								<button
									key={option}
									type="button"
									onClick={() => handleSingleSelect(option)}
									className={`${styles.option} ${
										isSelected ? styles.optionSelected : ""
									}`}
								>
									<div className={styles.optionContent}>
										<div
											className={`${styles.radio} ${
												isSelected ? styles.radioSelected : ""
											}`}
										>
											{isSelected && <div className={styles.radioInner} />}
										</div>
										<span className={styles.optionText}>{option}</span>
									</div>
								</button>
							);
						})}
						{isOtherSelected && (
							<div className={styles.otherInputWrapper}>
								<textarea
									value={currentAnswer || ""}
									onChange={(e) => handleOtherTextChange(e.target.value)}
									placeholder="Вкажіть вашу сферу бізнесу"
									className={styles.otherTextarea}
									rows={4}
								/>
							</div>
						)}
					</div>
				);
			}

			case "multiple":
				return (
					<div className={styles.options}>
						{currentQuestion.options?.map((option) => {
							const selectedValues =
								(answers[currentQuestion.key] as string[]) || [];
							const isSelected = selectedValues.includes(option);
							return (
								<button
									key={option}
									type="button"
									onClick={() => handleMultipleSelect(option)}
									className={`${styles.option} ${
										isSelected ? styles.optionSelected : ""
									}`}
								>
									<div className={styles.optionContent}>
										<div
											className={`${styles.checkbox} ${
												isSelected ? styles.checkboxSelected : ""
											}`}
										>
											{isSelected && (
												<svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<title>Вибрати</title>
													<path
														d="M13.3333 4L6 11.3333L2.66667 8"
														stroke="#2c427a"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											)}
										</div>
										<span className={styles.optionText}>{option}</span>
									</div>
								</button>
							);
						})}
					</div>
				);

			case "text":
				return (
					<div className={styles.textInputWrapper}>
						<textarea
							value={(answers[currentQuestion.key] as string) || ""}
							onChange={(e) => handleTextChange(e.target.value)}
							placeholder="Почніть вводити текст тут"
							className={styles.textarea}
							rows={4}
						/>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.progressBar}>
						<div className={styles.progressBarBg} />
						<div
							className={styles.progressBarFill}
							style={{ width: `${progress}%` }}
						/>
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
				<button type="button" className={styles.breadcrumb}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Повернутися на головну</title>
						<path
							d="M15 18L9 12L15 6"
							stroke="#1c1c1c"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span>Повернутися на головну</span>
				</button>
			</div>

			<div className={styles.content}>
				<div className={styles.questionHeader}>
					<h2 className={styles.question}>{currentQuestion.question}</h2>
					{currentQuestion.type === "multiple" && (
						<p className={styles.questionHint}>
							(можна обрати декілька варіантів)
						</p>
					)}
					{currentQuestion.type === "text" && (
						<p className={styles.questionHint}>(відкрита відповідь)</p>
					)}
				</div>

				{renderQuestion()}

				<div className={styles.navigation}>
					<button
						type="button"
						onClick={handlePrevious}
						disabled={currentIndex === 0}
						className={`${styles.navButton} ${styles.navButtonSecondary}`}
					>
						Назад
					</button>
					<button
						type="button"
						onClick={handleNext}
						disabled={!canProceed() || isSubmitting}
						className={`${styles.navButton} ${styles.navButtonPrimary}`}
					>
						{isSubmitting
							? "Завантаження..."
							: isLastQuestion
								? "Завершити"
								: "Далі"}
					</button>
				</div>
			</div>
		</div>
	);
};
