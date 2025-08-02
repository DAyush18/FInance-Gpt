"use client";

import { useEffect, useState } from "react";

interface NoSSRProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * NoSSR component to prevent hydration mismatches
 * Only renders children on the client side after hydration
 */
export default function NoSSR({ children, fallback = null }: NoSSRProps) {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return <>{fallback}</>;
	}

	return <>{children}</>;
}
