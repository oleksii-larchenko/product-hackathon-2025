"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { AuthPage } from "@/containers/auth-page/AuthPage";

export default function Auth() {
	const router = useRouter();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/");
		}
	}, [isAuthenticated, router]);

	return <AuthPage />;
}
