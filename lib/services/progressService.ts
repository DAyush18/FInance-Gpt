/**
 * Learning Progress Tracking Service
 * Manages user progress across different learning modules
 */

export interface ModuleProgress {
  moduleId: string;
  completedSections: string[];
  questionsAsked: number;
  timeSpent: number; // in minutes
  lastAccessed: Date;
  completed: boolean;
}

export interface UserProgress {
  modules: { [moduleId: string]: ModuleProgress };
  totalQuestionsAsked: number;
  totalTimeSpent: number;
  lastUpdated: Date;
}

class ProgressService {
  private readonly STORAGE_KEY = 'financeGPT_user_progress';
  private progress: UserProgress;

  constructor() {
    this.progress = this.loadProgress();
  }

  /**
   * Load progress from localStorage or initialize default
   */
  private loadProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress();
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate the parsed data structure
        if (parsed && typeof parsed === 'object' && parsed.modules && parsed.lastUpdated) {
          // Convert date strings back to Date objects
          parsed.lastUpdated = new Date(parsed.lastUpdated);
          if (parsed.modules && typeof parsed.modules === 'object') {
            Object.values(parsed.modules).forEach((module: unknown) => {
              const typedModule = module as ModuleProgress;
              if (typedModule && typedModule.lastAccessed) {
                typedModule.lastAccessed = new Date(typedModule.lastAccessed);
              }
            });
          }
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
      // Clear corrupted data
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }

    return this.getDefaultProgress();
  }

  /**
   * Save progress to localStorage
   */
  private saveProgress(): void {
    if (typeof window === 'undefined') return;

    try {
      this.progress.lastUpdated = new Date();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progress));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
  }

  /**
   * Get default progress structure
   */
  private getDefaultProgress(): UserProgress {
    return {
      modules: {},
      totalQuestionsAsked: 0,
      totalTimeSpent: 0,
      lastUpdated: new Date(),
    };
  }

  /**
   * Get or create module progress
   */
  private getModuleProgress(moduleId: string): ModuleProgress {
    if (!this.progress.modules[moduleId]) {
      this.progress.modules[moduleId] = {
        moduleId,
        completedSections: [],
        questionsAsked: 0,
        timeSpent: 0,
        lastAccessed: new Date(),
        completed: false,
      };
    }
    return this.progress.modules[moduleId];
  }

  /**
   * Record that user accessed a module
   */
  recordModuleAccess(moduleId: string): void {
    const moduleProgress = this.getModuleProgress(moduleId);
    moduleProgress.lastAccessed = new Date();
    this.saveProgress();
  }

  /**
   * Record that user asked a question in a module
   */
  recordQuestionAsked(moduleId: string): void {
    const moduleProgress = this.getModuleProgress(moduleId);
    moduleProgress.questionsAsked++;
    this.progress.totalQuestionsAsked++;
    this.saveProgress();
  }

  /**
   * Record time spent in a module
   */
  recordTimeSpent(moduleId: string, minutes: number): void {
    const moduleProgress = this.getModuleProgress(moduleId);
    moduleProgress.timeSpent += minutes;
    this.progress.totalTimeSpent += minutes;
    this.saveProgress();
  }

  /**
   * Mark a section as completed
   */
  markSectionCompleted(moduleId: string, sectionId: string): void {
    const moduleProgress = this.getModuleProgress(moduleId);
    if (!moduleProgress.completedSections.includes(sectionId)) {
      moduleProgress.completedSections.push(sectionId);
      this.saveProgress();
    }
  }

  /**
   * Mark a section as incomplete
   */
  markSectionIncomplete(moduleId: string, sectionId: string): void {
    const moduleProgress = this.getModuleProgress(moduleId);
    moduleProgress.completedSections = moduleProgress.completedSections.filter(
      id => id !== sectionId
    );
    this.saveProgress();
  }

  /**
   * Calculate progress percentage for a module
   */
  calculateModuleProgress(moduleId: string, totalSections: number = 4): number {
    const moduleProgress = this.getModuleProgress(moduleId);
    
    // Base progress factors
    const sectionWeight = 60; // 60% for completed sections
    const engagementWeight = 30; // 30% for questions asked
    const timeWeight = 10; // 10% for time spent

    // Section completion progress (0-60%)
    const sectionProgress = Math.min(
      (moduleProgress.completedSections.length / totalSections) * sectionWeight,
      sectionWeight
    );

    // Engagement progress (0-30%) - caps at 10 questions for full score
    const engagementProgress = Math.min(
      (moduleProgress.questionsAsked / 10) * engagementWeight,
      engagementWeight
    );

    // Time progress (0-10%) - caps at 30 minutes for full score
    const timeProgress = Math.min(
      (moduleProgress.timeSpent / 30) * timeWeight,
      timeWeight
    );

    const totalProgress = Math.min(
      Math.round(sectionProgress + engagementProgress + timeProgress),
      100
    );

    // Update completion status
    if (totalProgress >= 80) {
      moduleProgress.completed = true;
      this.saveProgress();
    }

    return totalProgress;
  }

  /**
   * Get module progress data
   */
  getModuleProgressData(moduleId: string): ModuleProgress {
    return this.getModuleProgress(moduleId);
  }

  /**
   * Get all progress data
   */
  getAllProgress(): UserProgress {
    return { ...this.progress };
  }

  /**
   * Check if a section is completed
   */
  isSectionCompleted(moduleId: string, sectionId: string): boolean {
    const moduleProgress = this.getModuleProgress(moduleId);
    return moduleProgress.completedSections.includes(sectionId);
  }

  /**
   * Get completed sections for a module
   */
  getCompletedSections(moduleId: string): string[] {
    const moduleProgress = this.getModuleProgress(moduleId);
    return [...moduleProgress.completedSections];
  }

  /**
   * Reset progress for a specific module
   */
  resetModuleProgress(moduleId: string): void {
    if (this.progress.modules[moduleId]) {
      const oldProgress = this.progress.modules[moduleId];
      this.progress.totalQuestionsAsked -= oldProgress.questionsAsked;
      this.progress.totalTimeSpent -= oldProgress.timeSpent;
      delete this.progress.modules[moduleId];
      this.saveProgress();
    }
  }

  /**
   * Reset all progress
   */
  resetAllProgress(): void {
    this.progress = this.getDefaultProgress();
    this.saveProgress();
  }

  /**
   * Export progress data for backup
   */
  exportProgress(): string {
    return JSON.stringify(this.progress, null, 2);
  }

  /**
   * Import progress data from backup
   */
  importProgress(progressData: string): boolean {
    try {
      const imported = JSON.parse(progressData);
      // Validate structure
      if (imported.modules && typeof imported.totalQuestionsAsked === 'number') {
        // Convert date strings back to Date objects
        imported.lastUpdated = new Date(imported.lastUpdated);
        Object.values(imported.modules).forEach((module: unknown) => {
          const typedModule = module as ModuleProgress;
          typedModule.lastAccessed = new Date(typedModule.lastAccessed);
        });
        
        this.progress = imported;
        this.saveProgress();
        return true;
      }
    } catch (error) {
      console.error('Failed to import progress:', error);
    }
    return false;
  }
}

// Create singleton instance
export const progressService = new ProgressService();
