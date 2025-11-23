"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import styles from "./styles.module.css";

const MOCK_EVENTS: Record<
	string,
	{
		id: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		price: string;
		location: string;
		about: string;
		targetAudience: string[];
		speakers: Array<{
			name: string;
			role: string;
			image: string;
		}>;
	}
> = {
	"yak-buduvaty-biznes-plan": {
		id: "yak-buduvaty-biznes-plan",
		title: "Як будувати бізнес план",
		description:
			"Практична подія для тих, хто хоче запустити власну справу або зробити свій проєкт більш структурованим та прибутковим",
		tags: ["Подача заявки", "Стратегія", "Бізнес-модель"],
		date: "15 грудня, 2025",
		price: "Безкоштовно",
		location: "Онлайн",
		about:
			"Бізнес-план — це не просто документ «для галочки». Це інструмент, який допомагає зрозуміти свою ідею, перевірити попит, порахувати гроші та уникнути помилок на старті.\nНа цій події ми розберемося, як створити дієвий бізнес-план, який працює в умовах українського ринку та під вимоги грантових програм.",
		targetAudience: [
			"ветеранам, які планують відкрити власний бізнес;",
			"тим, хто подається або планує подаватися на грант;",
			"підприємцям-початківцям;",
			"усім, хто хоче структурувати свою бізнес-ідею.",
		],
		speakers: [
			{
				name: "Анна Романіш",
				role: "Маркетолог в KLO",
				image: "/images/experts/anna.webp",
			},
			{
				name: "Ксенія Чураєва",
				role: "Головний бухгалтер в Fozzy Group",
				image: "/images/experts/ksenia.webp",
			},
			{
				name: "Владислав Пташнік",
				role: "Провідний юрист в Kernel",
				image: "/images/experts/vladislav.webp",
			},
		],
	},
	"veteran-dlya-veterana": {
		id: "veteran-dlya-veterana",
		title: "Ветеран для ветерану: життя після гранту",
		description:
			"Зустріч, де ветерани, які вже отримали грант і запустили свій бізнес, ділитимуться досвідом з тими, хто лише планує подаватися.",
		tags: ["Помилки на старті", "Практичні поради", "Реальний досвід"],
		date: "15 грудня, 2025",
		price: "Безкоштовно",
		location: "Онлайн",
		about:
			"Після отримання гранту багато підприємців стикаються з новими викликами та питаннями. На цій зустрічі ви дізнаєтеся про реальний досвід тих, хто вже пройшов цей шлях.",
		targetAudience: [
			"ветеранам, які отримали грант;",
			"тим, хто планує подаватися на грант;",
			"підприємцям, які хочуть уникнути помилок;",
			"усім, хто цікавиться реальним досвідом.",
		],
		speakers: [
			{
				name: "Анна Романіш",
				role: "Маркетолог в KLO",
				image: "/images/experts/anna.webp",
			},
			{
				name: "Ксенія Чураєва",
				role: "Головний бухгалтер в Fozzy Group",
				image: "/images/experts/ksenia.webp",
			},
			{
				name: "Владислав Пташнік",
				role: "Провідний юрист в Kernel",
				image: "/images/experts/vladislav.webp",
			},
		],
	},
};

type EventDetailPageProps = {
	eventId: string;
};

export const EventDetailPage = ({ eventId }: EventDetailPageProps) => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const event = MOCK_EVENTS[eventId] || MOCK_EVENTS["yak-buduvaty-biznes-plan"];

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
						<path
							d="M6 4L10 8L6 12"
							stroke="#1c1c1c"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<span className={styles.breadcrumbCurrent}>{event.title}</span>
			</div>

			<div className={styles.eventInfoCard}>
				<div className={styles.tags}>
					{event.tags.map((tag, index) => (
						<span key={index} className={styles.tag}>
							{tag}
						</span>
					))}
				</div>
				<div className={styles.eventHeader}>
					<h1 className={styles.eventTitle}>{event.title}</h1>
					<p className={styles.eventDescription}>{event.description}</p>
				</div>
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
				<button type="button" className={styles.registerButton}>
					Зареєструватися
				</button>
			</div>

			<div className={styles.twoColumnSection}>
				<div className={styles.infoCard}>
					<h2 className={styles.infoCardTitle}>Про зустріч</h2>
					<div className={styles.infoCardContent}>
						{event.about.split("\n").map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
				</div>

				<div className={styles.infoCard}>
					<h2 className={styles.infoCardTitle}>Кому буде корисно</h2>
					<ul className={styles.targetAudienceList}>
						{event.targetAudience.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			</div>

			<div className={styles.speakersCard}>
				<h2 className={styles.speakersTitle}>Спікери</h2>
				<div className={styles.speakersList}>
					{event.speakers.map((speaker, index) => (
						<div key={index} className={styles.speakerItem}>
							<div className={styles.speakerAvatar}>
								<Image
									src={speaker.image}
									alt={speaker.name}
									width={56}
									height={56}
									className={styles.speakerAvatarImage}
								/>
							</div>
							<div className={styles.speakerInfo}>
								<h3 className={styles.speakerName}>{speaker.name}</h3>
								<p className={styles.speakerRole}>{speaker.role}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.registrationCard}>
				<h2 className={styles.registrationTitle}>Заєєструватися на івент</h2>
				<form onSubmit={handleSubmit} className={styles.registrationForm}>
					<div className={styles.formField}>
						<input
							type="text"
							placeholder="Повне ім'я"
							value={formData.fullName}
							onChange={(e) => handleInputChange(e, "fullName")}
							className={styles.input}
						/>
					</div>
					<div className={styles.formField}>
						<input
							type="email"
							placeholder="Email"
							value={formData.email}
							onChange={(e) => handleInputChange(e, "email")}
							className={styles.input}
						/>
					</div>
					<div className={styles.formField}>
						<input
							type="tel"
							placeholder="Номер телефону"
							value={formData.phone}
							onChange={(e) => handleInputChange(e, "phone")}
							className={styles.input}
						/>
					</div>
					<button type="submit" className={styles.submitButton}>
						Зареєструватися
					</button>
				</form>
			</div>
		</PageLayout>
	);
};

