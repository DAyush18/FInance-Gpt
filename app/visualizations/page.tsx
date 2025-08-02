"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import NavigationLink from "@/components/ui/NavigationLink";
import {
	ArrowLeft,
	TrendingUp,
	PieChart,
	Calculator,
	BarChart3,
	Sparkles,
	Wallet,
	CreditCard,
	Target,
} from "lucide-react";
import { motion } from "framer-motion";

// Dynamic imports for better bundle splitting
const CompoundInterestChart = dynamic(
	() => import("@/components/visualizations/CompoundInterestChart"),
	{
		loading: () => (
			<div className="space-y-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg w-3/4 mb-6"></div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="h-32 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"
							></div>
						))}
					</div>
					<div className="h-96 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"></div>
				</div>
			</div>
		),
		ssr: false,
	}
);

const LoanCalculator = dynamic(
	() => import("@/components/visualizations/LoanCalculator"),
	{
		loading: () => (
			<div className="space-y-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg w-2/3 mb-6"></div>
					<div className="h-96 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"></div>
				</div>
			</div>
		),
		ssr: false,
	}
);

const InteractiveBudgetDashboard = dynamic(
	() => import("@/components/visualizations/InteractiveBudgetDashboard"),
	{
		loading: () => (
			<div className="space-y-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg w-2/3 mb-6"></div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="h-80 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"></div>
						<div className="h-80 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"></div>
					</div>
				</div>
			</div>
		),
		ssr: false,
	}
);

const RetirementCalculator = dynamic(
	() => import("@/components/visualizations/RetirementCalculator"),
	{
		loading: () => (
			<div className="space-y-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg w-2/3 mb-6"></div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="h-24 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"
							></div>
						))}
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="h-80 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"></div>
						<div className="h-80 bg-gray-200/30 dark:bg-gray-700/30 rounded-2xl"></div>
					</div>
				</div>
			</div>
		),
		ssr: false,
	}
);

