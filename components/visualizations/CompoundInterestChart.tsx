"use client";

"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { TrendingUp, DollarSign, Calculator, IndianRupeeIcon } from "lucide-react";

interface TooltipPayload {
	value: number;
	dataKey: string;
	color: string;
	name: string;
}

interface TooltipProps {
	active?: boolean;
	payload?: TooltipPayload[];
	label?: string | number;
}

interface CalculatorInputs {
	principal: number;
	monthlyContribution: number;
	annualRate: number;
	years: number;
}

interface CompoundInterestChartProps {
	principal?: number;
	monthlyContribution?: number;
	annualRate?: number;
	years?: number;
}

interface TooltipPayload {
	value: number;
	dataKey: string;
	color: string;
	name: string;
}

interface TooltipProps {
	active?: boolean;
	payload?: TooltipPayload[];
	label?: string | number;
}

// Custom tooltip component with enhanced styling
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
	if (active && payload && payload.length > 0) {
		return (
			<div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-2xl p-4 shadow-2xl">
				<p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
					Year {label}
				</p>
				{payload.map((entry, index: number) => (
					<div key={index} className="flex items-center gap-2 mb-1">
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{entry.name}:
						</span>
						<span
							className="text-sm font-bold text-gray-900 dark:text-white"
							style={{ color: entry.color || "inherit" }}
						>
							₹{entry.value.toLocaleString()}
						</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

export default function CompoundInterestChart({
	principal = 1000,
	monthlyContribution = 100,
	annualRate = 7,
	years = 10,
}: CompoundInterestChartProps) {
	// Dynamic inputs from props with fallback defaults
	const inputs: CalculatorInputs = {
		principal,
		monthlyContribution,
		annualRate,
		years,
	};

	const calculateCompoundInterest = useMemo(() => {
		const data = [];
		const monthlyRate = inputs.annualRate / 100 / 12;
		let balance = inputs.principal;

		for (let year = 0; year <= inputs.years; year++) {
			const totalContributions =
				inputs.principal + inputs.monthlyContribution * 12 * year;
			const interest = balance - totalContributions;

			data.push({
				year,
				balance: Math.round(balance),
				contributions: Math.round(totalContributions),
				interest: Math.round(interest),
			});

			// Calculate next year's balance
			for (let month = 0; month < 12; month++) {
				balance = balance * (1 + monthlyRate) + inputs.monthlyContribution;
			}
		}

		return data;
	}, [
		inputs.principal,
		inputs.monthlyContribution,
		inputs.annualRate,
		inputs.years,
	]);

	const data = calculateCompoundInterest;
	const finalBalance = data[data.length - 1].balance;
	const totalContributions = data[data.length - 1].contributions;
	const totalInterest = data[data.length - 1].interest;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="p-8 rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-white/30 dark:border-gray-700/50 shadow-2xl"
		>
			{/* Enhanced Chart Container */}
			<div className="relative">
				{/* Chart Background with gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/30 dark:from-blue-900/10 dark:to-indigo-900/20 rounded-2xl -m-4" />

				<div className="relative z-10 h-[400px]">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={data}
							margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
						>
							{/* Enhanced grid */}
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(99, 102, 241, 0.1)"
								strokeWidth={1}
							/>

							{/* Enhanced X-axis */}
							<XAxis
								dataKey="year"
								axisLine={false}
								tickLine={false}
								tick={{
									fill: "rgb(107, 114, 128)",
									fontSize: 12,
									fontWeight: 500,
								}}
								label={{
									value: "Years",
									position: "insideBottom",
									offset: -10,
									style: {
										textAnchor: "middle",
										fill: "rgb(107, 114, 128)",
										fontSize: "14px",
										fontWeight: 600,
									},
								}}
							/>

							{/* Enhanced Y-axis */}
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{
									fill: "rgb(107, 114, 128)",
									fontSize: 12,
									fontWeight: 500,
								}}
								label={{
									value: "Amount (₹)",
									angle: -90,
									position: "insideLeft",
									style: {
										textAnchor: "middle",
										fill: "rgb(107, 114, 128)",
										fontSize: "14px",
										fontWeight: 600,
									},
								}}
								tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
							/>

							{/* Custom tooltip */}
							<Tooltip content={<CustomTooltip />} />

							{/* Enhanced legend */}
							<Legend
								wrapperStyle={{
									paddingTop: "20px",
									fontSize: "14px",
									fontWeight: 600,
									color: "rgb(107, 114, 128)",
								}}
							/>

							{/* Enhanced lines with gradients */}
							<Line
								type="monotone"
								dataKey="balance"
								stroke="url(#balanceGradient)"
								strokeWidth={4}
								name="Total Balance"
								dot={{ fill: "#4F46E5", strokeWidth: 3, r: 6 }}
								activeDot={{
									r: 8,
									fill: "#4F46E5",
									stroke: "#fff",
									strokeWidth: 3,
									filter: "drop-shadow(0 4px 8px rgba(79, 70, 229, 0.3))",
								}}
							/>
							<Line
								type="monotone"
								dataKey="contributions"
								stroke="url(#contributionsGradient)"
								strokeWidth={3}
								name="Total Contributions"
								dot={{ fill: "#7C3AED", strokeWidth: 2, r: 4 }}
								activeDot={{
									r: 6,
									fill: "#7C3AED",
									stroke: "#fff",
									strokeWidth: 2,
								}}
							/>
							<Line
								type="monotone"
								dataKey="interest"
								stroke="url(#interestGradient)"
								strokeWidth={3}
								name="Interest Earned"
								dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
								activeDot={{
									r: 6,
									fill: "#10B981",
									stroke: "#fff",
									strokeWidth: 2,
								}}
							/>

							{/* Gradient definitions */}
							<defs>
								<linearGradient
									id="balanceGradient"
									x1="0"
									y1="0"
									x2="1"
									y2="0"
								>
									<stop offset="0%" stopColor="#4F46E5" />
									<stop offset="100%" stopColor="#7C3AED" />
								</linearGradient>
								<linearGradient
									id="contributionsGradient"
									x1="0"
									y1="0"
									x2="1"
									y2="0"
								>
									<stop offset="0%" stopColor="#7C3AED" />
									<stop offset="100%" stopColor="#A855F7" />
								</linearGradient>
								<linearGradient
									id="interestGradient"
									x1="0"
									y1="0"
									x2="1"
									y2="0"
								>
									<stop offset="0%" stopColor="#10B981" />
									<stop offset="100%" stopColor="#059669" />
								</linearGradient>
							</defs>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Enhanced Results Summary */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.6 }}
				className="mt-8 grid md:grid-cols-3 gap-6"
			>
				{[
					{
						icon: IndianRupeeIcon,
						label: "Total Contributions",
						value: totalContributions,
						color: "text-gray-900 dark:text-white",
						bgColor:
							"from-gray-50/80 to-slate-100/60 dark:from-gray-700/50 dark:to-slate-600/30",
						borderColor: "border-gray-200 dark:border-gray-600",
					},
					{
						icon: TrendingUp,
						label: "Interest Earned",
						value: totalInterest,
						color: "text-emerald-600 dark:text-emerald-400",
						bgColor:
							"from-emerald-50/80 to-green-100/60 dark:from-emerald-900/20 dark:to-green-900/40",
						borderColor: "border-emerald-200 dark:border-emerald-700",
					},
					{
						icon: Calculator,
						label: "Final Balance",
						value: finalBalance,
						color: "text-indigo-600 dark:text-indigo-400",
						bgColor:
							"from-indigo-50/80 to-blue-100/60 dark:from-indigo-900/20 dark:to-blue-900/40",
						borderColor: "border-indigo-200 dark:border-indigo-700",
					},
				].map((stat, index) => {
					const Icon = stat.icon;
					return (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 + 0.4 }}
							whileHover={{ scale: 1.02, y: -2 }}
							className={`p-6 rounded-2xl bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
						>
							<div className="flex items-center gap-3 mb-3">
								<div
									className={`p-2 rounded-xl ${stat.color} bg-white/50 dark:bg-gray-800/50`}
								>
									<Icon className="w-5 h-5" />
								</div>
								<span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
									{stat.label}
								</span>
							</div>
							<div className={`text-2xl font-bold ${stat.color}`}>
								₹{stat.value.toLocaleString()}
							</div>
						</motion.div>
					);
				})}
			</motion.div>
		</motion.div>
	);
}
