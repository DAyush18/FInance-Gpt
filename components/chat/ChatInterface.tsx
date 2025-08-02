"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { RippleButton } from "@/components/ui/RippleButton";
import { useProgress } from "@/contexts/ProgressContext";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

interface ChatInterfaceProps {
	initialInput?: string;
	onInputChange?: (value: string) => void;
	topic?: string;
}

export default function ChatInterface({
	initialInput,
	onInputChange,
	topic,
}: ChatInterfaceProps = {}) {
	const { recordQuestionAsked } = useProgress();

	// Create topic-specific initial message
	const getInitialMessage = () => {
		if (topic) {
			const topicNames: { [key: string]: string } = {
				budgeting: "Budgeting Basics",
				investing: "Investing 101",
				saving: "Smart Saving",
				debt: "Debt Management",
				retirement: "Retirement Planning",
				goals: "Financial Goals",
			};

			const moduleIntros: { [key: string]: string } = {
				budgeting:
					"Welcome to your **Budgeting Basics** learning session! 🏦\n\nI'm your specialized budgeting tutor, ready to help you master the art of managing your money effectively. Whether you're creating your first budget, learning about the 50/30/20 rule, or building an emergency fund, I'm here to guide you through every step.\n\n**What makes budgeting successful?**\n- Start simple and build habits gradually\n- Track your spending to understand your patterns\n- Automate your savings to stay consistent\n- Adjust your budget as your life changes\n\nReady to take control of your finances? Ask me anything about budgeting, or try one of the starter questions above!",

				investing:
					"Welcome to your **Investing 101** learning session! 📈\n\nI'm your specialized investment education guide, here to demystify investing and help you build confidence in growing your wealth. From understanding stocks and bonds to harnessing the power of compound interest, we'll explore everything step by step.\n\n**Key investing principles to remember:**\n- Time in the market beats timing the market\n- Diversification helps manage risk\n- Start early, even with small amounts\n- Understand what you're investing in\n- Stay focused on long-term goals\n\nLet's start building your investment knowledge! What aspect of investing would you like to explore first?",

				saving:
					"Welcome to your **Smart Saving** learning session! 🏦\n\nI'm your specialized savings strategist, excited to help you develop effective saving habits and reach your financial goals. Whether you're building your first emergency fund, exploring high-yield accounts, or creating automatic saving systems, I'm here to guide you.\n\n**Smart saving strategies:**\n- Pay yourself first before any spending\n- Automate your savings to remove temptation\n- Start small and build momentum\n- Make your goals visible and rewarding\n- Celebrate every milestone along the way\n\nReady to supercharge your savings? Let's dive into building wealth through strategic saving habits!",

				debt: "Welcome to your **Debt Management** learning session! 💳\n\nI'm your specialized debt management expert, here to help you understand, manage, and strategically eliminate debt while building healthier financial habits. From choosing between debt avalanche and snowball methods to improving your credit score, we'll tackle it all together.\n\n**Debt freedom principles:**\n- Know exactly what you owe (list all debts)\n- Choose your strategy: avalanche or snowball\n- Pay minimums on all, extra on your target\n- Stop creating new debt during payoff\n- Build a small emergency fund to break debt cycles\n\nEvery payment brings you closer to financial freedom! What debt challenge can I help you with today?",

				retirement:
					"Welcome to your **Retirement Planning** learning session! 🛡️\n\nI'm your specialized retirement planning expert, ready to help you understand retirement fundamentals and build confidence in preparing for your financial future. From 401(k) and IRA basics to Social Security planning, we'll explore everything you need to know.\n\n**Retirement planning essentials:**\n- Start as early as possible, even with small amounts\n- Always capture your full employer match\n- Understand Roth vs Traditional tax implications\n- Think long-term and stay consistent\n- Review and adjust your plan regularly\n\nThe best time to start planning for retirement was yesterday, the second best time is today! What retirement planning topic can I help clarify for you?",

				goals:
					"Welcome to your **Financial Goals** learning session! 🎯\n\nI'm your specialized financial goal-setting expert, here to help you define, plan, and achieve your financial dreams through strategic goal setting and milestone tracking. From SMART goals to motivation systems, we'll build your path to success.\n\n**Goal achievement principles:**\n- Make your goals SMART (Specific, Measurable, Achievable, Relevant, Time-bound)\n- Write them down and review regularly\n- Break big goals into smaller milestones\n- Automate progress when possible\n- Celebrate wins to maintain momentum\n\nEvery financial dream starts with a clear goal and a solid plan! What financial goal would you like to work on together?",
			};

			const topicName = topicNames[topic] || topic;
			return (
				moduleIntros[topic] ||
				`Hi! I'm your specialized ${topicName} advisor. I'm here to help you master everything about ${topic.toLowerCase()} in a simple, friendly way. What specific ${topic.toLowerCase()} question can I help you with today?`
			);
		}

		return "Hi! I'm your FinanceGPT assistant. I'm here to help you learn about personal finance in a simple, friendly way. What would you like to know about today?";
	};

	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "assistant",
			content: getInitialMessage(),
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const lastSentValueRef = useRef<string>("");

	// Handle initial input from parent component
	useEffect(() => {
		if (initialInput && initialInput.trim() !== "" && initialInput !== input) {
			setInput(initialInput);
			lastSentValueRef.current = initialInput; // Sync ref to prevent circular callback
			// Focus the input field after setting the value
			setTimeout(() => {
				inputRef.current?.focus();
				inputRef.current?.setSelectionRange(
					initialInput.length,
					initialInput.length
				);
			}, 100);
		}
	}, [initialInput, input]);

	// Handle starter question events from module page
	useEffect(() => {
		const handleSetQuestion = (event: CustomEvent<string>) => {
			const question = event.detail;
			if (question) {
				setInput(question);
				setTimeout(() => {
					inputRef.current?.focus();
				}, 100);
			}
		};

		window.addEventListener("setQuestion", handleSetQuestion as EventListener);
		return () => {
			window.removeEventListener(
				"setQuestion",
				handleSetQuestion as EventListener
			);
		};
	}, []);

	// Handle input changes with throttling to prevent excessive updates
	const handleInputChange = (value: string) => {
		setInput(value);
		// Use a more defensive approach for parent callback to prevent circular updates
		if (onInputChange && value !== lastSentValueRef.current) {
			lastSentValueRef.current = value;
			onInputChange(value);
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: input.trim(),
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		handleInputChange("");
		setIsLoading(true);

		// Record question asked for progress tracking
		if (topic) {
			recordQuestionAsked(topic);
		}

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: userMessage.content,
					history: messages.slice(-10), // Send last 10 messages for context
					topic: topic, // Include topic for specialized responses
				}),
			});

			const data = await response.json();

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content:
					data.message ||
					"I apologize, but I encountered an error. Please try again.",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Error sending message:", error);
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content:
					"I apologize, but I encountered an error. Please check your connection and try again.",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
			inputRef.current?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e as any);
		}
	};

	return (
		<div className="flex flex-col h-full max-h-[800px] bg-transparent rounded-none">
			{/* Enhanced Header */}
			<div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<motion.div
							className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
							whileHover={{ rotate: 5, scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<Bot className="w-5 h-5" />
						</motion.div>
						<div>
							<h2 className="text-xl font-bold text-gray-900 dark:text-white">
								{topic
									? `${
											topic.charAt(0).toUpperCase() + topic.slice(1)
									  } Specialist`
									: "FinanceGPT"}
							</h2>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{topic
									? `Your dedicated ${topic} advisor`
									: "Your AI financial advisor"}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{/* Module indicator badge */}
						{topic && (
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700">
								<BookOpen className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
								<span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
									{topic.charAt(0).toUpperCase() + topic.slice(1)} Module
								</span>
							</div>
						)}

						{/* Status indicator */}
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
							<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
							<span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
								Online
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
				<AnimatePresence>
					{messages.map((message) => (
						<motion.div
							key={message.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className={`flex ${
								message.role === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`flex gap-3 max-w-[85%] ${
									message.role === "user" ? "flex-row-reverse" : "flex-row"
								}`}
							>
								{/* Enhanced Avatar */}
								<div
									className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${
										message.role === "user"
											? "bg-gradient-to-r from-blue-500 to-purple-600"
											: "bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600"
									}`}
								>
									{message.role === "user" ? (
										<User className="w-5 h-5" />
									) : (
										<Bot className="w-5 h-5" />
									)}
								</div>

								<div className="flex flex-col gap-1">
									{/* Message bubble with enhanced design */}
									<div
										className={`rounded-2xl px-4 py-3 shadow-sm border ${
											message.role === "user"
												? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-200 shadow-blue-200/50"
												: "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
										}`}
									>
										<div className="text-sm leading-relaxed prose prose-sm prose-slate dark:prose-invert max-w-none">
											<ReactMarkdown
												remarkPlugins={[remarkGfm]}
												components={{
													// Block Elements
													p: ({ children }) => (
														<p className="mb-3 last:mb-0 text-gray-900 dark:text-gray-100 leading-relaxed">
															{children}
														</p>
													),

													// Headings with gradient accents
													h1: ({ children }) => (
														<h1 className="text-xl font-bold mb-4 mt-6 first:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
															{children}
														</h1>
													),
													h2: ({ children }) => (
														<h2 className="text-lg font-bold mb-3 mt-5 first:mt-0 text-gray-900 dark:text-gray-100">
															{children}
														</h2>
													),
													h3: ({ children }) => (
														<h3 className="text-base font-semibold mb-2 mt-4 first:mt-0 text-gray-900 dark:text-gray-100">
															{children}
														</h3>
													),
													h4: ({ children }) => (
														<h4 className="text-sm font-semibold mb-2 mt-3 first:mt-0 text-gray-800 dark:text-gray-200">
															{children}
														</h4>
													),
													h5: ({ children }) => (
														<h5 className="text-sm font-medium mb-1 mt-3 first:mt-0 text-gray-800 dark:text-gray-200">
															{children}
														</h5>
													),
													h6: ({ children }) => (
														<h6 className="text-xs font-medium mb-1 mt-2 first:mt-0 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
															{children}
														</h6>
													),

													// Text Formatting
													strong: ({ children }) => (
														<strong className="font-semibold text-gray-900 dark:text-gray-100">
															{children}
														</strong>
													),
													em: ({ children }) => (
														<em className="italic text-gray-800 dark:text-gray-200">
															{children}
														</em>
													),

													// Lists with enhanced styling
													ul: ({ children }) => (
														<ul className="list-disc list-outside ml-4 mb-4 space-y-1 text-gray-900 dark:text-gray-100">
															{children}
														</ul>
													),
													ol: ({ children }) => (
														<ol className="list-decimal list-outside ml-4 mb-4 space-y-1 text-gray-900 dark:text-gray-100">
															{children}
														</ol>
													),
													li: ({ children }) => (
														<li className="mb-1 leading-relaxed">{children}</li>
													),

													// Code and Pre
													code: ({ children, className }) => {
														const isInline = !className;
														return isInline ? (
															<code className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-200 dark:border-gray-600">
																{children}
															</code>
														) : (
															<code className="block bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-gray-700 dark:border-gray-600">
																{children}
															</code>
														);
													},
													pre: ({ children }) => (
														<pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto border border-gray-700 dark:border-gray-600 shadow-lg">
															{children}
														</pre>
													),

													// Links
													a: ({ children, href, title }) => (
														<a
															href={href}
															title={title}
															className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-800/50 transition-colors duration-200"
															target="_blank"
															rel="noopener noreferrer"
														>
															{children}
														</a>
													),

													// Images
													img: ({ src, alt, title }) => (
														<div className="mb-4">
															<Image
																src={
																	typeof src === "string"
																		? src
																		: "/placeholder.png"
																}
																alt={alt || "Image"}
																title={title}
																width={600}
																height={400}
																className="max-w-full h-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
																priority={false}
																placeholder="blur"
																blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
															/>
															{alt && (
																<p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center italic">
																	{alt}
																</p>
															)}
														</div>
													),

													// Blockquotes
													blockquote: ({ children }) => (
														<blockquote className="border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 pl-4 py-2 mb-4 italic text-gray-700 dark:text-gray-300 rounded-r-lg">
															{children}
														</blockquote>
													),

													// Horizontal Rule
													hr: () => (
														<hr className="my-6 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
													),

													// Line Break
													br: () => <br className="my-1" />,

													// Tables with enhanced glassmorphism styling
													table: ({ children }) => (
														<div className="overflow-x-auto mb-6 rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
															<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
																{children}
															</table>
														</div>
													),
													thead: ({ children }) => (
														<thead className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
															{children}
														</thead>
													),
													tbody: ({ children }) => (
														<tbody className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm divide-y divide-gray-200 dark:divide-gray-700">
															{children}
														</tbody>
													),
													tr: ({ children }) => (
														<tr className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all duration-200 backdrop-blur-sm">
															{children}
														</tr>
													),
													th: ({ children }) => (
														<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200/50 dark:border-gray-700/50 last:border-r-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
															{children}
														</th>
													),
													td: ({ children }) => (
														<td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200/30 dark:border-gray-700/30 last:border-r-0 backdrop-blur-sm">
															{children}
														</td>
													),

													// GitHub Flavored Markdown Extensions (with remark-gfm plugin)
													// Strikethrough
													del: ({ children }) => (
														<del className="line-through text-gray-500 dark:text-gray-400">
															{children}
														</del>
													),

													// Task List Items
													input: ({ type, checked, disabled }) => (
														<input
															type={type}
															checked={checked}
															disabled={disabled}
															className="mr-2 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400"
														/>
													),

													// Dividers and semantic elements
													section: ({ children }) => (
														<section className="mb-4">{children}</section>
													),
													article: ({ children }) => (
														<article className="mb-4">{children}</article>
													),
													aside: ({ children }) => (
														<aside className="mb-4 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
															{children}
														</aside>
													),
													footer: ({ children }) => (
														<footer className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
															{children}
														</footer>
													),

													// Definition Lists (if supported by plugins)
													dl: ({ children }) => (
														<dl className="mb-4 space-y-2">{children}</dl>
													),
													dt: ({ children }) => (
														<dt className="font-semibold text-gray-900 dark:text-gray-100">
															{children}
														</dt>
													),
													dd: ({ children }) => (
														<dd className="ml-4 text-gray-700 dark:text-gray-300">
															{children}
														</dd>
													),

													// Figures and captions
													figure: ({ children }) => (
														<figure className="mb-4 text-center">
															{children}
														</figure>
													),
													figcaption: ({ children }) => (
														<figcaption className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
															{children}
														</figcaption>
													),

													// Inline elements
													mark: ({ children }) => (
														<mark className="bg-yellow-200 dark:bg-yellow-800 px-1 py-0.5 rounded">
															{children}
														</mark>
													),
													small: ({ children }) => (
														<small className="text-xs text-gray-600 dark:text-gray-400">
															{children}
														</small>
													),
													sub: ({ children }) => (
														<sub className="text-xs">{children}</sub>
													),
													sup: ({ children }) => (
														<sup className="text-xs">{children}</sup>
													),

													// Keyboard and sample text
													kbd: ({ children }) => (
														<kbd className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 text-xs font-mono shadow-sm">
															{children}
														</kbd>
													),
													samp: ({ children }) => (
														<samp className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">
															{children}
														</samp>
													),
													var: ({ children }) => (
														<var className="font-mono italic text-blue-600 dark:text-blue-400">
															{children}
														</var>
													),

													// Abbreviations
													abbr: ({ children, title }) => (
														<abbr
															title={title}
															className="border-b border-dotted border-gray-400 dark:border-gray-500 cursor-help"
														>
															{children}
														</abbr>
													),

													// Time elements
													time: ({ children, dateTime }) => (
														<time
															dateTime={dateTime}
															className="text-gray-700 dark:text-gray-300"
														>
															{children}
														</time>
													),
												}}
											>
												{message.content}
											</ReactMarkdown>
										</div>
									</div>

									{/* Enhanced timestamp */}
									<p
										className={`text-xs text-gray-500 dark:text-gray-400 px-2 ${
											message.role === "user" ? "text-right" : "text-left"
										}`}
									>
										{format(message.timestamp, "h:mm a")}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
				{isLoading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex justify-start"
					>
						<div className="flex gap-3 max-w-[85%]">
							<div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600 flex items-center justify-center text-white shadow-lg">
								<Bot className="w-5 h-5" />
							</div>
							<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
								<div className="flex items-center gap-2">
									<Loader2 className="w-4 h-4 animate-spin text-gray-600 dark:text-gray-300" />
									<span className="text-sm text-gray-600 dark:text-gray-300">
										AI is thinking...
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Enhanced Input Form */}
			<form
				onSubmit={handleSubmit}
				className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
			>
				<div className="flex gap-3 items-start">
					<div className="flex-1 relative">
						<textarea
							ref={inputRef}
							value={input}
							onChange={(e) => handleInputChange(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Ask me about budgeting, investing, saving..."
							className="w-full resize-none rounded-2xl border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-3 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 shadow-sm"
							rows={1}
							disabled={isLoading}
							style={{ minHeight: "48px", maxHeight: "120px" }}
						/>
						{/* Character count indicator */}
						{input.length > 0 && (
							<div className="absolute bottom-2 right-3 text-xs text-gray-400 dark:text-gray-500">
								{input.length}
							</div>
						)}
					</div>

					<div className="flex-shrink-0">
						<RippleButton
							type="submit"
							disabled={!input.trim() || isLoading}
							className="rounded-2xl p-3 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 micro-button shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
							rippleColor="rgba(255, 255, 255, 0.4)"
							style={{ height: "48px", width: "48px" }}
						>
							<motion.div
								animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
								transition={
									isLoading
										? { duration: 1, repeat: Infinity, ease: "linear" }
										: {}
								}
							>
								{isLoading ? (
									<Loader2 className="w-5 h-5" />
								) : (
									<Send className="w-5 h-5 icon-morph" />
								)}
							</motion.div>
						</RippleButton>
					</div>
				</div>

				{/* Input hints */}
				<div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
					<span>Press Enter to send, Shift+Enter for new line</span>
					<span className="flex items-center gap-1">
						<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
						AI Ready
					</span>
				</div>
			</form>
		</div>
	);
}
