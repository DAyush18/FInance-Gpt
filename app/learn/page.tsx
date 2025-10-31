"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import NavigationLink from "@/components/ui/NavigationLink";
import {
	BookOpen,
	TrendingUp,
	PiggyBank,
	CreditCard,
	Shield,
	Target,
	ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/RippleButton";
import { useProgress } from "@/contexts/ProgressContext";


const learningModules = [
	{
		id: "budgeting",
		title: "Budgeting Basics",
		description:
			"Learn how to create and stick to a budget that works for your lifestyle",
		icon: BookOpen,
		color: "from-blue-400 to-blue-600",
		bgColor: "bg-blue-500",
		topics: [
			"50/30/20 Rule",
			"Tracking Expenses",
			"Budget Apps",
			"Emergency Funds",
		],
		difficulty: "Beginner",
	},
	{
		id: "investing",
		title: "Investing 101",
		description:
			"Understand the fundamentals of investing and growing your wealth",
		icon: TrendingUp,
		color: "from-green-400 to-green-600",
		bgColor: "bg-green-500",
		topics: [
			"Stocks vs Bonds",
			"Index Funds",
			"Risk Management",
			"Compound Interest",
		],
		difficulty: "Intermediate",
	},
	{
		id: "saving",
		title: "Smart Saving",
		description:
			"Discover strategies to save money effectively and reach your goals",
		icon: PiggyBank,
		color: "from-purple-400 to-purple-600",
		bgColor: "bg-purple-500",
		topics: [
			"High-Yield Savings",
			"Automatic Saving",
			"Goal Setting",
			"Saving Challenges",
		],
		difficulty: "Beginner",
	},
	{
		id: "debt",
		title: "Debt Management",
		description: "Learn how to manage and eliminate debt strategically",
		icon: CreditCard,
		color: "from-red-400 to-red-600",
		bgColor: "bg-red-500",
		topics: [
			"Debt Snowball",
			"Debt Avalanche",
			"Credit Scores",
			"Consolidation",
		],
		difficulty: "Intermediate",
	},
	{
		id: "retirement",
		title: "Retirement Planning",
		description: "Plan for a secure and comfortable retirement for your future",
		icon: Shield,
		color: "from-indigo-400 to-indigo-600",
		bgColor: "bg-indigo-500",
		topics: [
			"401(k) Basics",
			"IRA Options",
			"Social Security",
			"Retirement Calculator",
		],
		difficulty: "Advanced",
	},
	{
		id: "goals",
		title: "Financial Goals",
		description:
			"Set and achieve your short-term and long-term financial goals",
		icon: Target,
		color: "from-orange-400 to-orange-600",
		bgColor: "bg-orange-500",
		topics: [
			"SMART Goals",
			"Milestone Planning",
			"Progress Tracking",
			"Motivation Tips",
		],
		difficulty: "Beginner",
	},
];

// Component that uses the progress context
function LearnContent() {
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
	const { getModuleProgress } = useProgress();

	const filteredModules =
		selectedDifficulty === "All"
			? learningModules
			: learningModules.filter(
					(module) => module.difficulty === selectedDifficulty
			  );

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.95 },
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
				duration: 0.6,
			},
		},
		hover: {
			y: -8,
			scale: 1.02,
			transition: {
				type: "spring" as const,
				stiffness: 300,
				damping: 20,
			},
		},
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Beginner":
				return {
					bg: "bg-emerald-50 dark:bg-emerald-900/20",
					text: "text-emerald-700 dark:text-emerald-300",
					border: "border-emerald-200 dark:border-emerald-700/50",
				};
			case "Intermediate":
				return {
					bg: "bg-amber-50 dark:bg-amber-900/20",
					text: "text-amber-700 dark:text-amber-300",
					border: "border-amber-200 dark:border-amber-700/50",
				};
			case "Advanced":
				return {
					bg: "bg-rose-50 dark:bg-rose-900/20",
					text: "text-rose-700 dark:text-rose-300",
					border: "border-rose-200 dark:border-rose-700/50",
				};
			default:
				return {
					bg: "bg-gray-50 dark:bg-gray-900/20",
					text: "text-gray-700 dark:text-gray-300",
					border: "border-gray-200 dark:border-gray-700/50",
				};
		}
	};

	return (
		<main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/40">
			{/* Background decorative elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl" />
			</div>

			<div className="relative max-w-7xl mx-auto">
				{/* Back to Home Button */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-12"
				>
					<NavigationLink
						href="/"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300 mb-8 group shadow-lg"
					>
						<ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
						Back to Home
					</NavigationLink>
				</motion.div>

				{/* Enhanced Header */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="text-center mb-16"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-lg"
					>
						<BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
						<span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
							Financial Education Hub
						</span>
					</motion.div>

					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
						<span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
							Learning Modules
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
						Master personal finance with our comprehensive, interactive learning
						experience designed for every skill level
					</p>

					{/* Enhanced Difficulty Filter */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="flex flex-wrap gap-3 justify-center"
					>
						{["All", "Beginner", "Intermediate", "Advanced"].map(
							(level, index) => (
								<motion.div
									key={level}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.5 + index * 0.1 }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<RippleButton
										onClick={(e) => {
											setSelectedDifficulty(level);
										}}
										className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
											selectedDifficulty === level
												? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
												: "bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-700/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
										}`}
										rippleColor={
											selectedDifficulty === level
												? "rgba(255, 255, 255, 0.3)"
												: "rgba(79, 70, 229, 0.2)"
										}
									>
										{level}
									</RippleButton>
								</motion.div>
							)
						)}
					</motion.div>
				</motion.div>

				{/* Enhanced Learning Modules Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="show"
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
				>
					{filteredModules.map((module, index) => {
						const Icon = module.icon;
						const difficultyStyle = getDifficultyColor(module.difficulty);

						return (
							<motion.div
								key={module.id}
								variants={cardVariants}
								whileHover="hover"
								className="group cursor-pointer relative"
							>
								{/* Card Background with Enhanced Glassmorphism */}
								<div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-200/30 dark:group-hover:shadow-indigo-900/30 overflow-hidden">
									{/* Animated gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									{/* Floating accent line */}
									<div
										className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${module.color} rounded-t-3xl`}
									/>

									{/* Header Section */}
									<div className="flex items-start gap-6 mb-6">
										{/* Enhanced Icon with 3D effect */}
										<motion.div
											whileHover={{
												rotate: [0, 10],
												scale: 1.1,
											}}
											transition={{ duration: 0.6, type: "spring" }}
											className="relative"
										>
											<div
												className={`relative ${module.bgColor} p-4 rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
											>
												{/* Glow effect */}
												<div
													className={`absolute inset-0 ${module.bgColor} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
												/>
												<Icon className="w-8 h-8 relative z-10" />
											</div>
											{/* Floating indicator */}
											<motion.div
												className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white dark:border-gray-800"
												animate={{ scale: [1, 1.2] }}
												transition={{
													duration: 2,
													repeat: Infinity,
													repeatType: "reverse",
													type: "tween",
													ease: "easeInOut",
												}}
											/>
										</motion.div>

										{/* Title and Difficulty */}
										<div className="flex-1 min-w-0">
											<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
												{module.title}
											</h3>
											<span
												className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold border ${difficultyStyle.bg} ${difficultyStyle.text} ${difficultyStyle.border} transition-all duration-300 group-hover:scale-105`}
											>
												{module.difficulty}
											</span>
										</div>
									</div>

									{/* Description */}
									<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
										{module.description}
									</p>

									{/* Enhanced Progress Section */}
									<div className="mb-6">
										<div className="flex justify-between items-center mb-3">
											<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												Learning Progress
											</span>
											<div className="flex items-center gap-2">
												<span className="text-lg font-bold text-gray-900 dark:text-white">
													{getModuleProgress(module.id)}%
												</span>
												<div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
											</div>
										</div>

										{/* Enhanced Progress Bar */}
										<div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
											<motion.div
												initial={{ width: 0, x: "-100%" }}
												animate={{
													width: `${getModuleProgress(module.id)}%`,
													x: 0,
												}}
												transition={{
													duration: 1.2,
													delay: index * 0.1 + 0.3,
													type: "spring",
													stiffness: 100,
												}}
												className={`h-full rounded-full bg-gradient-to-r ${module.color} shadow-lg relative overflow-hidden`}
											>
												{/* Shimmer effect */}
												<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
											</motion.div>
										</div>
									</div>

									{/* Enhanced Topics Section */}
									<div className="mb-8">
										<p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
											What you'll learn:
										</p>
										<div className="grid grid-cols-2 gap-2">
											{module.topics.map((topic, topicIndex) => (
												<motion.div
													key={topic}
													initial={{ opacity: 0, x: -10 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														delay: index * 0.1 + topicIndex * 0.05 + 0.5,
													}}
													whileHover={{ scale: 1.02, x: 4 }}
													className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-gray-50/80 to-white/60 dark:from-gray-700/50 dark:to-gray-600/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30 group/topic hover:shadow-md transition-all duration-300"
												>
													<div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full group-hover/topic:scale-125 transition-transform duration-300" />
													<span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
														{topic}
													</span>
												</motion.div>
											))}
										</div>
									</div>

									{/* Enhanced CTA */}
									<NavigationLink
										href={`/learn/${module.id}`}
										className="group/cta relative inline-flex items-center justify-center w-full"
									>
										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="relative w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 overflow-hidden"
										>
											{/* Button shimmer effect */}
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[200%] transition-transform duration-700" />

											<span className="relative flex items-center justify-center gap-2">
												Start Learning
												<motion.span
													animate={{ x: [0, 4] }}
													transition={{
														duration: 1.5,
														repeat: Infinity,
														repeatType: "reverse",
														type: "tween",
														ease: "easeInOut",
													}}
													className="text-lg"
												>
													→
												</motion.span>
											</span>
										</motion.div>
									</NavigationLink>
								</div>

								{/* Floating elements for depth */}
								<div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
								<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300" />
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</main>
	);
}

// Loading component for Suspense fallback
function LearnLoading() {
	return (
		<main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/40">
			<div className="relative max-w-7xl mx-auto">
				<div className="flex items-center justify-center h-96">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
						<span className="text-lg text-gray-600 dark:text-gray-300">
							Loading modules...
						</span>
					</div>
				</div>
			</div>
		</main>
	);
}

// Main export component with dynamic import to disable SSR
const LearnPage = dynamic(
	() =>
		Promise.resolve(() => (
			<Suspense fallback={<LearnLoading />}>
				<LearnContent />
			</Suspense>
		)),
	{ ssr: false, loading: () => <LearnLoading /> }
);

export default LearnPage;
