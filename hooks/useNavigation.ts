"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export function useNavigation() {
	const router = useRouter();
	const [isNavigating, setIsNavigating] = useState(false);

	const navigate = useCallback(
		async (path: string, options?: { replace?: boolean }) => {
			setIsNavigating(true);
			
			try {
				if (options?.replace) {
					router.replace(path);
				} else {
					router.push(path);
				}
				
				// Wait a bit for the route change to initiate
				await new Promise(resolve => setTimeout(resolve, 100));
			} finally {
				// Reset navigating state after a short delay
				setTimeout(() => {
					setIsNavigating(false);
				}, 600);
			}
		},
		[router]
	);

	const back = useCallback(() => {
		setIsNavigating(true);
		router.back();
		setTimeout(() => {
			setIsNavigating(false);
		}, 600);
	}, [router]);

	const forward = useCallback(() => {
		setIsNavigating(true);
		router.forward();
		setTimeout(() => {
			setIsNavigating(false);
		}, 600);
	}, [router]);

	return {
		navigate,
		back,
		forward,
		isNavigating,
		// Expose original router methods for compatibility
		push: navigate,
		replace: (path: string) => navigate(path, { replace: true }),
	};
}

export default useNavigation;
