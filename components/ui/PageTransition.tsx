"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
	className?: string;
}

export function PageTransition({
	children,
	className = "",
}: PageTransitionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{
				duration: 0.3,
				ease: "easeInOut",
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Loading skeleton for content areas
export function ContentSkeleton() {
	return (
		<div className="animate-pulse space-y-4">
			<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
			<div className="space-y-2">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
				<div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
				<div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
			</div>
		</div>
	);
}

export default PageTransition;
