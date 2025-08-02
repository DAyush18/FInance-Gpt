import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RouteProgress from "@/components/ui/RouteProgress";
import { ClientProgressProvider } from "@/contexts/ClientProgressProvider";
import NoSSR from "@/components/ui/NoSSR";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FinanceGPT - Your AI Financial Learning Companion",
	description:
		"Learn personal finance through interactive AI-powered conversations with visual aids and personalized learning paths.",
	keywords: [
		"finance",
		"education",
		"AI",
		"personal finance",
		"investing",
		"budgeting",
	],
	authors: [{ name: "FinanceGPT Team" }],
	manifest: "/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon.png", sizes: "32x32", type: "image/png" },
			{ url: "/icon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
			{ url: "/icon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		apple: [
			{ url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
		],
		shortcut: "/favicon.ico",
	},
	openGraph: {
		title: "FinanceGPT - Your AI Financial Learning Companion",
		description:
			"Learn personal finance through interactive AI-powered conversations",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head suppressHydrationWarning>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<ErrorBoundary>
					<ClientProgressProvider>
						<NoSSR>
							<RouteProgress />
						</NoSSR>
						<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
							{children}
						</div>
					</ClientProgressProvider>
				</ErrorBoundary>
			</body>
		</html>
	);
}
