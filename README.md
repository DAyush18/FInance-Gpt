# FinanceGPT 🚀

An AI-powered financial education platform built with Next.js 15 and Google Gemini AI. Learn personal finance through interactive conversations, visualizations, and structured learning modules.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## ✨ Features

### 🤖 AI-Powered Learning

- **Interactive Chat**: AI tutor powered by Google Gemini 2.5 Pro
- **Context-Aware Responses**: Personalized guidance based on current learning module
- **Educational Focus**: Financial concepts explained in simple terms

### 📚 Learning Modules

- **Budgeting Basics**: 50/30/20 rule, expense tracking, emergency funds
- **Investing 101**: Stocks, bonds, index funds, compound interest
- **Smart Saving**: High-yield accounts, goal-based strategies
- **Debt Management**: Debt snowball/avalanche methods
- **Retirement Planning**: 401(k), IRA, Social Security
- **Financial Goals**: SMART goals and achievement tracking

### 📊 Interactive Tools

- **Compound Interest Calculator**: Investment growth visualizations
- **Budget Dashboard**: Expense tracking and insights
- **Loan Calculator**: Payment comparisons and amortization
- **Retirement Calculator**: Savings trajectory planning

### 🎨 User Experience

- **Responsive Design**: Works on all devices
- **Dark Mode**: Automatic theme detection
- **Progress Tracking**: Learning analytics and achievements
- **Smooth Animations**: Powered by Framer Motion

## 🛠️ Tech Stack

- **[Next.js 15.4.1](https://nextjs.org)** - React framework with App Router and edge runtime
- **[React 19.1.0](https://react.dev)** - Modern React with concurrent features
- **[TypeScript 5.8.3](https://www.typescriptlang.org)** - Full type safety
- **[Tailwind CSS 4.1.11](https://tailwindcss.com)** - Utility-first CSS framework
- **[Google Gemini 2.5 Pro](https://ai.google.dev)** - AI language model for financial guidance
- **[Framer Motion 12.23.6](https://www.framer.com/motion/)** - Animation library
- **[Recharts 3.1.0](https://recharts.org)** - Data visualization
- **[Lucide React](https://lucide.dev)** - Icon library

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or bun package manager
- Google Gemini API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Divyesh-5981/financeGPT.git
   cd financeGPT
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📁 Project Structure

```
app/
├── api/                    # API routes (Edge Runtime)
│   ├── chat/              # AI chat endpoints
│   └── alpha-vantage/     # Financial data API
├── chat/                  # AI chat interface
├── learn/                 # Learning modules
│   └── [module]/         # Dynamic module pages
├── visualizations/        # Interactive financial tools
└── page.tsx              # Homepage

components/
├── chat/                 # Chat interface
├── ui/                   # Reusable UI components
└── visualizations/       # Financial calculators

lib/
├── gemini/               # AI integration
│   ├── client.ts        # Gemini API client
│   ├── systemPrompt.ts  # AI system prompt
│   └── modulePrompts.ts # Module-specific prompts
└── services/            # Business logic
    ├── progressService.ts # Learning progress
    └── budgetService.ts   # Budget calculations
```

## 🎯 Usage

### AI Chat

- Ask questions about personal finance
- Get context-aware responses based on current module
- Educational content with simple explanations

### Learning Modules

1. Navigate to `/learn` to see all modules
2. Select a module (budgeting, investing, etc.)
3. Use the integrated chat for topic-specific guidance
4. Progress is tracked locally in your browser

### Interactive Tools

- `/visualizations` - Access all financial calculators
- Compound interest calculator with dynamic charts
- Budget dashboard for expense tracking
- Loan calculator for payment comparisons
- Retirement planning tools

## 🔧 Environment Variables

```env
# Required for AI chat functionality
GEMINI_API_KEY=your_gemini_api_key_here

# Optional for market data features
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
```

Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 📝 License

ISC License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For major changes, please open an issue first to discuss your ideas.

---

<div align="center">

**Built with Next.js 15 • TypeScript • Google Gemini AI • Tailwind CSS**

[⭐ Star this repo](https://github.com/Divyesh-5981/financeGPT) if you find it helpful!

</div>
