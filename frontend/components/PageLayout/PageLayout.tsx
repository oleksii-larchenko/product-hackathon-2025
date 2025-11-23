"use client";

import Image from "next/image";
import { Sidebar } from "./Sidebar";
import styles from "./styles.module.css";

type PageLayoutProps = {
	children: React.ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.logo}>
					<Image
						src="/images/logo.webp"
						alt="Logo"
						width={57}
						height={44}
						priority
					/>
				</div>
				<div className={styles.menu}>
					<div className={styles.menuItem}>HEADER</div>
				</div>
				<div className={styles.avatar}>
					<div className={styles.avatarCircle}>You</div>
				</div>
			</div>

			<div className={styles.contentWrapper}>
				<Sidebar />
				<div className={styles.mainContent}>{children}</div>
			</div>
		</div>
	);
};

