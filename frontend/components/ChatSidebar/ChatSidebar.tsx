"use client";

import { useEffect, useRef, useState } from "react";
import { getChatMessages, sendChatMessage } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	addMessage,
	type ChatMessage,
	closeChat,
	setLoading,
	setMessages,
} from "@/lib/slices/chatSlice";
import styles from "./styles.module.css";
import { renderMarkdown } from "@/lib/markdown";

const formatDate = (date: Date): string => {
	const months = [
		"Січня",
		"Лютого",
		"Березня",
		"Квітня",
		"Травня",
		"Червня",
		"Липня",
		"Серпня",
		"Вересня",
		"Жовтня",
		"Листопада",
		"Грудня",
	];
	return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const groupMessagesByDate = (
	messages: ChatMessage[],
): Map<string, ChatMessage[]> => {
	const groups = new Map<string, ChatMessage[]>();

	messages.forEach((message) => {
		const date = message.timestamp ? new Date(message.timestamp) : new Date();
		const dateKey = formatDate(date);

		if (!groups.has(dateKey)) {
			groups.set(dateKey, []);
		}
		groups.get(dateKey)!.push(message);
	});

	return groups;
};

export const ChatSidebar = () => {
	const dispatch = useAppDispatch();
	const { isOpen, messages, isLoading } = useAppSelector((state) => state.chat);
	const { user_id } = useAppSelector((state) => state.auth);
	const [inputValue, setInputValue] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen && user_id) {
			const fetchMessages = async () => {
				try {
					dispatch(setLoading(true));
					const response = await getChatMessages(user_id);
					const formattedMessages: ChatMessage[] = Object.entries(response)
						.map(([orderNumber, msg]) => ({
							role: msg.role as "user" | "assistant",
							content: msg.content,
							orderNumber: Number(orderNumber),
						}))
						.sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
					dispatch(setMessages(formattedMessages));
				} catch (error) {
					console.error("Failed to fetch messages:", error);
				} finally {
					dispatch(setLoading(false));
				}
			};
			fetchMessages();
		}
	}, [isOpen, user_id, dispatch]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const handleClose = () => {
		dispatch(closeChat());
	};

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	const handleSend = async () => {
		if (!inputValue.trim() || !user_id || isLoading) return;

		const messageToSend = inputValue.trim();
		setInputValue("");

		const currentMaxOrderNumber =
			messages.length > 0
				? Math.max(...messages.map((m) => m.orderNumber || 0))
				: 0;
		const userOrderNumber = currentMaxOrderNumber + 1;
		const assistantOrderNumber = userOrderNumber + 1;

		const userMessage: ChatMessage = {
			role: "user",
			content: messageToSend,
			orderNumber: userOrderNumber,
			timestamp: new Date().toISOString(),
		};

		const messagesBeforeOptimistic = messages;
		dispatch(addMessage(userMessage));
		dispatch(setLoading(true));

		try {
			const assistantResponse = await sendChatMessage(user_id, messageToSend);
			const assistantMessage: ChatMessage = {
				role: assistantResponse.role,
				content: assistantResponse.content,
				orderNumber: assistantOrderNumber,
				timestamp: new Date().toISOString(),
			};
			dispatch(addMessage(assistantMessage));
		} catch (error) {
			console.error("Failed to send message:", error);
			dispatch(setMessages(messagesBeforeOptimistic));
			setInputValue(messageToSend);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	if (!isOpen) return null;

	const messageGroups = groupMessagesByDate(messages);

	return (
		<>
			<div className={styles.overlay} onClick={handleOverlayClick} />
			<div className={styles.sidebar}>
				<div className={styles.header}>
					<h2 className={styles.title}>AI Консультації</h2>
					<button
						type="button"
						className={styles.closeButton}
						onClick={handleClose}
						aria-label="Close chat"
					>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="16"
								cy="16"
								r="15"
								stroke="#1c1c1c"
								strokeWidth="1"
								fill="none"
							/>
							<path
								d="M12 12L20 20M20 12L12 20"
								stroke="#1c1c1c"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div className={styles.content}>
					<div className={styles.messagesContainer} ref={messagesContainerRef}>
						{messageGroups.size === 0 && !isLoading && (
							<div className={styles.emptyState}>
								<p>Почніть розмову з AI-помічником</p>
							</div>
						)}
						{Array.from(messageGroups.entries()).map(
							([dateKey, dateMessages]) => (
								<div key={dateKey} className={styles.dateGroup}>
									<div className={styles.dateSeparator}>
										<span>{dateKey}</span>
									</div>
									{dateMessages.map((message, index) => (
										<div
											key={`${dateKey}-${index}`}
											className={`${styles.messageWrapper} ${
												message.role === "user"
													? styles.messageWrapperUser
													: styles.messageWrapperAssistant
											}`}
										>
											{message.role === "user" && (
												<div className={styles.userAvatar}>
													<span>A</span>
												</div>
											)}
											<div
												className={`${styles.message} ${
													message.role === "user"
														? styles.messageUser
														: styles.messageAssistant
												}`}
											>
												<p>{renderMarkdown(message.content)}</p>
											</div>
										</div>
									))}
								</div>
							),
						)}
						{isLoading && messages.length > 0 && (
							<div className={styles.loadingIndicator}>
								<span>AI набирає відповідь...</span>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
					<div className={styles.inputContainer}>
						<textarea
							className={styles.input}
							placeholder="Напишіть своє питання"
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
								e.target.style.height = "auto";
								e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
							}}
							onKeyDown={handleKeyPress}
							disabled={isLoading}
							rows={1}
						/>
						<div className={styles.inputActions}>
							<button
								type="button"
								className={styles.addButton}
								aria-label="Add attachment"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Add attachment</title>
									<path
										d="M12 5V19M5 12H19"
										stroke="#3d3d3d"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
							</button>
							<button
								type="button"
								className={styles.sendButton}
								onClick={handleSend}
								disabled={!inputValue.trim() || isLoading}
								aria-label="Send message"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Send message</title>
									<path
										d="M2.66667 8L14.6667 2L8.66667 8L14.6667 14L2.66667 8Z"
										fill="#ffffff"
									/>
									<path
										d="M2.66667 8L8.66667 8L14.6667 14"
										stroke="#ffffff"
										strokeWidth="1"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
