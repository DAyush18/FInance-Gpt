"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	Calculator,
	Home,
	Car,
	User,
	GraduationCap,
	TrendingDown,
	DollarSign,
	Calendar,
	BarChart3,
	Info,
} from "lucide-react";

// Loan type configuration with specific details
const LOAN_TYPES = {
	home: {
		id: "home",
		name: "Home Loan",
		icon: Home,
		color: "#4F46E5",
		bgColor:
			"from-indigo-50/80 to-blue-100/60 dark:from-indigo-900/20 dark:to-blue-900/40",
		borderColor: "border-indigo-200 dark:border-indigo-700/50",
		minRate: 6.5,
		maxRate: 15,
		maxTenure: 30,
		description: "Home loans for buying or constructing your dream home",
	},
	auto: {
		id: "auto",
		name: "Auto Loan",
		icon: Car,
		color: "#10B981",
		bgColor:
			"from-emerald-50/80 to-green-100/60 dark:from-emerald-900/20 dark:to-green-900/40",
		borderColor: "border-emerald-200 dark:border-emerald-700/50",
		minRate: 7,
		maxRate: 18,
		maxTenure: 7,
		description: "Financing solutions for new and used vehicles",
	},
	personal: {
		id: "personal",
		name: "Personal Loan",
		icon: User,
		color: "#7C3AED",
		bgColor:
			"from-purple-50/80 to-violet-100/60 dark:from-purple-900/20 dark:to-violet-900/40",
		borderColor: "border-purple-200 dark:border-purple-700/50",
		minRate: 10,
		maxRate: 24,
		maxTenure: 5,
		description: "Unsecured loans for personal financial needs",
	},
	education: {
		id: "education",
		name: "Education Loan",
		icon: GraduationCap,
		color: "#F59E0B",
		bgColor:
			"from-amber-50/80 to-yellow-100/60 dark:from-amber-900/20 dark:to-yellow-900/40",
		borderColor: "border-amber-200 dark:border-amber-700/50",
		minRate: 8,
		maxRate: 16,
		maxTenure: 15,
		description: "Educational financing for students and professionals",
	},
};

interface LoanCalculation {
	emi: number;
	totalInterest: number;
	totalPayment: number;
	isValid: boolean;
	errorMessage?: string;
}

interface AmortizationEntry {
	month: number;
	emi: number;
	principal: number;
	interest: number;
	balance: number;
}

