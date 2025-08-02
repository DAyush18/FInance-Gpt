"use client";

import { useEffect, useState } from "react";
import { ProgressProvider as OriginalProgressProvider } from "./ProgressContext";

/**
 * Client-safe wrapper for ProgressProvider to prevent hydration mismatches
 */
export function ClientProgressProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// On server and during hydration, render with a minimal provider
	if (!isClient) {
		return <div suppressHydrationWarning>{children}</div>;
	}

	// On client, render with full functionality
	return <OriginalProgressProvider>{children}</OriginalProgressProvider>;
}
