"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NavigationLink from "@/components/ui/NavigationLink";
import {
	BookOpen,
	TrendingUp,
	PiggyBank,
	CreditCard,
	Shield,
	Target,
	ArrowLeft,
	CheckCircle,
	Play,
	Brain,
	MessageCircle,
	Clock,
	Users,
	Lightbulb,
	Calendar,
	Award,
} from "lucide-react";
import ChatInterface from "@/components/chat/ChatInterface";
import { RippleButton } from "@/components/ui/RippleButton";
import { useProgress } from "@/contexts/ProgressContext";

// Module data with enhanced learning structure
const moduleData = {
	budgeting: {
		title: "Budgeting Basics",
		description: "Master the art of managing your money effectively",
		icon: BookOpen,
		color: "from-blue-400 to-blue-600",
		bgColor: "bg-blue-500",
		difficulty: "Beginner",
		estimatedTime: "45 mins",
		learningObjectives: [
			"Understand the 50/30/20 budgeting rule",
			"Learn to track and categorize expenses",
			"Discover the best budgeting apps and tools",
			"Build a sustainable emergency fund strategy",
		],
		modules: [
			{
				id: "intro",
				title: "Why Budgeting Matters",
				description: "Understanding the foundation of financial success",
				completed: true,
			},
			{
				id: "methods",
				title: "Budgeting Methods",
				description:
					"Explore different approaches: 50/30/20, zero-based, envelope method",
				completed: true,
			},
			{
				id: "tracking",
				title: "Expense Tracking",
				description: "Tools and techniques for monitoring your spending",
				completed: true,
			},
			{
				id: "emergency",
				title: "Emergency Fund Strategy",
				description: "Building your financial safety net",
				completed: false,
			},
		],
		starterQuestions: [
			"How do I create my first budget?",
			"What's the 50/30/20 rule and how do I use it?",
			"What are the best budgeting apps for beginners?",
			"How much should I save for emergencies?",
		],
		tips: [
			"Start simple - even tracking for one week provides valuable insights",
			"Use the envelope method for discretionary spending like entertainment",
			"Automate your savings to remove the temptation to spend",
		],
	},
	investing: {
		title: "Investing 101",
		description: "Build wealth through smart investment strategies",
		icon: TrendingUp,
		color: "from-green-400 to-green-600",
		bgColor: "bg-green-500",
		difficulty: "Intermediate",
		estimatedTime: "60 mins",
		learningObjectives: [
			"Understand the difference between stocks and bonds",
			"Learn about index funds and their benefits",
			"Master risk management principles",
			"Harness the power of compound interest",
		],
		modules: [
			{
				id: "basics",
				title: "Investment Fundamentals",
				description: "Stocks, bonds, and the basics of the market",
				completed: true,
			},
			{
				id: "funds",
				title: "Mutual Funds & ETFs",
				description: "Understanding pooled investments and index funds",
				completed: false,
			},
			{
				id: "risk",
				title: "Risk & Return",
				description: "Balancing potential gains with acceptable risk",
				completed: false,
			},
			{
				id: "compound",
				title: "Compound Interest Power",
				description: "How time makes your money grow exponentially",
				completed: false,
			},
		],
		starterQuestions: [
			"What's the difference between stocks and bonds?",
			"How do index funds work?",
			"What's my risk tolerance and how do I assess it?",
			"How does compound interest work in investing?",
		],
		tips: [
			"Time in the market beats timing the market",
			"Diversification is your friend - don't put all eggs in one basket",
			"Start with broad market index funds for simplicity",
		],
	},
	saving: {
		title: "Smart Saving",
		description: "Develop effective saving strategies and habits",
		icon: PiggyBank,
		color: "from-purple-400 to-purple-600",
		bgColor: "bg-purple-500",
		difficulty: "Beginner",
		estimatedTime: "40 mins",
		learningObjectives: [
			"Learn about high-yield savings accounts",
			"Master automatic saving techniques",
			"Set and achieve SMART financial goals",
			"Discover fun saving challenges and methods",
		],
		modules: [
			{
				id: "accounts",
				title: "Savings Account Types",
				description: "High-yield vs traditional accounts and when to use each",
				completed: true,
			},
			{
				id: "automation",
				title: "Automatic Saving",
				description: "Set it and forget it strategies",
				completed: true,
			},
			{
				id: "goals",
				title: "Goal-Based Saving",
				description: "SMART goals and milestone planning",
				completed: true,
			},
			{
				id: "challenges",
				title: "Saving Challenges",
				description: "Fun ways to boost your savings motivation",
				completed: true,
			},
		],
		starterQuestions: [
			"What's the difference between high-yield and regular savings?",
			"How do I set up automatic savings?",
			"What are SMART financial goals?",
			"What saving challenges can help me save more?",
		],
		tips: [
			"Pay yourself first - save before you spend",
			"Even $1 per day adds up to $365 per year",
			"Use savings challenges to make saving fun and social",
		],
	},
	debt: {
		title: "Debt Management",
		description: "Strategies to eliminate debt and improve credit",
		icon: CreditCard,
		color: "from-red-400 to-red-600",
		bgColor: "bg-red-500",
		difficulty: "Intermediate",
		estimatedTime: "50 mins",
		learningObjectives: [
			"Master the debt snowball vs avalanche methods",
			"Understand how credit scores work",
			"Learn debt consolidation strategies",
			"Develop prevention strategies for future debt",
		],
		modules: [
			{
				id: "strategy",
				title: "Debt Payoff Strategies",
				description: "Snowball vs Avalanche methods explained",
				completed: true,
			},
			{
				id: "credit",
				title: "Credit Score Mastery",
				description: "Understanding and improving your credit",
				completed: false,
			},
			{
				id: "consolidation",
				title: "Debt Consolidation",
				description: "When and how to combine debts effectively",
				completed: false,
			},
			{
				id: "prevention",
				title: "Debt Prevention",
				description: "Building habits to stay debt-free",
				completed: false,
			},
		],
		starterQuestions: [
			"Should I use debt snowball or avalanche method?",
			"How can I improve my credit score?",
			"Is debt consolidation right for me?",
			"How do I avoid falling back into debt?",
		],
		tips: [
			"List all debts with balances and interest rates first",
			"Pay minimums on all debts, extra on your target debt",
			"Building an emergency fund prevents new debt cycles",
		],
	},
	retirement: {
		title: "Retirement Planning",
		description: "Secure your financial future with smart planning",
		icon: Shield,
		color: "from-indigo-400 to-indigo-600",
		bgColor: "bg-indigo-500",
		difficulty: "Advanced",
		estimatedTime: "70 mins",
		learningObjectives: [
			"Understand 401(k) and IRA basics",
			"Learn about Roth vs Traditional accounts",
			"Master Social Security fundamentals",
			"Use retirement calculators effectively",
		],
		modules: [
			{
				id: "accounts",
				title: "Retirement Account Types",
				description: "401(k), IRA, Roth IRA - what's the difference?",
				completed: false,
			},
			{
				id: "employer",
				title: "Employer Benefits",
				description: "Maximizing 401(k) matching and benefits",
				completed: false,
			},
			{
				id: "social-security",
				title: "Social Security Planning",
				description: "Understanding benefits and timing strategies",
				completed: false,
			},
			{
				id: "calculator",
				title: "Retirement Calculators",
				description: "Planning tools and income replacement strategies",
				completed: false,
			},
		],
		starterQuestions: [
			"What's the difference between 401(k) and IRA?",
			"Should I choose Roth or Traditional retirement accounts?",
			"How does Social Security work?",
			"How much do I need to save for retirement?",
		],
		tips: [
			"Always capture the full employer 401(k) match - it's free money",
			"Start early - compound growth is incredibly powerful over time",
			"Consider Roth accounts if you're young and in a lower tax bracket",
		],
	},
	goals: {
		title: "Financial Goals",
		description: "Set and achieve your financial dreams",
		icon: Target,
		color: "from-orange-400 to-orange-600",
		bgColor: "bg-orange-500",
		difficulty: "Beginner",
		estimatedTime: "35 mins",
		learningObjectives: [
			"Create SMART financial goals",
			"Master milestone planning techniques",
			"Learn effective progress tracking methods",
			"Discover motivation and accountability strategies",
		],
		modules: [
			{
				id: "smart",
				title: "SMART Goals Framework",
				description:
					"Specific, Measurable, Achievable, Relevant, Time-bound goals",
				completed: true,
			},
			{
				id: "milestones",
				title: "Milestone Planning",
				description: "Breaking big goals into manageable steps",
				completed: true,
			},
			{
				id: "tracking",
				title: "Progress Tracking",
				description: "Systems to monitor and celebrate your progress",
				completed: true,
			},
			{
				id: "motivation",
				title: "Staying Motivated",
				description: "Accountability and motivation strategies that work",
				completed: false,
			},
		],
		starterQuestions: [
			"How do I set effective financial goals?",
			"What makes a goal 'SMART'?",
			"How do I break down big financial goals?",
			"How can I stay motivated to reach my goals?",
		],
		tips: [
			"Write down your goals and review them regularly",
			"Set both short-term wins and long-term targets",
			"Celebrate milestones to maintain momentum",
		],
	},
};

