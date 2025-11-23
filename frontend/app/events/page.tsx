"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EventsPage } from "@/containers/events-page/EventsPage";
import { useAppSelector } from "@/lib/hooks";

export default function EventsListPage() {
	const router = useRouter();
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted && !isAuthenticated) {
			router.push("/auth");
		}
	}, [mounted, isAuthenticated, router]);

	if (!mounted || !isAuthenticated) {
		return null;
	}

	return <EventsPage />;
}

