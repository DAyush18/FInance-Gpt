"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Target,
	ArrowRight,
	Sparkles,
	CheckCircle,
	Star,
	Zap,
	Brain,
	BarChart3,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";
import NavigationLink from "@/components/ui/NavigationLink";
import NoSSR from "@/components/ui/NoSSR";

export default function HomePage() {
	const [isLoading, setIsLoading] = useState(true);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		// Simulate loading delay
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	const cardVariants = {
		hidden: { opacity: 0, scale: 0.8, y: 40 },
		show: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
				duration: 0.6,
			},
		},
		hover: {
			y: -10,
			scale: 1.02,
			transition: {
				type: "spring" as const,
				stiffness: 300,
				damping: 20,
			},
		},
	};

	const cardContentVariants = {
		hover: {
			y: -5,
			transition: {
				type: "spring" as const,
				stiffness: 300,
			},
		},
	};

	const iconVariants = {
		initial: { rotate: 0 },
		hover: {
			rotate: [0, 10],
			transition: {
				duration: 0.5,
			},
		},
	};

	const features = [
		{
			icon: Brain,
			title: "AI-Powered Guidance",
			description:
				"Get personalized financial advice powered by advanced AI that understands your unique situation and goals.",
			color: "#4F46E5",
			bgGradient: "from-blue-50/90 via-indigo-50/80 to-blue-100/90",
			hoverGradient: "from-blue-100/95 via-indigo-100/85 to-blue-200/95",
			borderGradient: "from-blue-200/70 via-indigo-200/50 to-blue-300/70",
			iconBg: "from-blue-500/15 to-indigo-500/10",
			iconGradient: "from-blue-500 to-indigo-600",
			shadowColor: "rgba(79, 70, 229, 0.2)",
			hoverShadowColor: "rgba(79, 70, 229, 0.35)",
			accentColor: "#4F46E5",
		},
		{
			icon: BarChart3,
			title: "Interactive Visualizations",
			description:
				"Transform complex financial concepts into beautiful, easy-to-understand charts and interactive tools.",
			color: "#7C3AED",
			bgGradient: "from-purple-50/90 via-violet-50/80 to-purple-100/90",
			hoverGradient: "from-purple-100/95 via-violet-100/85 to-purple-200/95",
			borderGradient: "from-purple-200/70 via-violet-200/50 to-purple-300/70",
			iconBg: "from-purple-500/15 to-violet-500/10",
			iconGradient: "from-purple-500 to-violet-600",
			shadowColor: "rgba(124, 58, 237, 0.2)",
			hoverShadowColor: "rgba(124, 58, 237, 0.35)",
			accentColor: "#7C3AED",
		},
		{
			icon: Target,
			title: "Personalized Learning",
			description:
				"Adaptive learning paths that evolve with your progress and adjust to your financial knowledge level.",
			color: "#10B981",
			bgGradient: "from-emerald-50/90 via-teal-50/80 to-emerald-100/90",
			hoverGradient: "from-emerald-100/95 via-teal-100/85 to-emerald-200/95",
			borderGradient: "from-emerald-200/70 via-teal-200/50 to-emerald-300/70",
			iconBg: "from-emerald-500/15 to-teal-500/10",
			iconGradient: "from-emerald-500 to-teal-600",
			shadowColor: "rgba(16, 185, 129, 0.2)",
			hoverShadowColor: "rgba(16, 185, 129, 0.35)",
			accentColor: "#10B981",
		},
	];

	const trustSignals = [
		{ icon: CheckCircle, text: "100% Free to Start" },
		{ icon: Brain, text: "AI-Powered Learning" },
		{ icon: BarChart3, text: "Interactive Tools" },
	];

	const benefits = [
		"Master budgeting and saving strategies",
		"Understand investment fundamentals",
		"Plan for retirement confidently",
		"Make informed financial decisions",
	];

	// Loading Screen with improved branding
	const LoadingScreen = () => (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-gray-900 dark:to-indigo-950"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8, ease: "easeInOut" }}
		>
			<div className="text-center">
				<motion.div
					className="relative mb-8"
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					{/* Premium loading spinner */}
					<div className="relative w-20 h-20 mx-auto">
						<div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900"></div>
						<motion.div
							className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600"
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
						></motion.div>
						<motion.div
							className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, duration: 0.4 }}
						>
							<Sparkles className="w-6 h-6 text-white" />
						</motion.div>
					</div>
				</motion.div>

				<motion.h2
					className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					FinanceGPT
				</motion.h2>
				<motion.p
					className="text-gray-600 dark:text-gray-400 text-lg font-medium"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.6 }}
				>
					Preparing your personalized financial experience...
				</motion.p>
			</div>
		</motion.div>
	);

	return (
		<>
			<NoSSR>
				<AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
			</NoSSR>

			<div
				className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-gray-900 dark:to-indigo-950/30 relative overflow-hidden"
				suppressHydrationWarning
			>
				{/* Enhanced background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
						animate={{
							x: [0, 50, 0],
							y: [0, -30, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-20 -right-32 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
						animate={{
							x: [0, -50, 0],
							y: [0, 30, 0],
							scale: [1, 1.15, 1],
						}}
						transition={{
							duration: 25,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl"
						animate={{
							rotate: 360,
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 30,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
				</div>

				<main className="relative container mx-auto px-4 py-12 max-w-7xl">
					<motion.div
						className="space-y-16"
						variants={container}
						initial="hidden"
						animate={!isLoading && isMounted ? "show" : "hidden"}
					>
						{/* Enhanced Hero Section */}
						<motion.section className="text-center space-y-8" variants={item}>
							{/* Trust badge */}
							<motion.div
								className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-lg"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
							>
								<Star className="w-4 h-4 text-amber-500 fill-current" />
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									First AI Finance Tutor That Actually Explains Complex Concepts
									Simply
								</span>
								<Star className="w-4 h-4 text-amber-500 fill-current" />
							</motion.div>

							{/* Main headline */}
							<motion.div
								className="space-y-6"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
									<span className="block text-gray-900 dark:text-white mb-2">
										Master Your
									</span>
									<span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
										Financial Future
									</span>
								</h1>

								<motion.p
									className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.8, delay: 0.4 }}
								>
									Transform your relationship with money through AI-powered
									guidance, interactive learning, and personalized strategies
									that adapt to your unique goals.
								</motion.p>
							</motion.div>

							{/* CTA Section */}
							<motion.div
								className="flex flex-col sm:flex-row gap-4 justify-center items-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
							>
								<NavigationLink href="/chat">
									<RippleButton
										className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 text-lg"
										rippleColor="rgba(255, 255, 255, 0.3)"
									>
										<span className="flex items-center gap-3">
											Start Learning Free
											<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
										</span>
									</RippleButton>
								</NavigationLink>

								<NavigationLink href="/visualizations">
									<button className="cursor-pointer group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-semibold rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-lg shadow-lg">
										<span className="flex items-center gap-3">
											Explore Tools
											<BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
										</span>
									</button>
								</NavigationLink>
							</motion.div>

							{/* Trust indicators */}
							<motion.div
								className="flex flex-wrap justify-center items-center gap-8 pt-8"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.8 }}
							>
								{trustSignals.map((signal, index) => {
									const Icon = signal.icon;
									return (
										<div
											key={signal.text}
											className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
										>
											<Icon className="w-5 h-5 text-emerald-600" />
											<span className="text-sm font-medium">{signal.text}</span>
										</div>
									);
								})}
							</motion.div>
						</motion.section>

						{/* Enhanced Feature Cards */}
						<motion.section className="space-y-12" variants={item}>
							<div className="text-center space-y-4">
								<motion.h2
									className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
									variants={item}
								>
									Why Choose FinanceGPT?
								</motion.h2>
								<motion.p
									className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
									variants={item}
								>
									Experience the future of financial education with cutting-edge
									AI technology
								</motion.p>
							</div>

							<motion.div
								className="grid md:grid-cols-3 gap-8"
								variants={container}
							>
								{features.map((feature, index) => {
									const Icon = feature.icon;
									return (
										<motion.div
											key={feature.title}
											className="group relative overflow-hidden"
											variants={cardVariants}
											whileHover="hover"
											custom={index}
											initial="hidden"
											animate="show"
											style={{
												borderRadius: "32px",
												background: `linear-gradient(135deg, ${feature.bgGradient})`,
												backdropFilter: "blur(20px)",
												WebkitBackdropFilter: "blur(20px)",
												border: `1px solid transparent`,
												backgroundImage: `linear-gradient(135deg, ${feature.bgGradient}), linear-gradient(135deg, ${feature.borderGradient})`,
												backgroundOrigin: "border-box",
												backgroundClip: "content-box, border-box",
												boxShadow: `0 10px 40px ${feature.shadowColor}, 0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
											}}
											whileInView={{
												boxShadow: `0 20px 60px ${feature.hoverShadowColor}, 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
											}}
										>
											{/* Enhanced hover effects */}
											<motion.div
												className="absolute inset-0 opacity-0 group-hover:opacity-100"
												style={{
													borderRadius: "32px",
													background: `linear-gradient(135deg, ${feature.hoverGradient})`,
													filter: "blur(1px)",
												}}
												initial={{ opacity: 0 }}
												whileHover={{ opacity: 1 }}
												transition={{ duration: 0.4, ease: "easeOut" }}
											/>

											<motion.div
												className="absolute inset-0 opacity-0 group-hover:opacity-60"
												style={{
													borderRadius: "32px",
													background: `linear-gradient(135deg, ${feature.accentColor}20, transparent, ${feature.accentColor}20)`,
													filter: "blur(12px)",
												}}
												initial={{ opacity: 0, scale: 0.8 }}
												whileHover={{ opacity: 0.6, scale: 1 }}
												transition={{ duration: 0.5, ease: "easeOut" }}
											/>

											{/* Content */}
											<motion.div
												className="relative z-10 p-10"
												variants={cardContentVariants}
											>
												{/* Icon */}
												<motion.div
													className="mb-8 relative"
													variants={iconVariants}
													initial="initial"
													whileHover="hover"
												>
													<motion.div
														className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
														style={{
															background: `linear-gradient(145deg, ${feature.iconBg})`,
															boxShadow: `inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.05), 0 4px 16px ${feature.shadowColor}`,
															border: `1px solid ${feature.accentColor}20`,
														}}
														whileHover={{
															scale: 1.1,
															rotate: 8,
															boxShadow: `inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 8px 32px ${feature.hoverShadowColor}`,
														}}
														transition={{
															type: "spring",
															stiffness: 300,
															damping: 20,
														}}
													>
														<motion.div
															className="absolute inset-3 rounded-2xl opacity-20"
															style={{
																background: `linear-gradient(135deg, ${feature.iconGradient})`,
															}}
															whileHover={{ opacity: 0.3 }}
															transition={{ duration: 0.3 }}
														/>
														<Icon
															className="w-12 h-12 relative z-10"
															style={{ color: feature.color }}
														/>
													</motion.div>

													<motion.div
														className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
														style={{ backgroundColor: feature.accentColor }}
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															delay: index * 0.2 + 0.5,
															type: "spring",
														}}
														whileHover={{ scale: 1.3 }}
													/>
												</motion.div>

												{/* Content */}
												<motion.div className="space-y-6">
													<motion.h3
														className="text-2xl font-bold tracking-tight"
														style={{ color: feature.color }}
														initial={{ opacity: 0.9 }}
														whileHover={{ opacity: 1 }}
														transition={{ duration: 0.2 }}
													>
														{feature.title}
													</motion.h3>

													<motion.div
														className="h-1 w-12 rounded-full"
														style={{ backgroundColor: feature.accentColor }}
														initial={{ width: 0 }}
														animate={{ width: "3rem" }}
														transition={{
															delay: index * 0.1 + 0.6,
															duration: 0.6,
														}}
														whileHover={{ width: "4rem" }}
													/>

													<motion.p
														className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
														initial={{ opacity: 0.8 }}
														whileHover={{ opacity: 1 }}
														transition={{ duration: 0.2 }}
													>
														{feature.description}
													</motion.p>
												</motion.div>
											</motion.div>

											{/* Ambient lighting */}
											<motion.div
												className="absolute bottom-0 left-1/2 w-3/4 h-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-30"
												style={{
													background: `radial-gradient(ellipse, ${feature.accentColor}40, transparent)`,
													filter: "blur(24px)",
												}}
												initial={{ opacity: 0, scale: 0.8 }}
												whileHover={{ opacity: 0.3, scale: 1 }}
												transition={{ duration: 0.6, ease: "easeOut" }}
											/>
										</motion.div>
									);
								})}
							</motion.div>
						</motion.section>

						{/* Benefits Section */}
						<motion.section className="space-y-12" variants={item}>
							<div className="text-center space-y-6">
								<motion.h2
									className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
									variants={item}
								>
									What You'll Learn
								</motion.h2>
								<motion.p
									className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
									variants={item}
								>
									Build essential financial skills that will serve you for life
								</motion.p>
							</div>

							<motion.div
								className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
								variants={container}
							>
								{benefits.map((benefit, index) => (
									<motion.div
										key={benefit}
										className="flex items-center gap-4 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg"
										variants={item}
										whileHover={{
											scale: 1.02,
											boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
										}}
									>
										<CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
										<span className="text-lg font-medium text-gray-700 dark:text-gray-300">
											{benefit}
										</span>
									</motion.div>
								))}
							</motion.div>
						</motion.section>

						{/* Final CTA */}
						<motion.section className="text-center space-y-8" variants={item}>
							<motion.div
								className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-700/50"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 1.2 }}
							>
								<Sparkles className="w-5 h-5 text-indigo-600" />
								<span className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
									Ready to transform your financial future?
								</span>
								<Sparkles className="w-5 h-5 text-purple-600" />
							</motion.div>

							<motion.div
								className="flex flex-col sm:flex-row gap-6 justify-center items-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 1.4 }}
							>
								<NavigationLink href="/chat">
									<RippleButton
										className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-500/30 hover:shadow-3xl hover:shadow-indigo-500/50 transition-all duration-300 text-xl"
										rippleColor="rgba(255, 255, 255, 0.3)"
									>
										<span className="flex items-center gap-3">
											<Zap className="w-6 h-6" />
											Get Started Now
											<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
										</span>
									</RippleButton>
								</NavigationLink>

								<NavigationLink href="/learn">
									<button className="cursor-pointer group px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-bold rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-xl shadow-xl">
										<span className="flex items-center gap-3">
											Browse Learning Paths
											<ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
										</span>
									</button>
								</NavigationLink>
							</motion.div>

							<motion.div
								className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.6, duration: 0.6 }}
							>
								<p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
									<span className="text-emerald-600 font-semibold">
										100% Free
									</span>{" "}
									• <span className="mx-2">No Credit Card Required</span>•
									&nbsp;
									<span className="text-indigo-600 font-semibold">
										Start Learning Instantly
									</span>
								</p>
							</motion.div>
						</motion.section>
					</motion.div>
				</main>
			</div>
		</>
	);
}
