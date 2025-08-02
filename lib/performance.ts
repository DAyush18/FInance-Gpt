"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Web Vitals tracking
export function reportWebVitals(metric: any): void {
	if (process.env.NODE_ENV === "production") {
		// Send to analytics service
		console.log(metric);
		
		// Example: Send to Google Analytics
		if (typeof window !== "undefined" && (window as any).gtag) {
			(window as any).gtag("event", metric.name, {
				event_category: "Web Vitals",
				event_label: metric.id,
				value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
				non_interaction: true,
			});
		}
	}
}

// Performance monitoring hook
export function usePerformanceMonitoring(): void {
	const router = useRouter();

	useEffect(() => {
		// Monitor route changes
		const handleRouteStart = (): void => {
			console.time("Route Change");
		};

		const handleRouteComplete = (): void => {
			console.timeEnd("Route Change");
		};

		// Track component render times in development
		if (process.env.NODE_ENV === "development") {
			const observer = new PerformanceObserver((list) => {
				list.getEntries().forEach((entry) => {
					if (entry.entryType === "measure") {
						console.log(`${entry.name}: ${entry.duration}ms`);
					}
				});
			});

			observer.observe({ entryTypes: ["measure"] });

			return () => observer.disconnect();
		}
	}, [router]);
}

// Memory usage monitoring
export function monitorMemoryUsage(): void {
	if (process.env.NODE_ENV === "development" && "memory" in performance) {
		const memInfo = (performance as any).memory;
		console.log({
			used: `${Math.round(memInfo.usedJSHeapSize / 1024 / 1024)} MB`,
			total: `${Math.round(memInfo.totalJSHeapSize / 1024 / 1024)} MB`,
			limit: `${Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024)} MB`,
		});
	}
}
