"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";
import {
	progressService,
	ModuleProgress,
	UserProgress,
} from "@/lib/services/progressService";

interface ProgressContextType {
	// Progress data
	userProgress: UserProgress;
	getModuleProgress: (moduleId: string) => number;
	getModuleData: (moduleId: string) => ModuleProgress;

	// Actions
	recordModuleAccess: (moduleId: string) => void;
	recordQuestionAsked: (moduleId: string) => void;
	recordTimeSpent: (moduleId: string, minutes: number) => void;
	markSectionCompleted: (moduleId: string, sectionId: string) => void;
	markSectionIncomplete: (moduleId: string, sectionId: string) => void;
	isSectionCompleted: (moduleId: string, sectionId: string) => boolean;

	// Utility
	refreshProgress: () => void;
	resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
	undefined
);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
	// Initialize with default empty state for SSR consistency
	const [userProgress, setUserProgress] = useState<UserProgress>({
		modules: {},
		lastUpdated: new Date(),
		totalQuestionsAsked: 0,
		totalTimeSpent: 0,
	});
	const [timeTrackers, setTimeTrackers] = useState<{
		[moduleId: string]: number;
	}>({});
	const [isClient, setIsClient] = useState(false);

	// Set client flag after mount and load actual progress
	useEffect(() => {
		setIsClient(true);
		// Load progress on client side only after hydration
		setUserProgress(progressService.getAllProgress());
	}, []);

	// Refresh progress data
	const refreshProgress = useCallback(() => {
		setUserProgress(progressService.getAllProgress());
	}, []);

	// Record module access
	const recordModuleAccess = useCallback(
		(moduleId: string) => {
			progressService.recordModuleAccess(moduleId);

			// Start time tracking for this module
			const now = Date.now();
			setTimeTrackers((prev) => ({ ...prev, [moduleId]: now }));

			refreshProgress();
		},
		[refreshProgress]
	);

	// Record question asked
	const recordQuestionAsked = useCallback(
		(moduleId: string) => {
			progressService.recordQuestionAsked(moduleId);
			refreshProgress();
		},
		[refreshProgress]
	);

	// Record time spent
	const recordTimeSpent = useCallback(
		(moduleId: string, minutes: number) => {
			progressService.recordTimeSpent(moduleId, minutes);
			refreshProgress();
		},
		[refreshProgress]
	);

	// Mark section completed
	const markSectionCompleted = useCallback(
		(moduleId: string, sectionId: string) => {
			progressService.markSectionCompleted(moduleId, sectionId);
			refreshProgress();
		},
		[refreshProgress]
	);

	// Mark section incomplete
	const markSectionIncomplete = useCallback(
		(moduleId: string, sectionId: string) => {
			progressService.markSectionIncomplete(moduleId, sectionId);
			refreshProgress();
		},
		[refreshProgress]
	);

	// Check if section is completed
	const isSectionCompleted = useCallback(
		(moduleId: string, sectionId: string) => {
			return progressService.isSectionCompleted(moduleId, sectionId);
		},
		[]
	);

	// Get module progress percentage
	const getModuleProgress = useCallback(
		(moduleId: string) => {
			if (!isClient) return 0;
			return progressService.calculateModuleProgress(moduleId);
		},
		[isClient]
	);

	// Get module data
	const getModuleData = useCallback(
		(moduleId: string) => {
			if (!isClient) {
				return {
					moduleId,
					questionsAsked: 0,
					timeSpent: 0,
					sectionsCompleted: [],
					completedSections: [],
					completed: false,
					lastAccessed: new Date(),
				};
			}
			return progressService.getModuleProgressData(moduleId);
		},
		[isClient]
	);

	// Reset all progress
	const resetProgress = useCallback(() => {
		progressService.resetAllProgress();
		setTimeTrackers({});
		refreshProgress();
	}, [refreshProgress]);

	// Track time spent when component unmounts or module changes
	useEffect(() => {
		const handleBeforeUnload = () => {
			// Record time spent for all active modules
			Object.entries(timeTrackers).forEach(([moduleId, startTime]) => {
				const timeSpent = Math.max(
					1,
					Math.round((Date.now() - startTime) / 60000)
				); // Convert to minutes
				progressService.recordTimeSpent(moduleId, timeSpent);
			});
		};

		const handleVisibilityChange = () => {
			if (document.hidden) {
				// Page is hidden, record time spent
				Object.entries(timeTrackers).forEach(([moduleId, startTime]) => {
					const timeSpent = Math.max(
						1,
						Math.round((Date.now() - startTime) / 60000)
					);
					progressService.recordTimeSpent(moduleId, timeSpent);
				});
				setTimeTrackers({});
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Periodic time tracking (every 5 minutes)
		const interval = setInterval(() => {
			Object.entries(timeTrackers).forEach(([moduleId, startTime]) => {
				const timeSpent = Math.round((Date.now() - startTime) / 60000);
				if (timeSpent >= 5) {
					// Record every 5 minutes
					progressService.recordTimeSpent(moduleId, 5);
					setTimeTrackers((prev) => ({ ...prev, [moduleId]: Date.now() }));
					refreshProgress();
				}
			});
		}, 5 * 60 * 1000); // 5 minutes

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			clearInterval(interval);

			// Record final time spent
			Object.entries(timeTrackers).forEach(([moduleId, startTime]) => {
				const timeSpent = Math.max(
					1,
					Math.round((Date.now() - startTime) / 60000)
				);
				progressService.recordTimeSpent(moduleId, timeSpent);
			});
		};
	}, [timeTrackers, refreshProgress]);

	const value: ProgressContextType = {
		userProgress,
		getModuleProgress,
		getModuleData,
		recordModuleAccess,
		recordQuestionAsked,
		recordTimeSpent,
		markSectionCompleted,
		markSectionIncomplete,
		isSectionCompleted,
		refreshProgress,
		resetProgress,
	};

	return (
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	);
}

export function useProgress(): ProgressContextType {
	const context = useContext(ProgressContext);
	if (context === undefined) {
		throw new Error("useProgress must be used within a ProgressProvider");
	}
	return context;
}
