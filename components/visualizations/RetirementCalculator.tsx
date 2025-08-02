"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	Target,
	TrendingUp,
	DollarSign,
	PiggyBank,
	Calculator,
	Award,
	Zap,
} from "lucide-react";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Area,
	AreaChart,
	Legend,
	PieChart,
	Pie,
	Cell,
} from "recharts";

interface RetirementData {
	age: number;
	totalSavings: number;
	annualContribution: number;
	employerMatch: number;
	interestEarned: number;
	totalValue: number;
}

interface RetirementInputs {
	currentAge: number;
	retirementAge: number;
	currentSavings: number;
	monthlyContribution: number;
	expectedReturn: number;
	inflationRate: number;
	currentIncome: number;
	employerMatch: number;
}

interface TooltipFormatterValue {
	value: number;
	name: string;
}

interface TooltipProps {
	active?: boolean;
	payload?: TooltipFormatterValue[];
	label?: string | number;
}

export default function RetirementCalculator() {
	const [inputs, setInputs] = useState<RetirementInputs>({
		currentAge: 30,
		retirementAge: 65,
		currentSavings: 25000,
		monthlyContribution: 500,
		employerMatch: 3,
		expectedReturn: 7,
		currentIncome: 75000,
		inflationRate: 2.5,
	});

	const [projectionData, setProjectionData] = useState<RetirementData[]>([]);
	const [totalAtRetirement, setTotalAtRetirement] = useState(0);
	const [monthlyRetirementIncome, setMonthlyRetirementIncome] = useState(0);
	const [shortfall, setShortfall] = useState(0);

	// Calculate retirement projections
	useEffect(() => {
		const calculateProjection = () => {
			const data: RetirementData[] = [];
			const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
			let currentValue = inputs.currentSavings;

			for (let year = 0; year <= yearsToRetirement; year++) {
				const age = inputs.currentAge + year;
				const annualContribution = inputs.monthlyContribution * 12;
				const employerMatchAmount = Math.min(
					(inputs.currentIncome * inputs.employerMatch) / 100,
					annualContribution
				);

				if (year > 0) {
					// Calculate compound growth
					const interestEarned = currentValue * (inputs.expectedReturn / 100);
					currentValue +=
						interestEarned + annualContribution + employerMatchAmount;
				}

				data.push({
					age,
					totalSavings:
						currentValue - (annualContribution + employerMatchAmount) * year,
					annualContribution: annualContribution + employerMatchAmount,
					employerMatch: employerMatchAmount,
					interestEarned:
						year > 0 ? currentValue * (inputs.expectedReturn / 100) : 0,
					totalValue: currentValue,
				});
			}

			setProjectionData(data);
			setTotalAtRetirement(currentValue);

			// Calculate monthly retirement income using 4% withdrawal rule
			const monthlyIncome = (currentValue * 0.04) / 12;
			setMonthlyRetirementIncome(monthlyIncome);

			// Calculate if there's a shortfall (assuming 80% of current income needed)
			const targetMonthlyIncome = (inputs.currentIncome * 0.8) / 12;
			const adjustedTargetIncome =
				targetMonthlyIncome *
				Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);
			setShortfall(Math.max(0, adjustedTargetIncome - monthlyIncome));
		};

		calculateProjection();
	}, [inputs]);

	const handleInputChange = (field: keyof RetirementInputs, value: number) => {
		// Add input validation to prevent extremely large values
		let validatedValue = value;

		// Set reasonable maximums for financial inputs
		const maxValues: Record<keyof RetirementInputs, number> = {
			currentAge: 100,
			retirementAge: 100,
			currentSavings: 999999999, // 999 million max
			monthlyContribution: 999999, // 999k monthly max
			employerMatch: 100,
			expectedReturn: 50,
			currentIncome: 999999999, // 999 million max
			inflationRate: 100,
		};

		if (maxValues[field] !== undefined) {
			validatedValue = Math.min(value, maxValues[field]);
		}

		setInputs((prev) => ({ ...prev, [field]: validatedValue }));
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	// Smart currency formatting to prevent overflow
	const formatSmartCurrency = (
		amount: number
	): { display: string; full: string } => {
		const fullFormat = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);

		let smartFormat: string;
		if (amount >= 1000000000) {
			smartFormat = `$${(amount / 1000000000).toFixed(1)}B`;
		} else if (amount >= 1000000) {
			const millions = amount / 1000000;
			// Handle edge case where millions would round to 1000+ by checking the raw value
			if (amount >= 999500000) {
				// 999.5M rounds to 1000M, so use B format instead
				smartFormat = `$${(amount / 1000000000).toFixed(1)}B`;
			} else {
				smartFormat = `$${millions.toFixed(1)}M`;
			}
		} else if (amount >= 100000) {
			smartFormat = `$${(amount / 1000).toFixed(0)}K`;
		} else {
			smartFormat = fullFormat;
		}

		return { display: smartFormat, full: fullFormat };
	};

	const formatPercentage = (value: number) => {
		return `${value.toFixed(1)}%`;
	};

	// Prepare data for different chart types
	const contributionBreakdown = [
		{
			name: "Your Contributions",
			value: inputs.monthlyContribution * 12,
			color: "#4F46E5",
		},
		{
			name: "Employer Match",
			value: Math.min(
				(inputs.currentIncome * inputs.employerMatch) / 100,
				inputs.monthlyContribution * 12
			),
			color: "#10B981",
		},
	];

	const retirementReadiness = () => {
		const targetAmount = inputs.currentIncome * 0.8 * 25; // 25x annual expenses rule
		const projectedAmount = totalAtRetirement;
		const readinessPercentage = Math.min(
			(projectedAmount / targetAmount) * 100,
			100
		);

		if (readinessPercentage >= 100)
			return { status: "On Track", color: "text-emerald-600", icon: Award };
		if (readinessPercentage >= 75)
			return {
				status: "Good Progress",
				color: "text-amber-600",
				icon: TrendingUp,
			};
		return { status: "Needs Improvement", color: "text-red-600", icon: Zap };
	};

	const readiness = retirementReadiness();
	const ReadinessIcon = readiness.icon;

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center gap-3 mb-8">
				<div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
					<Target className="w-8 h-8" />
				</div>
				<div>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
						Retirement Planning Calculator
					</h2>
					<p className="text-gray-600 dark:text-gray-300">
						Plan your financial future with precision and confidence
					</p>
				</div>
			</div>

			{/* Input Controls */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{[
					{
						label: "Current Age",
						value: inputs.currentAge,
						onChange: (value: number) => handleInputChange("currentAge", value),
						min: 18,
						max: 100,
						step: 1,
						icon: "👤",
					},
					{
						label: "Retirement Age",
						value: inputs.retirementAge,
						onChange: (value: number) =>
							handleInputChange("retirementAge", value),
						min: inputs.currentAge + 1,
						max: 100,
						step: 1,
						icon: "🎯",
					},
					{
						label: "Current Savings ($)",
						value: inputs.currentSavings,
						onChange: (value: number) =>
							handleInputChange("currentSavings", value),
						min: 0,
						max: 999999999,
						step: 1000,
						icon: "💰",
					},
					{
						label: "Monthly Contribution ($)",
						value: inputs.monthlyContribution,
						onChange: (value: number) =>
							handleInputChange("monthlyContribution", value),
						min: 0,
						max: 999999,
						step: 50,
						icon: "📈",
					},
					{
						label: "Current Income ($)",
						value: inputs.currentIncome,
						onChange: (value: number) =>
							handleInputChange("currentIncome", value),
						min: 0,
						max: 999999999,
						step: 1000,
						icon: "💼",
					},
					{
						label: "Employer Match (%)",
						value: inputs.employerMatch,
						onChange: (value: number) =>
							handleInputChange("employerMatch", value),
						min: 0,
						max: 10,
						step: 0.5,
						icon: "🏢",
					},
					{
						label: "Expected Return (%)",
						value: inputs.expectedReturn,
						onChange: (value: number) =>
							handleInputChange("expectedReturn", value),
						min: 1,
						max: 15,
						step: 0.1,
						icon: "📊",
					},
					{
						label: "Inflation Rate (%)",
						value: inputs.inflationRate,
						onChange: (value: number) =>
							handleInputChange("inflationRate", value),
						min: 0,
						max: 10,
						step: 0.1,
						icon: "📉",
					},
				].map((input, index) => (
					<motion.div
						key={input.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
					>
						<div className="flex items-center gap-3 mb-3">
							<span className="text-2xl flex-shrink-0">{input.icon}</span>
							<label className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
								{input.label}
							</label>
						</div>
						<input
							type="number"
							value={input.value}
							onChange={(e) => input.onChange(Number(e.target.value))}
							min={input.min}
							max={input.max}
							step={input.step}
							className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
						/>
					</motion.div>
				))}
			</div>

			{/* Key Metrics */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
			>
				<div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/50">
					<div className="flex items-center gap-3 mb-3">
						<PiggyBank className="w-6 h-6 text-emerald-600 flex-shrink-0" />
						<span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
							Total at Retirement
						</span>
					</div>
					<div
						className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 leading-tight"
						title={formatSmartCurrency(totalAtRetirement).full}
					>
						{formatSmartCurrency(totalAtRetirement).display}
					</div>
				</div>

				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
					<div className="flex items-center gap-3 mb-3">
						<DollarSign className="w-6 h-6 text-blue-600 flex-shrink-0" />
						<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
							Monthly Retirement Income
						</span>
					</div>
					<div
						className="text-3xl font-bold text-blue-800 dark:text-blue-200 leading-tight"
						title={formatSmartCurrency(monthlyRetirementIncome).full}
					>
						{formatSmartCurrency(monthlyRetirementIncome).display}
					</div>
				</div>

				<div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-700/50">
					<div className="flex items-center gap-3 mb-3">
						<ReadinessIcon
							className={`w-6 h-6 ${readiness.color} flex-shrink-0`}
						/>
						<span className="text-sm font-medium text-amber-700 dark:text-amber-300">
							Retirement Readiness
						</span>
					</div>
					<div
						className={`text-2xl font-bold ${readiness.color} leading-tight`}
					>
						{readiness.status}
					</div>
				</div>
			</motion.div>

			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Projection Chart */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
					className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
				>
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
						<TrendingUp className="w-6 h-6 text-amber-600" />
						Retirement Savings Projection
					</h3>
					<div className="h-80">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={projectionData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
								<XAxis dataKey="age" stroke="#6b7280" tick={{ fontSize: 12 }} />
								<YAxis
									stroke="#6b7280"
									tick={{ fontSize: 12 }}
									tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
								/>
								<Tooltip
									formatter={(value: number, name: string) => [
										formatCurrency(value),
										name === "totalValue" ? "Total Value" : name,
									]}
									labelFormatter={(age) => `Age: ${age}`}
									contentStyle={{
										backgroundColor: "#f9fafb",
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
									}}
								/>
								<Area
									type="monotone"
									dataKey="totalValue"
									stroke="#f59e0b"
									fill="url(#retirementGradient)"
									strokeWidth={3}
								/>
								<defs>
									<linearGradient
										id="retirementGradient"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
									</linearGradient>
								</defs>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</motion.div>

				{/* Contribution Breakdown */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
					className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
				>
					<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
						<Calculator className="w-6 h-6 text-emerald-600" />
						Annual Contribution Breakdown
					</h3>
					<div className="h-80">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={contributionBreakdown}
									cx="50%"
									cy="50%"
									outerRadius={100}
									innerRadius={40}
									paddingAngle={5}
									dataKey="value"
								>
									{contributionBreakdown.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									formatter={(value: number) => [formatCurrency(value), ""]}
									contentStyle={{
										backgroundColor: "#f9fafb",
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
									}}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</motion.div>
			</div>

			{/* Recommendations */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-700/50"
			>
				<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
					<Award className="w-7 h-7 text-indigo-600" />
					Personalized Recommendations
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-white">
									Maximize Employer Match
								</h4>
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									You're getting{" "}
									{formatCurrency(
										Math.min(
											(inputs.currentIncome * inputs.employerMatch) / 100,
											inputs.monthlyContribution * 12
										)
									)}{" "}
									in free employer matching annually. This is essentially free
									money!
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-white">
									Savings Rate Analysis
								</h4>
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									You're saving{" "}
									{formatPercentage(
										((inputs.monthlyContribution * 12) / inputs.currentIncome) *
											100
									)}{" "}
									of your income. Financial experts recommend saving 10-15% for
									retirement.
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
							<div>
								<h4 className="font-semibold text-gray-900 dark:text-white">
									Time Advantage
								</h4>
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									You have {inputs.retirementAge - inputs.currentAge} years
									until retirement. Starting early gives you a significant
									compound interest advantage.
								</p>
							</div>
						</div>

						{shortfall > 0 && (
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
								<div>
									<h4 className="font-semibold text-gray-900 dark:text-white">
										Income Shortfall Alert
									</h4>
									<p className="text-gray-600 dark:text-gray-300 text-sm">
										You may have a monthly shortfall of{" "}
										{formatCurrency(shortfall)} based on needing 80% of current
										income in retirement.
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
}
