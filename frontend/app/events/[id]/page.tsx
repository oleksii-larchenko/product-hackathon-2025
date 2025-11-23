"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { EventDetailPage } from "@/containers/event-detail-page/EventDetailPage";
import { useAppSelector } from "@/lib/hooks";

export default function EventDetailPageRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const router = useRouter();
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const [mounted, setMounted] = useState(false);
	const { id } = use(params);

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

	return <EventDetailPage eventId={id} />;
}

