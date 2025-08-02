"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Uncaught error:", error, errorInfo);
	}

	private handleReset = (): void => {
		this.setState({ hasError: false, error: undefined });
	};

	public render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
					<div className="max-w-md mx-auto text-center p-6">
						<div className="w-16 h-16 mx-auto mb-4 text-red-500">
							<AlertTriangle className="w-full h-full" />
						</div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
							Something went wrong
						</h1>
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							We encountered an unexpected error. Please try again.
						</p>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<pre className="text-xs text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 overflow-auto">
								{this.state.error.message}
							</pre>
						)}
						<button
							onClick={this.handleReset}
							className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<RefreshCw className="w-4 h-4" />
							Try Again
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
