"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import NavigationLink from "@/components/ui/NavigationLink";
import {
	MessageCircle,
	Lightbulb,
	Target,
	TrendingUp,
	Sparkles,
	Brain,
	BookOpen,
	Clock,
	ArrowLeft,
} from "lucide-react";
import ChatInterface from "@/components/chat/ChatInterface";
import { RippleButton } from "@/components/ui/RippleButton";

// Separate component to handle search params
function ChatContent() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [chatInput, setChatInput] = useState("");
	const searchParams = useSearchParams();
	const topic = searchParams.get("topic");

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const handleQuickAction = (actionText: string) => {
		setChatInput("");
		setTimeout(() => {
			setChatInput(actionText);
		}, 10);
	};

	const tipCards = [
		{
			icon: Lightbulb,
			title: "Smart Tips",
			subtitle: "Getting Started",
			description:
				"Start with simple questions like 'What is a budget?' or 'How do I start saving?'",
			gradient: "from-amber-400/20 via-yellow-400/10 to-orange-400/20",
			iconColor: "text-amber-600 dark:text-amber-400",
			borderColor: "border-amber-200/50 dark:border-amber-400/30",
			bgGlow: "bg-amber-400/5",
		},
		{
			icon: Target,
			title: "Stay Focused",
			subtitle: "Learning Strategy",
			description:
				"One topic at a time helps you learn better and retain more information",
			gradient: "from-blue-400/20 via-indigo-400/10 to-purple-400/20",
			iconColor: "text-blue-600 dark:text-blue-400",
			borderColor: "border-blue-200/50 dark:border-blue-400/30",
			bgGlow: "bg-blue-400/5",
		},
		{
			icon: TrendingUp,
			title: "Practice Daily",
			subtitle: "Real Application",
			description:
				"Apply what you learn with real examples from your own financial situation",
			gradient: "from-emerald-400/20 via-green-400/10 to-teal-400/20",
			iconColor: "text-emerald-600 dark:text-emerald-400",
			borderColor: "border-emerald-200/50 dark:border-emerald-400/30",
			bgGlow: "bg-emerald-400/5",
		},
	];

	const quickActions = [
		{ text: "Create my first budget", icon: BookOpen },
		{ text: "Investment basics", icon: TrendingUp },
		{ text: "Debt management tips", icon: Target },
		{ text: "Emergency fund guide", icon: Sparkles },
	];

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

	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-30 dark:opacity-10">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.1),transparent_50%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
			</div>

			<div className="relative z-10 p-4 md:p-8">
				<div className="max-w-7xl mx-auto">
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
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-12 text-center"
					>
						<div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/20 dark:border-gray-700/30">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
								<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
									AI Assistant Online
								</span>
							</div>
							<div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
							<div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
								<Sparkles className="w-3 h-3" />
								<span>Instant AI responses</span>
							</div>
						</div>

						<motion.h1
							className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Chat with FinanceGPT
						</motion.h1>

						<motion.p
							className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Your intelligent financial companion. Ask questions, get
							personalized explanations, and learn at your own pace.
						</motion.p>

						{/* Quick Action Buttons */}
						<motion.div
							className="mt-8 flex flex-wrap justify-center gap-3"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
						>
							{quickActions.map((action, index) => {
								const Icon = action.icon;
								return (
									<RippleButton
										key={action.text}
										className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 micro-button"
										rippleColor="rgba(79, 70, 229, 0.2)"
										onClick={(e) => {
											handleQuickAction(action.text);
										}}
									>
										<Icon className="w-4 h-4" />
										<span>{action.text}</span>
									</RippleButton>
								);
							})}
						</motion.div>
					</motion.div>

					{/* Main Chat Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mb-12"
					>
						<div className="relative">
							{/* Chat container with enhanced styling */}
							<div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 overflow-hidden">
								{/* Gradient border effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-xl -z-10" />

								<div className="h-[700px] md:h-[600px]">
									<ChatInterface
										initialInput={chatInput}
										onInputChange={setChatInput}
										topic={topic || undefined}
									/>
								</div>
							</div>

							{/* Floating status indicator */}
							<motion.div
								className="absolute -top-3 -right-3 flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 1, type: "spring" }}
							>
								<Brain className="w-3 h-3" />
								<span>AI Ready</span>
							</motion.div>
						</div>
					</motion.div>

					{/* Enhanced Tip Cards */}
					<motion.div
						variants={container}
						initial="hidden"
						animate={isLoaded ? "show" : "hidden"}
						className="grid md:grid-cols-3 gap-6"
					>
						{tipCards.map((card, index) => {
							const Icon = card.icon;
							return (
								<motion.div
									key={card.title}
									variants={item}
									className="group relative"
								>
									{/* Card container with enhanced glassmorphism */}
									<div
										className={`relative h-full p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] overflow-hidden`}
									>
										{/* Background gradient */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
										/>

										{/* Subtle glow effect */}
										<div
											className={`absolute inset-0 ${card.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
										/>

										{/* Content */}
										<div className="relative z-10">
											{/* Icon section */}
											<div className="flex items-center gap-3 mb-4">
												<motion.div
													className={`p-3 rounded-xl bg-white/80 dark:bg-gray-700/80 shadow-sm ${card.iconColor}`}
													whileHover={{ rotate: 5, scale: 1.1 }}
													transition={{ type: "spring", stiffness: 300 }}
												>
													<Icon className="w-5 h-5" />
												</motion.div>
												<div>
													<h3 className="font-bold text-lg text-gray-900 dark:text-white">
														{card.title}
													</h3>
													<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
														{card.subtitle}
													</p>
												</div>
											</div>

											{/* Description */}
											<p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
												{card.description}
											</p>
										</div>

										{/* Hover shimmer effect */}
										<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
									</div>
								</motion.div>
							);
						})}
					</motion.div>

					{/* Stats Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1 }}
						className="mt-16 text-center"
					>
						<div className="inline-flex flex-wrap items-center gap-8 px-8 py-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/20 dark:border-gray-700/30">
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
								<MessageCircle className="w-4 h-4 text-blue-500" />
								<span className="text-sm font-medium">1M+ conversations</span>
							</div>
							<div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
								<Clock className="w-4 h-4 text-emerald-500" />
								<span className="text-sm font-medium">24/7 available</span>
							</div>
							<div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
								<Sparkles className="w-4 h-4 text-purple-500" />
								<span className="text-sm font-medium">AI-powered</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</main>
	);
}

// Loading component for Suspense fallback
function ChatLoading() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30">
			<div className="relative z-10 p-4 md:p-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center justify-center h-96">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
							<span className="text-lg text-gray-600 dark:text-gray-300">
								Loading chat...
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

// Main export component with Suspense boundary
export default function ChatPage() {
	return (
		<Suspense fallback={<ChatLoading />}>
			<ChatContent />
		</Suspense>
	);
}