export default function LearningModulePage() {
	const params = useParams();
	const router = useRouter();
	const moduleId = params.module as string;
	const [activeTab, setActiveTab] = useState<"overview" | "learn" | "practice">(
		"overview"
	);
	const [completedModules, setCompletedModules] = useState<string[]>([]);

	const {
		getModuleProgress,
		isSectionCompleted,
		markSectionCompleted,
		markSectionIncomplete,
		recordModuleAccess,
	} = useProgress();

	const module = moduleData[moduleId as keyof typeof moduleData];

	useEffect(() => {
		if (!module) {
			router.push("/learn");
		} else {
			// Record that user accessed this module
			recordModuleAccess(moduleId);
		}
	}, [module, router, moduleId, recordModuleAccess]);

	if (!module) {
		return <div>Loading...</div>;
	}

	const Icon = module.icon;

	const getDifficultyColor = () => {
		switch (module.difficulty) {
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

	const difficultyStyle = getDifficultyColor();

	return (
		<main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950/40">
			{/* Background decorative elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl" />
			</div>

			<div className="relative max-w-7xl mx-auto">
				{/* Navigation */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8"
				>
					<NavigationLink
						href="/learn"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300 group shadow-lg"
					>
						<ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
						Back to Learning Modules
					</NavigationLink>
				</motion.div>

				{/* Module Header */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-12"
				>
					<div className="relative p-8 md:p-12 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
						{/* Background gradient */}
						<div
							className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5`}
						/>

						{/* Content */}
						<div className="relative z-10">
							<div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
								{/* Icon and basic info */}
								<div className="flex items-start gap-6">
									<motion.div
										whileHover={{ scale: 1.05, rotate: 5 }}
										className={`${module.bgColor} p-4 rounded-2xl text-white shadow-lg`}
									>
										<Icon className="w-10 h-10" />
									</motion.div>

									<div className="flex-1">
										<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
											{module.title}
										</h1>
										<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
											{module.description}
										</p>

										{/* Meta info */}
										<div className="flex flex-wrap gap-4">
											<span
												className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold border ${difficultyStyle.bg} ${difficultyStyle.text} ${difficultyStyle.border}`}
											>
												{module.difficulty}
											</span>
											<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
												<Clock className="w-4 h-4" />
												<span className="text-sm">{module.estimatedTime}</span>
											</div>
											<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
												<Users className="w-4 h-4" />
												<span className="text-sm">Self-paced</span>
											</div>
										</div>
									</div>
								</div>

								{/* Progress circle */}
								<div className="flex flex-col items-center gap-3">
									<div className="relative w-24 h-24">
										<svg
											className="w-24 h-24 transform -rotate-90"
											viewBox="0 0 36 36"
										>
											<path
												d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="text-gray-200 dark:text-gray-700"
												strokeDasharray="100, 100"
											/>
											<path
												d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
												fill="none"
												stroke="currentColor"
												strokeWidth="3"
												className={`${module.bgColor.replace("bg-", "text-")}`}
												strokeDasharray={`${getModuleProgress(moduleId)}, 100`}
												strokeLinecap="round"
											/>
										</svg>
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="text-lg font-bold text-gray-900 dark:text-white">
												{getModuleProgress(moduleId)}%
											</span>
										</div>
									</div>
									<span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
										Progress
									</span>
								</div>
							</div>

							{/* Tab Navigation */}
							<div className="flex gap-2 border-b border-gray-200/50 dark:border-gray-700/50">
								{[
									{ id: "overview", label: "Overview", icon: BookOpen },
									{ id: "learn", label: "Interactive Learning", icon: Brain },
									{ id: "practice", label: "Practice", icon: MessageCircle },
								].map((tab) => {
									const TabIcon = tab.icon;
									const isActive = activeTab === tab.id;

									// Get better contrast colors for active state
									const getActiveTabStyles = () => {
										const baseColor = module.bgColor.split("-")[1]; // e.g., "orange" from "bg-orange-500"

										switch (baseColor) {
											case "orange":
												return "border-orange-500 text-orange-500 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20";
											case "blue":
												return "border-blue-500 text-blue-500 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20";
											case "green":
												return "border-green-500 text-green-500 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20";
											case "purple":
												return "border-purple-500 text-purple-500 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20";
											case "red":
												return "border-red-500 text-red-500 dark:text-red-400 bg-red-50/50 dark:bg-red-900/20";
											case "indigo":
												return "border-indigo-500 text-indigo-500 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20";
											default:
												return "border-blue-500 text-blue-500 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20";
										}
									};

									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id as any)}
											className={`flex cursor-pointer items-center gap-2 px-4 py-3 font-medium transition-all duration-300 border-b-2 rounded-t-lg ${
												isActive
													? getActiveTabStyles()
													: "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
											}`}
										>
											<TabIcon className="w-4 h-4" />
											{tab.label}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</motion.div>

				{/* Tab Content */}
				<AnimatePresence mode="wait">
					{activeTab === "overview" && (
						<motion.div
							key="overview"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="space-y-8"
						>
							{/* Learning Objectives */}
							<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-lg">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
									<Lightbulb className="w-6 h-6 text-yellow-500" />
									Learning Objectives
								</h3>
								<div className="grid md:grid-cols-2 gap-4">
									{module.learningObjectives.map((objective, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/30 dark:border-blue-700/30"
										>
											<CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700 dark:text-gray-300">
												{objective}
											</span>
										</motion.div>
									))}
								</div>
							</div>

							{/* Module Progress */}
							<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-lg">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
									<Calendar className="w-6 h-6 text-indigo-500" />
									Learning Path
								</h3>
								<div className="space-y-4">
									{module.modules.map((subModule, index) => {
										const isCompleted = isSectionCompleted(
											moduleId,
											subModule.id
										);
										return (
											<motion.div
												key={subModule.id}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
													isCompleted
														? "bg-green-50/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50"
														: "bg-gray-50/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50"
												}`}
												onClick={() => {
													if (isCompleted) {
														markSectionIncomplete(moduleId, subModule.id);
													} else {
														markSectionCompleted(moduleId, subModule.id);
													}
												}}
											>
												<div
													className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
														isCompleted
															? "bg-green-500 text-white"
															: "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-indigo-400 hover:text-white"
													}`}
												>
													{isCompleted ? (
														<CheckCircle className="w-5 h-5" />
													) : (
														<span className="text-sm font-medium">
															{index + 1}
														</span>
													)}
												</div>
												<div className="flex-1">
													<h4 className="font-semibold text-gray-900 dark:text-white">
														{subModule.title}
													</h4>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														{subModule.description}
													</p>
												</div>
												<div className="flex items-center gap-2">
													{isCompleted && (
														<Award className="w-5 h-5 text-yellow-500" />
													)}
													<div className="text-xs text-gray-500 dark:text-gray-400">
														{isCompleted ? "Completed" : "Click to complete"}
													</div>
												</div>
											</motion.div>
										);
									})}
								</div>
							</div>

							{/* Quick Tips */}
							<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-lg">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
									💡 Pro Tips
								</h3>
								<div className="space-y-3">
									{module.tips.map((tip, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200/30 dark:border-yellow-700/30"
										>
											<Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700 dark:text-gray-300">
												{tip}
											</span>
										</motion.div>
									))}
								</div>
							</div>

							{/* CTA */}
							<div className="text-center">
								<RippleButton
									onClick={() => setActiveTab("learn")}
									className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 micro-button"
									rippleColor="rgba(255, 255, 255, 0.3)"
								>
									<span className="flex items-center gap-3">
										<Play className="w-5 h-5" />
										Start Interactive Learning
									</span>
								</RippleButton>
							</div>
						</motion.div>
					)}

					{activeTab === "learn" && (
						<motion.div
							key="learn"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							{/* Specialized Learning Interface */}
							<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden">
								{/* Learning Header */}
								<div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
									<div className="flex items-center gap-4">
										<div
											className={`${module.bgColor} p-3 rounded-xl text-white`}
										>
											<Brain className="w-6 h-6" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-900 dark:text-white">
												Interactive {module.title} Learning
											</h3>
											<p className="text-gray-600 dark:text-gray-400">
												Your specialized AI tutor is ready to help you master{" "}
												{moduleId}
											</p>
										</div>
									</div>
								</div>

								{/* Starter Questions */}
								<div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										Popular Questions to Get Started:
									</h4>
									<div className="grid md:grid-cols-2 gap-3">
										{module.starterQuestions.map((question, index) => (
											<button
												key={index}
												className="text-left p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all duration-300 group"
												onClick={() => {
													// This will be handled by the ChatInterface component
													const event = new CustomEvent("setQuestion", {
														detail: question,
													});
													window.dispatchEvent(event);
												}}
											>
												<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
													{question}
												</span>
											</button>
										))}
									</div>
								</div>

								{/* Chat Interface */}
								<div className="h-[600px]">
									<ChatInterface topic={moduleId} initialInput="" />
								</div>
							</div>
						</motion.div>
					)}

					{activeTab === "practice" && (
						<motion.div
							key="practice"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							{/* Practice Section */}
							<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-lg">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
									<MessageCircle className="w-6 h-6 text-green-500" />
									Practice & Apply Your Knowledge
								</h3>

								<div className="text-center py-12">
									<div className="mb-6">
										<div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
											<Play className="w-10 h-10" />
										</div>
									</div>
									<h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
										Coming Soon: Interactive Exercises
									</h4>
									<p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
										We're building interactive exercises, quizzes, and
										real-world scenarios to help you practice{" "}
										{module.title.toLowerCase()} skills. For now, use the
										Interactive Learning tab to ask specific questions and get
										personalized guidance.
									</p>
									<RippleButton
										onClick={() => setActiveTab("learn")}
										className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 micro-button"
										rippleColor="rgba(255, 255, 255, 0.3)"
									>
										Continue Learning
									</RippleButton>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</main>
	);
}
