"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import styles from "./styles.module.css";

const MOCK_EVENTS = [
	{
		id: "yak-buduvaty-biznes-plan",
		title: "Як будувати бізнес план",
		description:
			"Практична подія для тих, хто хоче запустити власну справу або зробити свій проєкт більш структурованим та прибутковим",
		tags: ["Подача заявки", "Стратегія", "Бізнес-модель"],
		date: "15 грудня, 2025",
		price: "Безкоштовно",
		location: "Онлайн",
	},
	{
		id: "veteran-dlya-veterana",
		title: "Ветеран для ветерану: життя після гранту",
		description:
			"Зустріч, де ветерани, які вже отримали грант і запустили свій бізнес, ділитимуться досвідом з тими, хто лише планує подаватися.",
		tags: ["Помилки на старті", "Практичні поради", "Реальний досвід"],
		date: "15 грудня, 2025",
		price: "Безкоштовно",
		location: "Онлайн",
	},
];

export const EventsPage = () => {
	const router = useRouter();

	return (
		<PageLayout>
			<div className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>Тематичні заходи</h1>
					<p className={styles.subtitle}>
						Знаходьте людей зі спільними рішеннями
					</p>
				</div>

				<div className={styles.eventsGrid}>
					{MOCK_EVENTS.map((event) => (
						<button
							key={event.id}
							type="button"
							className={styles.eventCard}
							onClick={() => router.push(`/events/${event.id}`)}
						>
							<div className={styles.tags}>
								{event.tags.map((tag, index) => (
									<span key={index} className={styles.tag}>
										{tag}
									</span>
								))}
							</div>
							<h3 className={styles.eventTitle}>{event.title}</h3>
							<p className={styles.eventDescription}>{event.description}</p>
							<div className={styles.divider} />
							<div className={styles.eventMeta}>
								<div className={styles.eventMetaItem}>
									<Image
										src="/assets/icons/calendar.svg"
										alt="Дата"
										width={20}
										height={20}
									/>
									<span>{event.date}</span>
								</div>
								<div className={styles.eventMetaItem}>
									<Image
										src="/assets/icons/coin.svg"
										alt="Ціна"
										width={20}
										height={20}
									/>
									<span>{event.price}</span>
								</div>
								<div className={styles.eventMetaItem}>
									<Image
										src="/assets/icons/home-2.svg"
										alt="Локація"
										width={20}
										height={20}
									/>
									<span>{event.location}</span>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>
		</PageLayout>
	);
};

