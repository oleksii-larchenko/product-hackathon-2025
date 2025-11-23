"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { type AppStore, makeStore } from "./store";

export function Providers({ children }: { children: ReactNode }) {
	const storeRef = useRef<AppStore | undefined>(undefined);
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
