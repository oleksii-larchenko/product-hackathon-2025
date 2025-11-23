"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
	const router = useRouter();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth");
		}
	}, [isAuthenticated, router]);

	return <div>Veteran Business Platform Dashboard</div>;
}
