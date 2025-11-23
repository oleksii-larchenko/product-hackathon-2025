"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import styles from "./styles.module.css";

const LESSONS = [
	{
		id: 1,
		title: "Урок 1. Огляд маркетингу та його видів",
		expanded: true,
	},
	{
		id: 2,
		title:
			"Урок 2. Ключові етапи та запитання для формування маркетингової стратегії",
		expanded: false,
	},
	{
		id: 3,
		title: "Урок 3. Поняття шляху клієнта, точок дотику та болей",
		expanded: false,
	},
	{
		id: 4,
		title: "Урок 4. Типи конкурентів - прямі, непрямі, замінні",
		expanded: false,
	},
	{
		id: 5,
		title: "Урок 5. Позиціонування бренду",
		expanded: false,
	},
	{
		id: 6,
		title: "Урок 6. Концепція маркетингової воронки та різні її варіанти",
		expanded: false,
	},
	{
		id: 7,
		title: "Урок 7. Канали залучення клієнтів",
		expanded: false,
	},
	{
		id: 8,
		title: "Урок 8. Знайомство з імейл маркетингом та його можливостей",
		expanded: false,
	},
	{
		id: 9,
		title:
			"Урок 9. Різниця між соцмережами: типи контенту та аудиторія кожного",
		expanded: false,
	},
	{
		id: 10,
		title: "Урок 10. Вплив візуального контенту на залучення аудиторії",
		expanded: false,
	},
	{
		id: 11,
		title: "Урок 11. Робота з базовими формулами в Google Sheets",
		expanded: false,
	},
	{
		id: 12,
		title:
			"Урок 12. Розрахунок загального маркетингового бюджету, середньою вартості та залучення клієнтів",
		expanded: false,
	},
];

const COURSE_OPPORTUNITIES = [
	"Отримати перших платних клієнтів на свою послугу чи товар",
	"Протестувати бізнес-ідею на реальних запитах ринку",
	"Чітко розуміти, хто є вашим клієнтом і де його шукати",
	"Опанувати базові навички продажів без нав'язливих технік",
	"Сформувати зрозумілий план дій на найближчі 1–3 місяці",
	"Розрахувати необхідну кількість продажів і ціновий рівень для досягнення бажаного доходу.",
];

type CourseDetailPageProps = {
	courseId: string;
};

export const CourseDetailPage = ({ courseId }: CourseDetailPageProps) => {
	const router = useRouter();
	const [lessons, setLessons] = useState(LESSONS);

	const toggleLesson = (id: number) => {
		setLessons((prev) =>
			prev.map((lesson) =>
				lesson.id === id ? { ...lesson, expanded: !lesson.expanded } : lesson,
			),
		);
	};

	return (
		<PageLayout>
			<div className={styles.breadcrumbs}>
				<button
					type="button"
					className={styles.breadcrumbLink}
					onClick={() => router.push("/")}
				>
					Головна
				</button>
				<div className={styles.breadcrumbSeparator}>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Arrow right</title>
						<path
							d="M6 4L10 8L6 12"
							stroke="#1c1c1c"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<span className={styles.breadcrumbCurrent}>
					Перші клієнти: базовий маркетинг і продажі
				</span>
			</div>

			<div className={styles.courseInfoCard}>
				<div className={styles.courseHeader}>
					<h1 className={styles.courseTitle}>
						Перші клієнти: базовий маркетинг і продажі
					</h1>
					<p className={styles.courseDescription}>
						Освітній курс «Перші клієнти: базовий маркетинг і продажі» допомагає
						визначити цільову аудиторію, обрати дієві канали просування та
						освоїти базові інструменти для залучення клієнтів.
					</p>
				</div>
				<div className={styles.divider} />
				<div className={styles.courseMeta}>
					<span>Кількість занять: 12 уроків</span>
					<span>Тривалість: 8 годин</span>
					<span>Формат: онлайн</span>
				</div>
			</div>

			<div className={styles.twoColumnSection}>
				<div className={styles.infoCard}>
					<h2 className={styles.infoCardTitle}>Про що цей курс</h2>
					<div className={styles.infoCardContent}>
						<p>
							Під час курсу слухачі крок за кроком розберуться з ключовими
							питаннями старту власної справи: як обрати напрям діяльності,
							чітко сформулювати пропозицію, визначити цільову аудиторію,
							встановити обґрунтовану ціну, обрати базові канали просування
							(соціальні мережі, особисті контакти, професійні та ветеранські
							спільноти) та налагодити комунікацію з потенційними клієнтами —
							від першого контакту до оплати.
						</p>
					</div>
				</div>

				<div className={styles.infoCard}>
					<h2 className={styles.infoCardTitle}>Курс дає можливість</h2>
					<div className={styles.opportunitiesList}>
						{COURSE_OPPORTUNITIES.map((opportunity, index) => (
							<div key={index} className={styles.opportunityItem}>
								<div className={styles.tickIcon}>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Tick</title>
										<path
											d="M20 6L9 17L4 12"
											stroke="#2c427a"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<p>{opportunity}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className={styles.programCard}>
				<h2 className={styles.programTitle}>Програма</h2>
				<div className={styles.lessonsList}>
					{lessons.map((lesson, index) => (
						<div
							key={lesson.id}
							className={
								index === lessons.length - 1
									? styles.lessonItemLast
									: styles.lessonItem
							}
						>
							<div className={styles.lessonHeader}>
								<h3 className={styles.lessonTitle}>{lesson.title}</h3>
								<button
									type="button"
									className={styles.expandButton}
									onClick={() => toggleLesson(lesson.id)}
								>
									{lesson.expanded ? (
										<svg
											width="40"
											height="40"
											viewBox="0 0 40 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>Arrow down</title>
											<path
												d="M19.9987 36.6673C29.1654 36.6673 36.6654 29.1673 36.6654 20.0007C36.6654 10.834 29.1654 3.33398 19.9987 3.33398C10.832 3.33398 3.33203 10.834 3.33203 20.0007C3.33203 29.1673 10.832 36.6673 19.9987 36.6673Z"
												stroke="#292D32"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.332 20H26.6654"
												stroke="#292D32"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									) : (
										<Image
											src="/assets/icons/add-circle.svg"
											alt="Expand"
											width={40}
											height={40}
										/>
									)}
								</button>
							</div>
							{lesson.expanded && lesson.id === 1 && (
								<div className={styles.videoContainer}>
									<div className={styles.videoThumbnail}>
										<Image
											src="/images/courses/course-video-1.webp"
											alt="Video thumbnail"
											fill
											sizes="1080px"
											className={styles.videoImage}
										/>
										<div className={styles.videoOverlay} />
										<div className={styles.playButton}>
											<svg
												width="40"
												height="40"
												viewBox="0 0 40 40"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<title>Play</title>
												<path
													d="M16.6667 13.3333L25 20L16.6667 26.6667V13.3333Z"
													fill="#2c427a"
												/>
											</svg>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</PageLayout>
	);
};
