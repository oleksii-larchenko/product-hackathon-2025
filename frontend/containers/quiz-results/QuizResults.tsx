"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";

const mockResults = {
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

export const QuizResults = () => {
	const router = useRouter();

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
					<p className={styles.sectionText}>
						{mockResults.business_description}
					</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Аналіз ринку</h2>
					<ul className={styles.sectionList}>
						{mockResults.market_analysis.map((item, index) => (
							<li key={index} className={styles.listItem}>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Зони фокусу</h2>
					<ul className={styles.sectionList}>
						{mockResults.focus_areas.map((item, index) => (
							<li key={index} className={styles.listItem}>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Ризики</h2>
					<ul className={styles.sectionList}>
						{mockResults.risks.map((item, index) => (
							<li key={index} className={styles.listItem}>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={`${styles.button} ${styles.buttonPrimary}`}
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

