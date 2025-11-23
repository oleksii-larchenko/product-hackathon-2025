"use client";

import { type FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearError, loginAsync, registerAsync } from "@/lib/slices/authSlice";
import styles from "./styles.module.css";

export const AuthPage = () => {
	const [mode, setMode] = useState<"login" | "register">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useAppDispatch();
	const { isLoading, error } = useAppSelector((state) => state.auth);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (isLoading) {
			return;
		}

		dispatch(clearError());

		if (mode === "login") {
			await dispatch(loginAsync({ email, password }));
		} else {
			await dispatch(registerAsync({ email, password }));
		}
	};

	const toggleMode = () => {
		setMode(mode === "login" ? "register" : "login");
		dispatch(clearError());
		setEmail("");
		setPassword("");
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.leftPanel}>
					<div className={styles.leftContent}>
						{mode === "login" ? (
							<>
								<h1 className={styles.welcomeTitle}>Вхід в систему</h1>
								<form onSubmit={handleSubmit} className={styles.form}>
									<div className={styles.inputGroup}>
										<input
											type="email"
											placeholder="E-mail"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											className={styles.input}
										/>
									</div>
									<div className={styles.inputGroup}>
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Пароль"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											className={styles.input}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className={styles.passwordToggle}
										>
											{showPassword ? "👁️" : "👁️‍🗨️"}
										</button>
									</div>
									{error && <div className={styles.error}>{error}</div>}
									<button
										type="submit"
										disabled={isLoading}
										className={styles.submitButton}
									>
										{isLoading ? "Loading..." : "Увійти"}
									</button>
									<button type="button" className={styles.forgotPassword}>
										Забули пароль?
									</button>
								</form>
							</>
						) : (
							<>
								<h1 className={styles.welcomeTitle}>Реєстрація</h1>
								<form onSubmit={handleSubmit} className={styles.form}>
									<div className={styles.inputGroup}>
										<input
											type="email"
											placeholder="E-mail"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											className={styles.input}
										/>
									</div>
									<div className={styles.inputGroup}>
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Пароль"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											className={styles.input}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className={styles.passwordToggle}
										>
											{showPassword ? "👁️" : "👁️‍🗨️"}
										</button>
									</div>
									{error && <div className={styles.error}>{error}</div>}
									<button
										type="submit"
										disabled={isLoading}
										className={styles.submitButton}
									>
										{isLoading ? "Loading..." : "Зареєструватися"}
									</button>
								</form>
							</>
						)}
					</div>
				</div>
				<div className={styles.rightPanel}>
					<div className={styles.rightContent}>
						{mode === "login" ? (
							<>
								<h2 className={styles.rightTitle}>З поверненням!</h2>
								<p className={styles.rightSubtitle}>
									Введіть, будь ласка, свої дані, щоб продовжити користування
									Вебпорталом
								</p>
								<button
									onClick={toggleMode}
									className={styles.toggleButton}
									type="button"
								>
									Зареєструватися
								</button>
							</>
						) : (
							<>
								<h2 className={styles.rightTitle}>Вітаємо!</h2>
								<p className={styles.rightSubtitle}>
									Введіть, будь ласка, свої дані, щоб продовжити користування
									Вебпорталом
								</p>
								<button
									onClick={toggleMode}
									className={styles.toggleButton}
									type="button"
								>
									Увійти
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
