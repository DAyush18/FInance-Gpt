"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function RouteProgress() {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const pathname = usePathname();
	const isInitialRender = useRef(true);

	useEffect(() => {
		// Skip loading for initial render
		if (isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}

		// Reset and start loading
		setIsLoading(true);
		setProgress(0);

		// Phase 1: Simulate realistic loading progression (0 to 85%)
		let currentProgress = 0;
		const phase1Duration = 700; // Time to reach 85%
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 85) {
					return 85; // Stay at 85% until phase 2
				}
				// Faster initial progress, slower as it approaches completion
				const increment = Math.max(2, 20 - prev / 5);
				// Use a pseudo-random increment based on current progress for consistency
				const randomVariation = (prev * 0.1) % 3;
				const newProgress = Math.min(prev + increment + randomVariation, 85);
				currentProgress = newProgress;
				return newProgress;
			});
		}, 60);

		// Phase 2: Complete the loading (85% to 100%)
		const phase1Timer = setTimeout(() => {
			clearInterval(progressInterval);

			// Smoothly animate from 85% to 100%
			setProgress(100);

			// Phase 3: Hide the progress bar
			setTimeout(() => {
				setIsLoading(false);
				setProgress(0);
			}, 150);
		}, phase1Duration);

		return () => {
			clearInterval(progressInterval);
			clearTimeout(phase1Timer);
		};
	}, [pathname]);

	return (
		<AnimatePresence>
			{isLoading && (
				<motion.div
					initial={{ opacity: 0, scaleX: 0 }}
					animate={{ opacity: 1, scaleX: 1 }}
					exit={{ opacity: 0, scaleX: 0 }}
					transition={{ duration: 0.15 }}
					className="fixed top-0 left-0 right-0 z-[100] h-1"
					style={{ transformOrigin: "left" }}
				>
					{/* Main progress bar */}
					<motion.div
						className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 relative overflow-hidden"
						style={{ width: `${progress}%` }}
						transition={{
							width: {
								type: "spring",
								stiffness: progress >= 100 ? 300 : 200,
								damping: progress >= 100 ? 30 : 25,
								mass: 0.5,
							},
						}}
					>
						{/* Animated shimmer effect */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
							animate={{
								x: ["-200%", "200%"],
							}}
							transition={{
								duration: 1.2,
								repeat: Infinity,
								ease: "easeInOut",
								repeatDelay: 0.3,
							}}
							style={{ width: "200%" }}
						/>

						{/* Inner glow */}
						<div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 opacity-60" />
					</motion.div>

					{/* Outer glow effect */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 blur-sm opacity-40"
						animate={{ opacity: [0.4, 0.7, 0.4] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
