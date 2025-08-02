export interface BudgetCategory {
  id: string;
  name: string;
  value: number;
  percentage: number;
  color: string;
  bgColor: string;
  borderColor: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  description: string;
  recommendations: string[];
}

export interface BudgetData {
  totalBudget: number;
  totalSpent: number;
  categories: BudgetCategory[];
  healthScore: number;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
    savings: number;
  }>;
  savingsGoal: {
    target: number;
    current: number;
    timeline: string;
  };
}

export interface SpendingInsight {
  category: string;
  insight: string;
  type: 'warning' | 'success' | 'info';
  action?: string;
}

class BudgetService {
  private budgetData: BudgetData = {
    totalBudget: 0, // Will be calculated dynamically
    totalSpent: 0, // Will be calculated dynamically
    categories: [
      {
        id: 'housing',
        name: 'Housing',
        value: 1500,
        percentage: 35,
        color: '#4F46E5',
        bgColor: 'from-blue-500/10 to-indigo-500/5',
        borderColor: 'border-blue-200 dark:border-blue-700/50',
        target: 1400,
        trend: 'up',
        trendValue: 5.2,
        description: 'Rent, utilities, and maintenance costs',
        recommendations: [
          'Consider refinancing your mortgage for better rates',
          'Look into energy-efficient upgrades to reduce utility costs'
        ]
      },
      {
        id: 'food',
        name: 'Food & Dining',
        value: 600,
        percentage: 14,
        color: '#7C3AED',
        bgColor: 'from-purple-500/10 to-violet-500/5',
        borderColor: 'border-purple-200 dark:border-purple-700/50',
        target: 550,
        trend: 'down',
        trendValue: -3.1,
        description: 'Groceries, restaurants, and meal delivery',
        recommendations: [
          'Try meal planning to reduce food waste',
          'Set a weekly dining out budget'
        ]
      },
      {
        id: 'transportation',
        name: 'Transportation',
        value: 400,
        percentage: 9,
        color: '#10B981',
        bgColor: 'from-green-500/10 to-emerald-500/5',
        borderColor: 'border-green-200 dark:border-green-700/50',
        target: 380,
        trend: 'stable',
        trendValue: 0.5,
        description: 'Car payments, gas, insurance, and maintenance',
        recommendations: [
          'Consider carpooling or public transport alternatives',
          'Regular maintenance can prevent costly repairs'
        ]
      },
      {
        id: 'utilities',
        name: 'Utilities',
        value: 200,
        percentage: 5,
        color: '#F59E0B',
        bgColor: 'from-amber-500/10 to-yellow-500/5',
        borderColor: 'border-amber-200 dark:border-amber-700/50',
        target: 180,
        trend: 'up',
        trendValue: 8.3,
        description: 'Electricity, water, gas, internet, and phone',
        recommendations: [
          'Switch to LED bulbs to reduce electricity costs',
          'Review and negotiate your internet and phone plans'
        ]
      },
      {
        id: 'entertainment',
        name: 'Entertainment',
        value: 300,
        percentage: 7,
        color: '#EF4444',
        bgColor: 'from-red-500/10 to-rose-500/5',
        borderColor: 'border-red-200 dark:border-red-700/50',
        target: 250,
        trend: 'up',
        trendValue: 12.5,
        description: 'Movies, subscriptions, hobbies, and leisure activities',
        recommendations: [
          'Audit your subscription services and cancel unused ones',
          'Look for free entertainment alternatives in your area'
        ]
      },
      {
        id: 'savings',
        name: 'Savings & Investments',
        value: 500,
        percentage: 12,
        color: '#06B6D4',
        bgColor: 'from-cyan-500/10 to-teal-500/5',
        borderColor: 'border-cyan-200 dark:border-cyan-700/50',
        target: 650,
        trend: 'down',
        trendValue: -15.2,
        description: '401k, emergency fund, and investment accounts',
        recommendations: [
          'Increase your 401k contribution to get full employer match',
          'Automate transfers to your savings account'
        ]
      },
      {
        id: 'healthcare',
        name: 'Healthcare',
        value: 250,
        percentage: 6,
        color: '#8B5CF6',
        bgColor: 'from-violet-500/10 to-purple-500/5',
        borderColor: 'border-violet-200 dark:border-violet-700/50',
        target: 200,
        trend: 'stable',
        trendValue: 1.2,
        description: 'Insurance premiums, medications, and medical expenses',
        recommendations: [
          'Use your HSA for tax-advantaged healthcare savings',
          'Consider preventive care to avoid larger medical costs'
        ]
      },
      {
        id: 'other',
        name: 'Miscellaneous',
        value: 550,
        percentage: 12,
        color: '#6B7280',
        bgColor: 'from-gray-500/10 to-slate-500/5',
        borderColor: 'border-gray-200 dark:border-gray-700/50',
        target: 400,
        trend: 'up',
        trendValue: 18.7,
        description: 'Shopping, gifts, personal care, and unexpected expenses',
        recommendations: [
          'Track miscellaneous expenses to identify patterns',
          'Set aside a specific amount for impulse purchases'
        ]
      }
    ],
    healthScore: 85,
    monthlyTrend: [
      { month: 'Jan', income: 4300, expenses: 3950, savings: 350 },
      { month: 'Feb', income: 4300, expenses: 3750, savings: 550 },
      { month: 'Mar', income: 4300, expenses: 3800, savings: 500 },
      { month: 'Apr', income: 4300, expenses: 3600, savings: 700 },
      { month: 'May', income: 4300, expenses: 3900, savings: 400 },
      { month: 'Jun', income: 4300, expenses: 3800, savings: 500 }
    ],
    savingsGoal: {
      target: 10000,
      current: 3200,
      timeline: '18 months'
    }
  };