export default function VisualizationsPage() {
	const [activeChart, setActiveChart] = useState("compound-interest");
	const [principal, setPrincipal] = useState(1000);
	const [rate, setRate] = useState(7);
	const [years, setYears] = useState(10);
	const [monthlyContribution, setMonthlyContribution] = useState(100);

	// Handle chart switching without loading state
	const handleChartSwitch = (chartId: string) => {
		if (activeChart === chartId) return;
		setActiveChart(chartId);
	};

	const chartOptions = [
		{
			id: "compound-interest",
			title: "Compound Interest",
			description: "Watch your investments grow exponentially over time",
			icon: TrendingUp,
			color: "#4F46E5",
			primaryColor: "#4F46E5",
			secondaryColor: "#6366F1",
			bgGradient:
				"from-indigo-50/80 to-blue-50/60 dark:from-indigo-900/20 dark:to-blue-900/10",
			borderColor: "border-indigo-200/50 dark:border-indigo-700/30",
			category: "Investment",
		},
		{
			id: "budget",
			title: "Dynamic Budget Analytics",
			description:
				"Interactive budget tracking with live insights and recommendations",
			icon: Wallet,
			color: "#7C3AED",
			primaryColor: "#7C3AED",
			secondaryColor: "#8B5CF6",
			bgGradient:
				"from-violet-50/80 to-purple-50/60 dark:from-violet-900/20 dark:to-purple-900/10",
			borderColor: "border-violet-200/50 dark:border-violet-700/30",
			category: "Budgeting",
		},
		{
			id: "loan",
			title: "Loan Calculator",
			description: "Plan your loan payments and compare different options",
			icon: CreditCard,
			color: "#10B981",
			primaryColor: "#10B981",
			secondaryColor: "#14B8A6",
			bgGradient:
				"from-emerald-50/80 to-teal-50/60 dark:from-emerald-900/20 dark:to-teal-900/10",
			borderColor: "border-emerald-200/50 dark:border-emerald-700/30",
			category: "Lending",
		},
		{
			id: "retirement",
			title: "Retirement Planning",
			description: "Secure your financial future with smart planning tools",
			icon: Target,
			color: "#F59E0B",
			primaryColor: "#F59E0B",
			secondaryColor: "#F97316",
			bgGradient:
				"from-amber-50/80 to-orange-50/60 dark:from-amber-900/20 dark:to-orange-900/10",
			borderColor: "border-amber-200/50 dark:border-amber-700/30",
			category: "Planning",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
			<div className="container mx-auto px-4 py-8">
				{/* Navigation */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-8"
				>
					<NavigationLink
						href="/"
						className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-4 py-2 rounded-lg inline-flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Dashboard
					</NavigationLink>
				</motion.div>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="text-center mb-12"
				>
					<div className="flex items-center justify-center gap-3 mb-4">
						<div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
							<BarChart3 className="w-8 h-8" />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
							Financial Visualizations
						</h1>
					</div>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Interactive tools to visualize your financial journey and make
						informed decisions for a secure future
					</p>
				</motion.div>

				{/* Chart Selection */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
				>
					{chartOptions.map((option) => {
						const Icon = option.icon;
						const isActive = activeChart === option.id;

						return (
							<motion.button
								key={option.id}
								variants={itemVariants}
								onClick={() => handleChartSwitch(option.id)}
								className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
									isActive
										? `${option.borderColor} bg-gradient-to-br ${option.bgGradient} shadow-lg scale-105`
										: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-102"
								} backdrop-blur-sm`}
								whileHover={{ scale: isActive ? 1.05 : 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{/* Background Gradient */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${
										option.bgGradient
									} opacity-0 transition-opacity duration-300 ${
										isActive ? "opacity-100" : "group-hover:opacity-50"
									}`}
								></div>

								<div className="relative z-10">
									<div
										className={`inline-flex p-3 rounded-xl mb-4 transition-all duration-300 ${
											isActive
												? "bg-white/80 dark:bg-gray-700/80 shadow-md"
												: "bg-gray-100 dark:bg-gray-700 group-hover:bg-white/60 dark:group-hover:bg-gray-600"
										}`}
									>
										<Icon
											className={`w-6 h-6 transition-colors duration-300 ${
												isActive
													? "text-gray-700 dark:text-gray-300"
													: "text-gray-600 dark:text-gray-400"
											}`}
											style={{
												color: isActive ? option.color : undefined,
											}}
										/>
									</div>

									<h3
										className={`text-lg font-bold mb-2 transition-colors duration-300 ${
											isActive
												? "text-gray-900 dark:text-white"
												: "text-gray-800 dark:text-gray-200"
										}`}
									>
										{option.title}
									</h3>

									<p
										className={`text-sm leading-relaxed transition-colors duration-300 ${
											isActive
												? "text-gray-700 dark:text-gray-300"
												: "text-gray-600 dark:text-gray-400"
										}`}
									>
										{option.description}
									</p>

									<div
										className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mt-3 transition-all duration-300 ${
											isActive
												? "bg-white/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200"
												: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
										}`}
									>
										{option.category}
									</div>
								</div>

								{/* Active Indicator */}
								{isActive && (
									<motion.div
										layoutId="activeIndicator"
										className="absolute inset-0 rounded-2xl"
										style={{
											background: `linear-gradient(135deg, ${option.primaryColor}15, ${option.secondaryColor}10)`,
											border: `2px solid ${option.primaryColor}40`,
										}}
										transition={{
											type: "spring",
											stiffness: 500,
											damping: 35,
										}}
									/>
								)}
							</motion.button>
						);
					})}
				</motion.div>

				{/* Chart Content */}
				<div className="relative bg-transparent min-h-[600px]">
					{/* Compound Interest Chart */}
					{activeChart === "compound-interest" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="space-y-8 bg-transparent"
						>
							<div className="flex items-center gap-3 mb-8">
								<div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg">
									<TrendingUp className="w-8 h-8" />
								</div>
								<div>
									<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
										Compound Interest Calculator
									</h2>
									<p className="text-gray-600 dark:text-gray-300">
										Visualize the power of compound growth with interactive
										charts and real-time calculations
									</p>
								</div>
							</div>

							{/* Interactive Controls */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
							>
								{[
									{
										label: "Initial Investment",
										value: principal,
										setter: setPrincipal,
										min: 0,
										max: 1000000,
										step: 100,
										prefix: "$",
									},
									{
										label: "Annual Interest Rate",
										value: rate,
										setter: setRate,
										min: 0,
										max: 30,
										step: 0.1,
										suffix: "%",
									},
									{
										label: "Investment Period",
										value: years,
										setter: setYears,
										min: 1,
										max: 50,
										step: 1,
										suffix: " years",
									},
									{
										label: "Monthly Contribution",
										value: monthlyContribution,
										setter: setMonthlyContribution,
										min: 0,
										max: 10000,
										step: 50,
										prefix: "$",
									},
								].map((control, index) => (
									<motion.div
										key={control.label}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: index * 0.1 + 0.3 }}
										className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-lg"
									>
										<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
											{control.label}
										</label>
										<div className="space-y-3">
											<input
												type="range"
												min={control.min}
												max={control.max}
												step={control.step}
												value={control.value}
												onChange={(e) =>
													control.setter(parseFloat(e.target.value))
												}
												className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
											/>
											<div className="flex justify-between items-center">
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{control.prefix}
													{control.min}
													{control.suffix}
												</span>
												<div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg font-medium text-sm">
													{control.prefix}
													{control.value.toLocaleString("en-US")}
													{control.suffix}
												</div>
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{control.prefix}
													{control.max.toLocaleString("en-US")}
													{control.suffix}
												</span>
											</div>
										</div>
									</motion.div>
								))}
							</motion.div>

							{/* Chart Component */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<CompoundInterestChart
									principal={principal}
									monthlyContribution={monthlyContribution}
									annualRate={rate}
									years={years}
								/>
							</motion.div>

							{/* Enhanced Summary */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
								className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-100/60 dark:from-blue-900/20 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/30 backdrop-blur-sm"
							>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
									<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
									Investment Summary
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
									{(() => {
										const totalInvested =
											principal + monthlyContribution * years * 12;
										const monthlyRate = rate / 100 / 12;
										const totalMonths = years * 12;
										const compoundGrowth =
											principal * Math.pow(1 + rate / 100, years);
										const annuityValue =
											monthlyContribution *
											(((Math.pow(1 + monthlyRate, totalMonths) - 1) /
												monthlyRate) *
												(1 + monthlyRate));
										const finalBalance = compoundGrowth + annuityValue;
										const interestEarned = finalBalance - totalInvested;
										const roi = (interestEarned / totalInvested) * 100;

										return [
											{
												label: "Total Invested",
												value: `$${Math.round(totalInvested).toLocaleString(
													"en-US"
												)}`,
												color: "text-gray-900 dark:text-white",
												icon: "💼",
											},
											{
												label: "Interest Earned",
												value: `$${Math.round(interestEarned).toLocaleString(
													"en-US"
												)}`,
												color: "text-emerald-600 dark:text-emerald-400",
												icon: "📊",
											},
											{
												label: "Final Balance",
												value: `$${Math.round(finalBalance).toLocaleString(
													"en-US"
												)}`,
												color: "text-indigo-600 dark:text-indigo-400",
												icon: "🎯",
											},
											{
												label: "ROI",
												value: `${roi.toFixed(1)}%`,
												color: "text-purple-600 dark:text-purple-400",
												icon: "🚀",
											},
										];
									})().map((stat, index) => (
										<motion.div
											key={stat.label}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ delay: index * 0.1 + 0.7 }}
											className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
										>
											<div className="text-2xl mb-2">{stat.icon}</div>
											<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
												{stat.label}
											</p>
											<p className={`text-lg font-bold ${stat.color}`}>
												{stat.value}
											</p>
										</motion.div>
									))}
								</div>
							</motion.div>
						</motion.div>
					)}

					{/* Budget Chart */}
					{activeChart === "budget" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="bg-transparent"
						>
							<div className="flex items-center gap-3 mb-8">
								<div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg">
									<PieChart className="w-8 h-8" />
								</div>
								<div>
									<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
										Dynamic Budget Analytics
									</h2>
									<p className="text-gray-600 dark:text-gray-300">
										Real-time budget tracking with interactive insights and live
										data updates
									</p>
								</div>
							</div>

							<InteractiveBudgetDashboard />
						</motion.div>
					)}

					{/* Loan Chart */}
					{activeChart === "loan" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="bg-transparent"
						>
							<div className="flex items-center gap-3 mb-8">
								<div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
									<Calculator className="w-8 h-8" />
								</div>
								<div>
									<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
										Advanced Loan Calculator
									</h2>
									<p className="text-gray-600 dark:text-gray-300">
										Compare different loan types and plan your payments
										strategically
									</p>
								</div>
							</div>

							<LoanCalculator />
						</motion.div>
					)}

					{/* Retirement Chart */}
					{activeChart === "retirement" && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="bg-transparent"
						>
							<RetirementCalculator />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}
