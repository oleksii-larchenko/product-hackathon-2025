"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChatSidebar } from "@/components/ChatSidebar/ChatSidebar";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import { useAppDispatch } from "@/lib/hooks";
import { openChat } from "@/lib/slices/chatSlice";
import styles from "./styles.module.css";

export const MainPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	return (
		<PageLayout>
			<div className={styles.content}>
				<div className={styles.welcomeSection}>
					<div className={styles.welcomeHeader}>
						<h1 className={styles.welcomeTitle}>Вітаємо, Артем!</h1>
						<button type="button" className={styles.primaryButton}>
							Подати заявку
						</button>
					</div>

					<div className={styles.section}>
						<div className={styles.sectionHeader}>
							<h2 className={styles.sectionTitle}>Рекомендовано для вас</h2>
							<button type="button" className={styles.outlineButton}>
								Все навчання
							</button>
						</div>

						<div className={styles.coursesGrid}>
							<button
								type="button"
								className={styles.courseCard}
								onClick={() => router.push("/courses/first-clients")}
							>
								<div className={styles.courseImage}>
									<Image
										src="/images/courses/first-clients.webp"
										alt="Перші клієнти"
										fill
										sizes="334px"
										className={styles.image}
									/>
								</div>
								<div className={styles.courseContent}>
									<div className={styles.tags}>
										<span className={styles.tag}>Маркетинг з нуля</span>
										<span className={styles.tag}>Практичні інструменти</span>
									</div>
									<h3 className={styles.courseTitle}>
										Перші клієнти: базовий маркетинг і продажі
									</h3>
									<p className={styles.courseDescription}>
										Освітній курс «Перші клієнти: базовий маркетинг і продажі»
										допомагає визначити цільову аудиторію, обрати дієві канали
										просування та освоїти базові інструменти для залучення
										клієнтів.
									</p>
									<div className={styles.divider} />
									<p className={styles.courseMeta}>
										Кількість занять: 12 уроків
									</p>
								</div>
							</button>

							<div className={styles.courseCard}>
								<div className={styles.courseImage}>
									<Image
										src="/images/courses/money.webp"
										alt="Гроші в бізнесі"
										fill
										sizes="334px"
										className={styles.image}
									/>
								</div>
								<div className={styles.courseContent}>
									<div className={styles.tags}>
										<span className={styles.tag}>Планування грошей</span>
										<span className={styles.tag}>Контроль витрат</span>
									</div>
									<h3 className={styles.courseTitle}>
										Гроші в бізнесі: прості фінанси для підприємця
									</h3>
									<p className={styles.courseDescription}>
										Освітній курс «Гроші в бізнесі: прості фінанси для
										підприємця» має на меті навчити підприємця керувати доходами
										й витратами, рахувати прибуток і планувати фінанси бізнесу.
									</p>
									<div className={styles.divider} />
									<p className={styles.courseMeta}>
										Кількість занять: 11 уроків
									</p>
								</div>
							</div>

							<div className={styles.courseCard}>
								<div className={styles.courseImage}>
									<Image
										src="/images/courses/law.webp"
										alt="Юридичні основи"
										fill
										sizes="334px"
										className={styles.image}
									/>
								</div>
								<div className={styles.courseContent}>
									<div className={styles.tags}>
										<span className={styles.tag}>Юридична безпека</span>
										<span className={styles.tag}>Податки</span>
									</div>
									<h3 className={styles.courseTitle}>
										Юридичні основи та податки для малого бізнесу в Україні
									</h3>
									<p className={styles.courseDescription}>
										Освітній курс «Юридичні основи та податки для малого бізнесу
										в Україні» допомагає зрозуміти, як зареєструвати бізнес, які
										податки сплачувати та які базові договори потрібні для
										легальної роботи.
									</p>
									<div className={styles.divider} />
									<p className={styles.courseMeta}>
										Кількість занять: 8 уроків
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.aiSection}>
						<div className={styles.aiCard}>
							<div className={styles.aiCardHeader}>
								<Image
									src="/assets/icons/magicpen.svg"
									alt="AI Консультації"
									width={32}
									height={32}
								/>
								<h3 className={styles.aiCardTitle}>AI Консультації</h3>
							</div>
							<p className={styles.aiCardDescription}>
								Використовуйте нашого AI-помічника, щоб миттєво отримувати
								відповіді на питання про бізнес, податки, документи, аналіз
								конкурентів та підготовку грантової заявки. Доступний у
								будь-який час.
							</p>
							<button
								type="button"
								className={styles.aiButton}
								onClick={() => dispatch(openChat())}
							>
								Почати AI консультацію
							</button>
						</div>

						<div className={styles.aiCard}>
							<div className={styles.aiCardHeader}>
								<Image
									src="/assets/icons/gameboy.svg"
									alt="AI розрахунок"
									width={32}
									height={32}
								/>
								<h3 className={styles.aiCardTitle}>
									Калькулятор беззбитковості
								</h3>
							</div>
							<p className={styles.aiCardDescription}>
								Миттєві розрахунки для вашого бізнес-плану.
								<br />
								Витрати, доходи, ризики та фінмодель — у зручному форматі.
							</p>
							<button
								type="button"
								className={styles.aiButton}
								onClick={() =>
									window.open(
										"https://www.calculator.net/payback-period-calculator.html",
										"_blank",
									)
								}
							>
								Розрахувати
							</button>
						</div>
					</div>

					<div className={styles.section}>
						<div className={styles.sectionHeader}>
							<div className={styles.sectionHeaderText}>
								<h2 className={styles.sectionTitle}>Експертні консультації</h2>
								<p className={styles.sectionSubtitle}>
									Забронюйте індивідуальні сесії з нашими спеціалістами
								</p>
							</div>
							<button type="button" className={styles.outlineButton}>
								Всі експерти
							</button>
						</div>

						<div className={styles.expertsGrid}>
							<div className={styles.expertCard}>
								<div className={styles.expertHeader}>
									<div className={styles.expertAvatar}>
										<Image
											src="/images/experts/anna.webp"
											alt="Анна Романіш"
											width={56}
											height={56}
											className={styles.expertAvatarImage}
										/>
									</div>
									<div className={styles.expertInfo}>
										<h4 className={styles.expertName}>Анна Романіш</h4>
										<p className={styles.expertRole}>Маркетолог в KLO</p>
									</div>
								</div>
								<div className={styles.tags}>
									<span className={styles.tag}>Впізнаваність бізнесу</span>
									<span className={styles.tag}>Продажі</span>
									<span className={styles.tag}>Залучення клієнтів</span>
								</div>
								<div className={styles.divider} />
								<p className={styles.expertAvailability}>
									Найближчий вільний час: <span>Завтра, 14:00</span>
								</p>
								<button
									type="button"
									className={styles.expertButton}
									onClick={() =>
										window.open(
											"https://calendly.com/yuliia-lavrenko-skelar/30min",
											"_blank",
										)
									}
								>
									Забронювати час
								</button>
							</div>

							<div className={styles.expertCard}>
								<div className={styles.expertHeader}>
									<div className={styles.expertAvatar}>
										<Image
											src="/images/experts/ksenia.webp"
											alt="Ксенія Чураєва"
											width={56}
											height={56}
											className={styles.expertAvatarImage}
										/>
									</div>
									<div className={styles.expertInfo}>
										<h4 className={styles.expertName}>Ксенія Чураєва</h4>
										<p className={styles.expertRole}>
											Головний бухгалтер в Fozzy Group
										</p>
									</div>
								</div>
								<div className={styles.tags}>
									<span className={styles.tag}>Облік і звітність</span>
									<span className={styles.tag}>Податки для бізнесу</span>
									<span className={styles.tag}>Фінансове планування</span>
								</div>
								<div className={styles.divider} />
								<p className={styles.expertAvailability}>
									Найближчий вільний час: <span>25.11, 14:00</span>
								</p>
								<button type="button" className={styles.expertButton}>
									Забронювати час
								</button>
							</div>

							<div className={styles.expertCard}>
								<div className={styles.expertHeader}>
									<div className={styles.expertAvatar}>
										<Image
											src="/images/experts/vladislav.webp"
											alt="Владислав Пташнік"
											width={56}
											height={56}
											className={styles.expertAvatarImage}
										/>
									</div>
									<div className={styles.expertInfo}>
										<h4 className={styles.expertName}>Владислав Пташнік</h4>
										<p className={styles.expertRole}>
											Провідний юрист в Kernel
										</p>
									</div>
								</div>
								<div className={styles.tags}>
									<span className={styles.tag}>Договори й контракти</span>
									<span className={styles.tag}>Юридичні ризики</span>
									<span className={styles.tag}>
										Структура та оформлення бізнесу
									</span>
								</div>
								<div className={styles.divider} />
								<p className={styles.expertAvailability}>
									Найближчий вільний час: <span>Сьогодні, 20:00</span>
								</p>
								<button type="button" className={styles.expertButton}>
									Забронювати час
								</button>
							</div>
						</div>
					</div>

					<div className={styles.section}>
						<div className={styles.sectionHeader}>
							<div className={styles.sectionHeaderText}>
								<h2 className={styles.sectionTitle}>Тематичні заходи</h2>
								<p className={styles.sectionSubtitle}>
									Знаходьте людей зі спільними рішеннями
								</p>
							</div>
							<button
								type="button"
								className={styles.outlineButton}
								onClick={() => router.push("/events")}
							>
								Всі заходи
							</button>
						</div>

						<div className={styles.eventsGrid}>
							<button
								type="button"
								className={styles.eventCard}
								onClick={() => router.push("/events/yak-buduvaty-biznes-plan")}
							>
								<div className={styles.tags}>
									<span className={styles.tag}>Подача заявки</span>
									<span className={styles.tag}>Стратегія</span>
									<span className={styles.tag}>Бізнес-модель</span>
								</div>
								<h3 className={styles.eventTitle}>Як будувати бізнес план</h3>
								<p className={styles.eventDescription}>
									Практична подія для тих, хто хоче запустити власну справу або
									зробити свій проєкт більш структурованим та прибутковим
								</p>
								<div className={styles.divider} />
								<div className={styles.eventMeta}>
									<div className={styles.eventMetaItem}>
										<Image
											src="/assets/icons/calendar.svg"
											alt="Дата"
											width={20}
											height={20}
										/>
										<span>15 грудня, 2025</span>
									</div>
									<div className={styles.eventMetaItem}>
										<Image
											src="/assets/icons/coin.svg"
											alt="Ціна"
											width={20}
											height={20}
										/>
										<span>Безкоштовно</span>
									</div>
									<div className={styles.eventMetaItem}>
										<Image
											src="/assets/icons/home-2.svg"
											alt="Локація"
											width={20}
											height={20}
										/>
										<span>Онлайн</span>
									</div>
								</div>
							</button>

							<button
								type="button"
								className={styles.eventCard}
								onClick={() => router.push("/events/veteran-dlya-veterana")}
							>
								<div className={styles.tags}>
									<span className={styles.tag}>Помилки на старті</span>
									<span className={styles.tag}>Практичні поради</span>
									<span className={styles.tag}>Реальний досвід</span>
								</div>
								<h3 className={styles.eventTitle}>
									Ветеран для ветерану: життя після гранту
								</h3>
								<p className={styles.eventDescription}>
									Зустріч, де ветерани, які вже отримали грант і запустили свій
									бізнес, ділитимуться досвідом з тими, хто лише планує
									подаватися.
								</p>
								<div className={styles.divider} />
								<div className={styles.eventMeta}>
									<div className={styles.eventMetaItem}>
										<Image
											src="/assets/icons/calendar.svg"
											alt="Дата"
											width={20}
											height={20}
										/>
										<span>15 грудня, 2025</span>
									</div>
									<div className={styles.eventMetaItem}>
										<Image
											src="/assets/icons/coin.svg"
											alt="Ціна"
											width={20}
											height={20}
										/>
										<span>Безкоштовно</span>
									</div>
									<div className={styles.eventMetaItem}>
										<Image
											src="/assets/icons/home-2.svg"
											alt="Локація"
											width={20}
											height={20}
										/>
										<span>Онлайн</span>
									</div>
								</div>
							</button>
						</div>
					</div>

					<div className={styles.faqSection}>
						<h2 className={styles.faqTitle}>Часті запитання</h2>
						<div className={styles.faqList}>
							<div className={styles.faqItem}>
								<p className={styles.faqQuestion}>
									Як знайти відкриті програми для грантів?
								</p>
								<Image
									src="/assets/icons/add-circle.svg"
									alt=""
									width={40}
									height={40}
								/>
							</div>
							<div className={styles.faqItem}>
								<p className={styles.faqQuestion}>Як подати заявку на грант?</p>
								<Image
									src="/assets/icons/add-circle.svg"
									alt=""
									width={40}
									height={40}
								/>
							</div>
							<div className={styles.faqItem}>
								<p className={styles.faqQuestion}>
									Що таке AI консультації і чим вони відрізняються від
									експертних консультацій?
								</p>
								<Image
									src="/assets/icons/add-circle.svg"
									alt=""
									width={40}
									height={40}
								/>
							</div>
							<div className={styles.faqItem}>
								<p className={styles.faqQuestion}>
									Як забронювати експертну консультацію (менторську сесію)?
								</p>
								<Image
									src="/assets/icons/add-circle.svg"
									alt=""
									width={40}
									height={40}
								/>
							</div>
							<div className={styles.faqItemLast}>
								<p className={styles.faqQuestion}>
									Що таке тематичні заходи і як на них потрапити?
								</p>
								<Image
									src="/assets/icons/add-circle.svg"
									alt=""
									width={40}
									height={40}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ChatSidebar />
		</PageLayout>
	);
};