  private listeners: Array<(data: BudgetData) => void> = [];

  constructor() {
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.budgetData.totalSpent = this.budgetData.categories.reduce((sum, category) => sum + category.value, 0);
    this.budgetData.totalBudget = this.budgetData.totalSpent + 500; // Add buffer for remaining budget
    
    // Recalculate percentages by creating new category objects
    this.budgetData.categories = this.budgetData.categories.map(category => ({
      ...category,
      percentage: Math.round((category.value / this.budgetData.totalBudget) * 100)
    }));
  }

  getBudgetData(): BudgetData {
    this.calculateTotals();
    return { ...this.budgetData };
  }

  updateCategoryBudget(categoryId: string, newValue: number): void {
    const categoryIndex = this.budgetData.categories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
      const category = this.budgetData.categories[categoryIndex];
      const oldValue = category.value;
      
      // Calculate trend based on change
      const changePercent = oldValue > 0 ? ((newValue - oldValue) / oldValue) * 100 : 0;
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (Math.abs(changePercent) >= 2) {
        trend = changePercent > 0 ? 'up' : 'down';
      }
      
      // Create updated category object
      const updatedCategory: BudgetCategory = {
        ...category,
        value: newValue,
        trend: trend,
        trendValue: Math.abs(changePercent)
      };
      
      // Replace the category in the array
      this.budgetData.categories[categoryIndex] = updatedCategory;
      
      // Recalculate totals and percentages
      this.calculateTotals();

      this.notifyListeners();
    }
  }

  getSpendingInsights(): SpendingInsight[] {
    const insights: SpendingInsight[] = [];

    this.budgetData.categories.forEach(category => {
      if (category.value > category.target) {
        const overspend = category.value - category.target;
        const percentage = ((overspend / category.target) * 100).toFixed(1);
        
        insights.push({
          category: category.name,
          insight: `You're spending ${percentage}% more than your target on ${category.name}`,
          type: 'warning',
          action: `Consider reducing ${category.name} spending by $${overspend}`
        });
      } else if (category.value < category.target * 0.8) {
        insights.push({
          category: category.name,
          insight: `Great job staying under budget for ${category.name}!`,
          type: 'success'
        });
      }
    });

    // Overall budget health
    if (this.budgetData.totalSpent > this.budgetData.totalBudget) {
      insights.push({
        category: 'Overall Budget',
        insight: 'You\'re over your total monthly budget',
        type: 'warning',
        action: 'Review categories where you can cut back'
      });
    }

    return insights;
  }

  simulateRealTimeUpdates(): void {
    setInterval(() => {
      // Simulate small fluctuations in spending
      this.budgetData.categories.forEach(category => {
        if (Math.random() < 0.3) { // 30% chance of update
          const fluctuation = (Math.random() - 0.5) * 50; // ±$25 variation
          const newValue = Math.max(0, category.value + fluctuation);
          this.updateCategoryBudget(category.id, Math.round(newValue));
        }
      });
    }, 10000); // Update every 10 seconds
  }

  subscribe(callback: (data: BudgetData) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getBudgetData()));
  }
}

export const budgetService = new BudgetService();