export default function LoanCalculator() {
	const [selectedLoanType, setSelectedLoanType] = useState("home");
	const [loanAmount, setLoanAmount] = useState(500000);
	const [interestRate, setInterestRate] = useState(8.5);
	const [tenure, setTenure] = useState(20);
	const [calculation, setCalculation] = useState<LoanCalculation>({
		emi: 0,
		totalInterest: 0,
		totalPayment: 0,
		isValid: false,
	});
	const [showAmortization, setShowAmortization] = useState(false);
	const [amortizationSchedule, setAmortizationSchedule] = useState<
		AmortizationEntry[]
	>([]);

	// Calculate loan details
	const calculateLoan = (
		amount: number,
		rate: number,
		years: number
	): LoanCalculation => {
		// Input validation
		if (amount <= 0) {
			return {
				emi: 0,
				totalInterest: 0,
				totalPayment: 0,
				isValid: false,
				errorMessage: "Loan amount must be greater than 0",
			};
		}

		if (rate < 0) {
			return {
				emi: 0,
				totalInterest: 0,
				totalPayment: 0,
				isValid: false,
				errorMessage: "Interest rate cannot be negative",
			};
		}

		if (years <= 0) {
			return {
				emi: 0,
				totalInterest: 0,
				totalPayment: 0,
				isValid: false,
				errorMessage: "Tenure must be greater than 0",
			};
		}

		// Check if tenure exceeds maximum allowed for selected loan type
		if (years > currentLoanType.maxTenure) {
			return {
				emi: 0,
				totalInterest: 0,
				totalPayment: 0,
				isValid: false,
				errorMessage: `Tenure cannot exceed ${currentLoanType.maxTenure} years for ${currentLoanType.name}`,
			};
		}

		// Handle 0% interest rate case
		if (rate === 0) {
			const emi = amount / (years * 12);
			return {
				emi,
				totalInterest: 0,
				totalPayment: amount,
				isValid: true,
			};
		}

		// Standard EMI calculation using the formula:
		// EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
		const monthlyRate = rate / 100 / 12;
		const numberOfPayments = years * 12;
		const emi =
			(amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
			(Math.pow(1 + monthlyRate, numberOfPayments) - 1);

		const totalPayment = emi * numberOfPayments;
		const totalInterest = totalPayment - amount;

		return {
			emi,
			totalInterest,
			totalPayment,
			isValid: true,
		};
	};

	// Generate amortization schedule
	const generateAmortizationSchedule = (
		amount: number,
		rate: number,
		years: number,
		emi: number
	): AmortizationEntry[] => {
		if (!calculation.isValid || rate < 0 || amount <= 0 || years <= 0)
			return [];

		const schedule: AmortizationEntry[] = [];
		const monthlyRate = rate / 100 / 12;
		let remainingBalance = amount;

		for (let month = 1; month <= years * 12; month++) {
			const interestPayment = remainingBalance * monthlyRate;
			const principalPayment = emi - interestPayment;
			remainingBalance = Math.max(0, remainingBalance - principalPayment);

			schedule.push({
				month,
				emi: emi,
				principal: principalPayment,
				interest: interestPayment,
				balance: remainingBalance,
			});

			// Break if balance reaches 0 (for edge cases)
			if (remainingBalance <= 0.01) break;
		}

		return schedule;
	};

	const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		// Allow user to type but don't restrict input here - validation will show error
		setTenure(value);
	};

	// Update calculations when inputs change
	useEffect(() => {
		const newCalculation = calculateLoan(loanAmount, interestRate, tenure);
		setCalculation(newCalculation);

		if (newCalculation.isValid) {
			const schedule = generateAmortizationSchedule(
				loanAmount,
				interestRate,
				tenure,
				newCalculation.emi
			);
			setAmortizationSchedule(schedule);
		} else {
			setAmortizationSchedule([]);
		}
	}, [loanAmount, interestRate, tenure]);

	// Update default values when loan type changes
	useEffect(() => {
		const loanType = LOAN_TYPES[selectedLoanType as keyof typeof LOAN_TYPES];
		setInterestRate(loanType.minRate + 1); // Set a reasonable default
		setTenure(Math.min(10, loanType.maxTenure)); // Set reasonable default tenure
	}, [selectedLoanType]);

	const currentLoanType =
		LOAN_TYPES[selectedLoanType as keyof typeof LOAN_TYPES];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="space-y-8"
		>
			{/* Loan Type Selection */}
			<div className="space-y-6">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
					<Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
					Select Loan Type
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{Object.values(LOAN_TYPES).map((loanType) => {
						const Icon = loanType.icon;
						const isSelected = selectedLoanType === loanType.id;

						return (
							<motion.button
								key={loanType.id}
								onClick={() => setSelectedLoanType(loanType.id)}
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
									isSelected
										? `${loanType.borderColor} bg-gradient-to-br ${loanType.bgColor} shadow-lg`
										: "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80"
								}`}
							>
								<div className="flex items-center gap-3 mb-2">
									<div
										className={`p-2 rounded-xl text-white shadow-md`}
										style={{ backgroundColor: loanType.color }}
									>
										<Icon className="w-5 h-5" />
									</div>
									<span className="font-semibold text-gray-900 dark:text-white">
										{loanType.name}
									</span>
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{loanType.description}
								</p>
								<div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
									Rate: {loanType.minRate}% - {loanType.maxRate}% | Max:{" "}
									{loanType.maxTenure} years
								</div>
							</motion.button>
						);
					})}
				</div>
			</div>

			{/* Input Fields */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
				{/* Loan Amount */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 }}
					className="space-y-3"
				>
					<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
						<span className="flex items-center gap-2">
							<DollarSign className="w-4 h-4" />
							Loan Amount
						</span>
					</label>
					<div className="relative">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
							$
						</span>
						<input
							type="number"
							value={loanAmount}
							onChange={(e) => {
								const value = Number(e.target.value);
								// Limit maximum loan amount to prevent overflow issues
								const maxAmount = 999999999; // 999 million max
								setLoanAmount(Math.min(value, maxAmount));
							}}
							className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
							placeholder="Enter loan amount"
							min="1"
							max="999999999"
							step="1000"
						/>
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						Maximum loan amount: $999,999,999
					</div>
				</motion.div>

				{/* Interest Rate */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className="space-y-3"
				>
					<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
						<span className="flex items-center gap-2">
							<TrendingDown className="w-4 h-4" />
							Annual Interest Rate (%)
						</span>
					</label>
					<div className="relative">
						<input
							type="number"
							value={interestRate}
							onChange={(e) => setInterestRate(Number(e.target.value))}
							className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
							placeholder="Enter interest rate"
							min="0"
							max="50"
							step="0.1"
						/>
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						Recommended: {currentLoanType.minRate}% - {currentLoanType.maxRate}%
					</div>
				</motion.div>

				{/* Loan Tenure */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="space-y-3"
				>
					<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
						<span className="flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							Loan Tenure (Years)
						</span>
					</label>
					<input
						type="number"
						value={tenure}
						onChange={handleTenureChange}
						className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
						placeholder="Enter tenure in years"
						min="1"
						max={currentLoanType.maxTenure}
						step="1"
					/>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						Maximum: {currentLoanType.maxTenure} years
					</div>
				</motion.div>
			</div>

			{/* Error Display */}
			{!calculation.isValid && calculation.errorMessage && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 flex items-center gap-3"
				>
					<Info className="w-5 h-5 text-red-600 dark:text-red-400" />
					<span className="text-red-700 dark:text-red-300 font-medium">
						{calculation.errorMessage}
					</span>
				</motion.div>
			)}

			{/* Results Display */}
			{calculation.isValid && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
				>
					{[
						{
							label: "Monthly EMI",
							value: calculation.emi,
							icon: Calculator,
							color: "text-indigo-600 dark:text-indigo-400",
							bgColor:
								"from-indigo-50/80 to-blue-100/60 dark:from-indigo-900/20 dark:to-blue-900/40",
							borderColor: "border-indigo-200 dark:border-indigo-700/50",
						},
						{
							label: "Total Interest",
							value: calculation.totalInterest,
							icon: TrendingDown,
							color: "text-amber-600 dark:text-amber-400",
							bgColor:
								"from-amber-50/80 to-yellow-100/60 dark:from-amber-900/20 dark:to-yellow-900/40",
							borderColor: "border-amber-200 dark:border-amber-700/50",
						},
						{
							label: "Total Payment",
							value: calculation.totalPayment,
							icon: DollarSign,
							color: "text-emerald-600 dark:text-emerald-400",
							bgColor:
								"from-emerald-50/80 to-green-100/60 dark:from-emerald-900/20 dark:to-green-900/40",
							borderColor: "border-emerald-200 dark:border-emerald-700/50",
						},
					].map((result, index) => {
						const Icon = result.icon;

						// Smart number formatting to prevent overflow
						const formatLargeNumber = (value: number): string => {
							if (value >= 1000000000) {
								return `${(value / 1000000000).toFixed(1)}B`;
							} else if (value >= 1000000) {
								// Handle edge case where millions would round to 1000+ by checking the raw value
								if (value >= 999500000) {
									// 999.5M rounds to 1000M, so use B format instead
									return `${(value / 1000000000).toFixed(1)}B`;
								} else {
									return `${(value / 1000000).toFixed(1)}M`;
								}
							} else if (value >= 100000) {
								return `${(value / 1000).toFixed(0)}K`;
							} else {
								return value.toLocaleString("en-US", {
									maximumFractionDigits: 0,
								});
							}
						};

						const formattedValue = formatLargeNumber(result.value);
						const fullValue = result.value.toLocaleString("en-US", {
							maximumFractionDigits: 0,
						});

						return (
							<motion.div
								key={result.label}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.1 + 0.5 }}
								whileHover={{ scale: 1.02, y: -2 }}
								className={`p-6 rounded-2xl bg-gradient-to-br ${result.bgColor} border ${result.borderColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 min-w-0`}
							>
								<div className="flex items-center gap-3 mb-3">
									<div
										className={`p-2 rounded-xl ${result.color} bg-white/50 dark:bg-gray-800/50 flex-shrink-0`}
									>
										<Icon className="w-5 h-5" />
									</div>
									<span className="font-semibold text-gray-700 dark:text-gray-300 text-sm truncate">
										{result.label}
									</span>
								</div>
								<div
									className={`text-2xl font-bold ${result.color} break-words leading-tight`}
									title={`$${fullValue}`}
								>
									<span className="inline-block">$</span>
									<span className="inline-block">{formattedValue}</span>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			)}

			{/* Amortization Schedule Toggle */}
			{calculation.isValid && amortizationSchedule.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="space-y-6"
				>
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
							<BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
							Payment Schedule
						</h3>
						<button
							onClick={() => setShowAmortization(!showAmortization)}
							className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors duration-300"
						>
							{showAmortization ? "Hide" : "Show"} Amortization Table
						</button>
					</div>

					{/* Yearly Summary */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
						{[1, 5, 10, tenure]
							.filter((value, index, array) => array.indexOf(value) === index)
							.map((year) => {
								if (year > tenure) return null;
								const monthIndex = year * 12 - 1;
								const entry = amortizationSchedule[monthIndex];
								if (!entry) return null;

								// Use the same smart formatting function
								const formatLargeNumber = (value: number): string => {
									if (value >= 1000000000) {
										return `${(value / 1000000000).toFixed(1)}B`;
									} else if (value >= 1000000) {
										// Handle edge case where millions would round to 1000+ by checking the raw value
										if (value >= 999500000) {
											// 999.5M rounds to 1000M, so use B format instead
											return `${(value / 1000000000).toFixed(1)}B`;
										} else {
											return `${(value / 1000000).toFixed(1)}M`;
										}
									} else if (value >= 100000) {
										return `${(value / 1000).toFixed(0)}K`;
									} else {
										return value.toLocaleString("en-US", {
											maximumFractionDigits: 0,
										});
									}
								};

								const formattedBalance = formatLargeNumber(entry.balance);
								const fullBalance = entry.balance.toLocaleString("en-US", {
									maximumFractionDigits: 0,
								});

								return (
									<div
										key={`year-${year}`}
										className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 min-w-0"
									>
										<div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 truncate">
											After {year} year{year > 1 ? "s" : ""}
										</div>
										<div
											className="text-lg font-bold text-gray-900 dark:text-white break-words leading-tight"
											title={`$${fullBalance}`}
										>
											<span className="inline-block">$</span>
											<span className="inline-block">{formattedBalance}</span>
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-500 truncate">
											Outstanding Balance
										</div>
									</div>
								);
							})}
					</div>

					{/* Amortization Table */}
					{showAmortization && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="overflow-hidden"
						>
							<div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
								<div className="overflow-x-auto max-h-96">
									<table className="w-full">
										<thead className="bg-gray-50/95 dark:bg-gray-700/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm border-b border-gray-200 dark:border-gray-600">
											<tr>
												<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
													Month
												</th>
												<th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
													EMI
												</th>
												<th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
													Principal
												</th>
												<th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
													Interest
												</th>
												<th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
													Balance
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
											{amortizationSchedule.slice(0, 60).map((entry) => (
												<tr
													key={entry.month}
													className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
												>
													<td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
														{entry.month}
													</td>
													<td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
														$
														{entry.emi.toLocaleString("en-IN", {
															maximumFractionDigits: 0,
														})}
													</td>
													<td className="px-4 py-3 text-sm text-right text-emerald-600 dark:text-emerald-400">
														$
														{entry.principal.toLocaleString("en-IN", {
															maximumFractionDigits: 0,
														})}
													</td>
													<td className="px-4 py-3 text-sm text-right text-amber-600 dark:text-amber-400">
														$
														{entry.interest.toLocaleString("en-IN", {
															maximumFractionDigits: 0,
														})}
													</td>
													<td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
														$
														{entry.balance.toLocaleString("en-IN", {
															maximumFractionDigits: 0,
														})}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								{amortizationSchedule.length > 60 && (
									<div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-center text-sm text-gray-500 dark:text-gray-400">
										Showing first 60 months of {amortizationSchedule.length}{" "}
										total payments
									</div>
								)}
							</div>
						</motion.div>
					)}
				</motion.div>
			)}
		</motion.div>
	);
}
