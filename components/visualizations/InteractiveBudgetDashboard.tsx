"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Line,
	Area,
	AreaChart,
} from "recharts";
import {
	TrendingUp,
	TrendingDown,
	Minus,
	AlertTriangle,
	CheckCircle,
	Info,
	DollarSign,
	Target,
	Sparkles,
	BarChart3,
	Globe,
	RefreshCw,
} from "lucide-react";
import {
	budgetService,
	BudgetData,
	SpendingInsight,
} from "@/lib/services/budgetService";

interface MarketData {
	top_gainers?: Array<{
		ticker: string;
		price: string;
		change_amount: string;
		change_percentage: string;
	}>;
	top_losers?: Array<{
		ticker: string;
		price: string;
		change_amount: string;
		change_percentage: string;
	}>;
}

interface EconomicIndicators {
	indicators: Array<{
		name: string;
		value: number;
		unit: string;
		date: string;
		change: number;
	}>;
}

interface MarketNews {
	feed: Array<{
		title: string;
		summary: string;
		source: string;
		sentiment: string;
		relevanceScore: number;
	}>;
}

export default function InteractiveBudgetDashboard() {
	const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
	const [insights, setInsights] = useState<SpendingInsight[]>([]);
	const [activeTab, setActiveTab] = useState<"overview" | "trends" | "market">(
		"overview"
	);
	const [marketData, setMarketData] = useState<MarketData | null>(null);
	const [economicData, setEconomicData] = useState<EconomicIndicators | null>(
		null
	);
	const [marketNews, setMarketNews] = useState<MarketNews | null>(null);
	const [isLoadingMarket, setIsLoadingMarket] = useState(false);
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

	// Fetch market data from Alpha Vantage API
	const fetchMarketData = useCallback(async () => {
		setIsLoadingMarket(true);
		try {
			const [gainersLosers, indicators, news] = await Promise.all([
				fetch("/api/alpha-vantage?function=TOP_GAINERS_LOSERS"),
				fetch("/api/alpha-vantage?function=REAL_GDP"),
				fetch("/api/alpha-vantage?function=NEWS_SENTIMENT"),
			]);

			const [marketResponse, indicatorsResponse, newsResponse] =
				await Promise.all([
					gainersLosers.json(),
					indicators.json(),
					news.json(),
				]);

			setMarketData(marketResponse);
			setEconomicData(indicatorsResponse);
			setMarketNews(newsResponse);
			setLastUpdated(new Date());
		} catch (error) {
			console.error("Error fetching market data:", error);
		} finally {
			setIsLoadingMarket(false);
		}
	}, []);

	useEffect(() => {
		// Initialize budget data
		const initialData = budgetService.getBudgetData();
		setBudgetData(initialData);
		setInsights(budgetService.getSpendingInsights());

		// Subscribe to real-time updates
		const unsubscribe = budgetService.subscribe((newData) => {
			setBudgetData(newData);
			setInsights(budgetService.getSpendingInsights());
		});

		// Start real-time simulation
		budgetService.simulateRealTimeUpdates();

		// Fetch initial market data
		fetchMarketData();

		// Set up periodic market data refresh (every 5 minutes)
		const marketRefreshInterval = setInterval(fetchMarketData, 5 * 60 * 1000);

		return () => {
			unsubscribe();
			clearInterval(marketRefreshInterval);
		};
	}, [fetchMarketData]);

	const handleCategoryUpdate = (categoryId: string, newValue: number) => {
		budgetService.updateCategoryBudget(categoryId, newValue);
	};

	const getTrendIcon = (trend: "up" | "down" | "stable") => {
		switch (trend) {
			case "up":
				return <TrendingUp className="w-4 h-4 text-red-500" />;
			case "down":
				return <TrendingDown className="w-4 h-4 text-green-500" />;
			default:
				return <Minus className="w-4 h-4 text-gray-500" />;
		}
	};

	const getInsightIcon = (type: "warning" | "success" | "info") => {
		switch (type) {
			case "warning":
				return <AlertTriangle className="w-4 h-4 text-amber-500" />;
			case "success":
				return <CheckCircle className="w-4 h-4 text-green-500" />;
			default:
				return <Info className="w-4 h-4 text-blue-500" />;
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatPercentage = (value: number) => {
		return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
	};

	if (!budgetData) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header with Live Data Indicator */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						<span className="text-sm text-gray-600 dark:text-gray-400">
							Live Data • Updated {lastUpdated.toLocaleTimeString()}
						</span>
					</div>
				</div>
				<button
					onClick={fetchMarketData}
					disabled={isLoadingMarket}
					className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
				>
					<RefreshCw
						className={`w-4 h-4 ${isLoadingMarket ? "animate-spin" : ""}`}
					/>
					Refresh Market Data
				</button>
			</div>

			{/* Tab Navigation */}
			<div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
				{[
					{ id: "overview", label: "Budget Overview", icon: PieChart },
					{ id: "trends", label: "Spending Trends", icon: BarChart3 },
					{ id: "market", label: "Market Context", icon: Globe },
				].map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() =>
								setActiveTab(tab.id as "overview" | "trends" | "market")
							}
							className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
								activeTab === tab.id
									? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm"
									: "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
							}`}
						>
							<Icon className="w-4 h-4" />
							{tab.label}
						</button>
					);
				})}
			</div>

			<AnimatePresence mode="wait">
				{/* Budget Overview Tab */}
				{activeTab === "overview" && (
					<motion.div
						key="overview"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="space-y-8"
					>
						{/* Budget Summary Cards */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{[
								{
									title: "Total Budget",
									value: formatCurrency(budgetData.totalBudget),
									icon: Target,
									color: "text-blue-600 dark:text-blue-400",
									bg: "bg-blue-50 dark:bg-blue-900/20",
								},
								{
									title: "Total Spent",
									value: formatCurrency(budgetData.totalSpent),
									icon: DollarSign,
									color: "text-purple-600 dark:text-purple-400",
									bg: "bg-purple-50 dark:bg-purple-900/20",
								},
								{
									title: "Remaining",
									value: formatCurrency(
										budgetData.totalBudget - budgetData.totalSpent
									),
									icon: Sparkles,
									color: "text-green-600 dark:text-green-400",
									bg: "bg-green-50 dark:bg-green-900/20",
								},
								{
									title: "Health Score",
									value: `${budgetData.healthScore}/100`,
									icon: CheckCircle,
									color: "text-emerald-600 dark:text-emerald-400",
									bg: "bg-emerald-50 dark:bg-emerald-900/20",
								},
							].map((card, index) => {
								const Icon = card.icon;
								return (
									<motion.div
										key={card.title}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: index * 0.1 }}
										className={`p-6 rounded-2xl ${card.bg} border border-white/30 dark:border-gray-700/30 backdrop-blur-sm`}
									>
										<div className="flex items-center justify-between mb-4">
											<div className={`p-3 rounded-lg ${card.bg}`}>
												<Icon className={`w-6 h-6 ${card.color}`} />
											</div>
										</div>
										<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
											{card.title}
										</p>
										<p className={`text-2xl font-bold ${card.color}`}>
											{card.value}
										</p>
									</motion.div>
								);
							})}
						</div>

						{/* Budget Visualization */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Pie Chart */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 }}
								className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
							>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
									Budget Allocation
								</h3>
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={budgetData.categories}
											cx="50%"
											cy="50%"
											outerRadius={120}
											fill="#8884d8"
											dataKey="value"
											label={({ name, percentage }) =>
												`${name}: ${percentage}%`
											}
										>
											{budgetData.categories.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip
											formatter={(value) => formatCurrency(value as number)}
										/>
									</PieChart>
								</ResponsiveContainer>
							</motion.div>

							{/* Category Details */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
								className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
							>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
									Category Performance
								</h3>
								<div className="space-y-4 max-h-80 overflow-y-auto overflow-x-hidden">
									{budgetData.categories.map((category) => (
										<motion.div
											key={category.id}
											whileHover={{ scale: 1.02 }}
											className="p-4 rounded-lg bg-white/40 dark:bg-gray-700/40 border border-white/20 dark:border-gray-600/20"
										>
											<div className="flex items-center justify-between mb-2">
												<span className="font-medium text-gray-900 dark:text-white">
													{category.name}
												</span>
												<div className="flex items-center gap-2">
													{getTrendIcon(category.trend)}
													<span className="text-sm text-gray-600 dark:text-gray-400">
														{formatPercentage(category.trendValue)}
													</span>
												</div>
											</div>
											<div className="flex items-center justify-between text-sm">
												<span className="text-gray-600 dark:text-gray-400">
													{formatCurrency(category.value)} /{" "}
													{formatCurrency(category.target)}
												</span>
												<div className="flex items-center gap-2">
													<input
														type="range"
														min={0}
														max={category.target * 2}
														value={category.value}
														onChange={(e) =>
															handleCategoryUpdate(
																category.id,
																parseInt(e.target.value)
															)
														}
														className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
														style={{ accentColor: category.color }}
													/>
												</div>
											</div>
											<div className="mt-2">
												<div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
													<div
														className="h-2 rounded-full transition-all duration-300"
														style={{
															backgroundColor: category.color,
															width: `${Math.min(
																100,
																(category.value / category.target) * 100
															)}%`,
														}}
													/>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>

						{/* Insights */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
						>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
								Smart Insights & Recommendations
							</h3>
							<div className="space-y-4">
								{insights.map((insight, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 + 0.7 }}
										className={`p-4 rounded-lg border-l-4 ${
											insight.type === "warning"
												? "bg-amber-50 dark:bg-amber-900/20 border-amber-400"
												: insight.type === "success"
												? "bg-green-50 dark:bg-green-900/20 border-green-400"
												: "bg-blue-50 dark:bg-blue-900/20 border-blue-400"
										}`}
									>
										<div className="flex items-center gap-3">
											{getInsightIcon(insight.type)}
											<div>
												<p className="text-gray-900 dark:text-white font-medium">
													{insight.insight}
												</p>
												{insight.action && (
													<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
														💡 {insight.action}
													</p>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}

				{/* Spending Trends Tab */}
				{activeTab === "trends" && (
					<motion.div
						key="trends"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="space-y-8"
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Monthly Trends */}
							<div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
									Monthly Income vs Expenses
								</h3>
								<ResponsiveContainer width="100%" height={300}>
									<AreaChart data={budgetData.monthlyTrend}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip
											formatter={(value) => formatCurrency(value as number)}
										/>
										<Area
											type="monotone"
											dataKey="income"
											stackId="1"
											stroke="#10B981"
											fill="#10B981"
											fillOpacity={0.3}
										/>
										<Area
											type="monotone"
											dataKey="expenses"
											stackId="2"
											stroke="#EF4444"
											fill="#EF4444"
											fillOpacity={0.3}
										/>
										<Line
											type="monotone"
											dataKey="savings"
											stroke="#6366F1"
											strokeWidth={3}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>

							{/* Savings Goal Progress */}
							<div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
									Savings Goal Progress
								</h3>
								<div className="space-y-4">
									<div>
										<div className="flex justify-between mb-2">
											<span className="text-gray-600 dark:text-gray-400">
												Progress to Goal
											</span>
											<span className="font-bold text-gray-900 dark:text-white">
												{(
													(budgetData.savingsGoal.current /
														budgetData.savingsGoal.target) *
													100
												).toFixed(1)}
												%
											</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
											<div
												className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full transition-all duration-500"
												style={{
													width: `${Math.min(
														100,
														(budgetData.savingsGoal.current /
															budgetData.savingsGoal.target) *
															100
													)}%`,
												}}
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4 mt-6">
										<div className="text-center p-4 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Current
											</p>
											<p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
												{formatCurrency(budgetData.savingsGoal.current)}
											</p>
										</div>
										<div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Target
											</p>
											<p className="text-lg font-bold text-blue-600 dark:text-blue-400">
												{formatCurrency(budgetData.savingsGoal.target)}
											</p>
										</div>
									</div>
									<div className="text-center mt-4">
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Estimated completion:{" "}
											<span className="font-medium">
												{budgetData.savingsGoal.timeline}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}

				{/* Market Context Tab */}
				{activeTab === "market" && (
					<motion.div
						key="market"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="space-y-8"
					>
						{/* Market Overview */}
						{marketData && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{/* Top Gainers */}
								<div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
										<TrendingUp className="w-5 h-5 text-green-500" />
										Top Gainers
									</h3>
									<div className="space-y-3">
										{marketData.top_gainers?.slice(0, 5).map((stock, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20"
											>
												<div>
													<span className="font-bold text-gray-900 dark:text-white">
														{stock.ticker}
													</span>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														${stock.price}
													</p>
												</div>
												<div className="text-right">
													<span className="text-green-600 dark:text-green-400 font-bold">
														{stock.change_percentage}
													</span>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														${stock.change_amount}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Top Losers */}
								<div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
										<TrendingDown className="w-5 h-5 text-red-500" />
										Top Losers
									</h3>
									<div className="space-y-3">
										{marketData.top_losers?.slice(0, 5).map((stock, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20"
											>
												<div>
													<span className="font-bold text-gray-900 dark:text-white">
														{stock.ticker}
													</span>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														${stock.price}
													</p>
												</div>
												<div className="text-right">
													<span className="text-red-600 dark:text-red-400 font-bold">
														{stock.change_percentage}
													</span>
													<p className="text-sm text-gray-600 dark:text-gray-400">
														${stock.change_amount}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						{/* Economic Indicators */}
						{economicData && (
							<div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
									Economic Indicators
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									{economicData.indicators.map((indicator, index) => (
										<div
											key={index}
											className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20"
										>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
												{indicator.name}
											</p>
											<p className="text-lg font-bold text-gray-900 dark:text-white">
												{indicator.value}
												{indicator.unit}
											</p>
											<div className="flex items-center gap-1 mt-1">
												{indicator.change >= 0 ? (
													<TrendingUp className="w-3 h-3 text-green-500" />
												) : (
													<TrendingDown className="w-3 h-3 text-red-500" />
												)}
												<span
													className={`text-xs ${
														indicator.change >= 0
															? "text-green-600"
															: "text-red-600"
													}`}
												>
													{formatPercentage(indicator.change)}
												</span>
											</div>
											<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
												{indicator.date}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Market News */}
						{marketNews && (
							<div className="p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
									Market News & Sentiment
								</h3>
								<div className="space-y-4">
									{marketNews.feed?.slice(0, 3).map((news, index) => (
										<div
											key={index}
											className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
										>
											<div className="flex items-start justify-between mb-2">
												<h4 className="font-bold text-gray-900 dark:text-white text-sm">
													{news.title}
												</h4>
												<span
													className={`px-2 py-1 rounded-full text-xs font-medium ${
														news.sentiment === "positive"
															? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
															: news.sentiment === "negative"
															? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
															: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
													}`}
												>
													{news.sentiment}
												</span>
											</div>
											<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
												{news.summary}
											</p>
											<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
												<span>Source: {news.source}</span>
												<span>
													Relevance: {(news.relevanceScore * 100).toFixed(0)}%
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Loading State for Market Data */}
						{isLoadingMarket && (
							<div className="flex items-center justify-center h-32">
								<div className="flex items-center gap-3">
									<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
									<span className="text-gray-600 dark:text-gray-400">
										Fetching latest market data...
									</span>
								</div>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
