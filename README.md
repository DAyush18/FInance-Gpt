# FinanceGPT 🚀

A cutting-edge AI-powered financial education platform built with Next.js 15, TypeScript, and Google's Gemini AI. FinanceGPT transforms complex financial concepts into accessible, interactive learning experiences through intelligent tutoring, dynamic visualizations, and personalized guidance.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Pro-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Edge Runtime](https://img.shields.io/badge/Edge_Runtime-Enabled-success?style=flat-square)](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict_Mode-success?style=flat-square)](https://www.typescriptlang.org/tsconfig#strict)

## ✨ Features

### 🤖 AI-Powered Learning Experience

- **Intelligent Chat Interface**: Get personalized financial advice powered by Google's Gemini 2.5 Pro AI
- **Context-Aware Tutoring**: AI adapts responses based on current learning module and user progress
- **Interactive Q&A**: Real-time responses with educational context and practical examples
- **Topic-Specific Guidance**: Specialized AI prompts for different financial domains

### 📚 Comprehensive Learning Modules

- **Budgeting Basics**: Master the 50/30/20 rule, expense tracking, and emergency fund strategies
- **Investing 101**: Understand stocks, bonds, index funds, and the power of compound interest
- **Smart Saving**: High-yield accounts, automatic saving, and goal-based strategies
- **Debt Management**: Debt snowball vs avalanche methods, credit score improvement
- **Retirement Planning**: 401(k), IRA fundamentals, and Social Security optimization
- **Financial Goals**: Strategic planning, SMART goals, and achievement tracking

### 📊 Interactive Financial Visualizations

- **Compound Interest Calculator**: Watch investments grow with dynamic charts and projections
- **Dynamic Budget Dashboard**: Real-time budget tracking with category breakdowns and insights
- **Advanced Loan Calculator**: Compare loan options, amortization schedules, and payment strategies
- **Retirement Planning Tools**: Visualize savings trajectory and retirement readiness

### 🎨 Modern User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices with fluid layouts
- **Dark Mode Support**: Automatic theme detection with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for delightful, performance-optimized interactions
- **Progress Tracking**: Comprehensive learning analytics and achievement system
- **Error Boundaries**: Robust error handling with graceful fallbacks

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15.4.1](https://nextjs.org)** - React framework with App Router, Turbopack, and edge runtime
- **[React 19.1.0](https://react.dev)** - Modern React with concurrent features and improved hooks
- **[TypeScript 5.8.3](https://www.typescriptlang.org)** - Full type safety with strict mode enabled

### Styling & UI

- **[Tailwind CSS 4.1.11](https://tailwindcss.com)** - Utility-first CSS framework with custom design system
- **[Framer Motion 12.23.6](https://www.framer.com/motion/)** - Production-ready motion library for animations
- **[Lucide React](https://lucide.dev)** - Beautiful, consistent icon library with 1000+ icons

### AI & Backend

- **[Google Gemini 2.5 Pro](https://ai.google.dev)** - Advanced language model for financial guidance
- **[Alpha Vantage API](https://www.alphavantage.co)** - Real-time financial market data integration
- **Edge Runtime** - Optimized serverless functions for low latency

### Data Visualization

- **[Recharts 3.1.0](https://recharts.org)** - Composable charting library built on D3
- **Dynamic Imports** - Code splitting for optimal performance
- **Custom Chart Components** - Specialized financial calculators and visualizations

### Content & Utilities

- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Rich text rendering with GitHub Flavored Markdown
- **[date-fns](https://date-fns.org)** - Modern date utility library
- **LocalStorage Integration** - Persistent progress tracking and user preferences

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or later
- **npm**, **yarn**, or **bun** package manager
- **Google Gemini API Key** (for AI features)
- **Alpha Vantage API Key** (optional, for market data)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Divyesh-5981/financeGPT.git
   cd financeGPT
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Required - Get from https://aistudio.google.com/app/apikey
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

   # Optional - Get from https://www.alphavantage.co/support/#api-key
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or with Turbopack (faster)
   npm run dev --turbo
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check linting without fixes
npm run type-check   # TypeScript type checking
npm run analyze      # Bundle analyzer
npm run clean        # Clean build artifacts
```

## 📱 Usage Guide

### Getting Started

1. **Explore the Homepage**: Overview of features and learning paths
2. **Try AI Chat**: Ask financial questions and receive personalized guidance
3. **Browse Learning Modules**: Choose topics based on your knowledge level
4. **Use Interactive Tools**: Experiment with calculators and visualizations
5. **Track Progress**: Monitor your learning journey and achievements

### Learning Paths

- **Beginner Path**: Budgeting Basics → Smart Saving → Basic Investing
- **Intermediate Path**: Debt Management → Advanced Investing → Goal Setting
- **Advanced Path**: Retirement Planning → Tax Optimization → Estate Planning

### AI Chat Examples

```
"How do I create my first emergency fund?"
"What's the difference between Roth IRA and Traditional IRA?"
"Should I pay off debt or invest my extra money?"
"How much house can I afford with my income?"
"What's a good asset allocation for my age?"
```

### Interactive Tools

- **Compound Interest Calculator**: Model investment growth over time
- **Budget Dashboard**: Track income, expenses, and savings goals
- **Loan Comparison Tool**: Compare mortgages, auto loans, and personal loans
- **Retirement Planner**: Estimate retirement needs and savings requirements

## 🏗️ Project Architecture

```
financeGPT/
├── app/                           # Next.js App Router (Next.js 15)
│   ├── api/                       # API routes with Edge Runtime
│   │   ├── chat/                  # AI chat endpoints
│   │   └── alpha-vantage/         # Financial data endpoints
│   ├── chat/                      # AI chat interface
│   ├── learn/                     # Learning modules
│   │   └── [module]/              # Dynamic module routes
│   ├── visualizations/            # Interactive financial tools
│   ├── globals.css                # Global styles and Tailwind imports
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Homepage
│   ├── icon.tsx                   # Dynamic app icon
│   └── favicon.ico.tsx            # Dynamic favicon
├── components/                    # Reusable React components
│   ├── chat/                      # Chat interface components
│   │   └── ChatInterface.tsx      # Main chat component
│   ├── ui/                        # UI primitives and utilities
│   │   ├── ErrorBoundary.tsx      # Error handling component
│   │   ├── NavigationLink.tsx     # Enhanced navigation
│   │   ├── NoSSR.tsx             # Client-side only wrapper
│   │   ├── PageTransition.tsx     # Page transition animations
│   │   ├── RippleButton.tsx       # Interactive button component
│   │   └── RouteProgress.tsx      # Loading progress indicator
│   └── visualizations/            # Financial visualization components
│       ├── CompoundInterestChart.tsx    # Investment growth calculator
│       ├── InteractiveBudgetDashboard.tsx # Budget tracking tool
│       ├── LoanCalculator.tsx           # Loan comparison tool
│       └── RetirementCalculator.tsx     # Retirement planning tool
├── contexts/                      # React Context providers
│   ├── ClientProgressProvider.tsx # Client-side progress wrapper
│   └── ProgressContext.tsx        # Learning progress management
├── hooks/                         # Custom React hooks
│   ├── useNavigation.ts          # Enhanced navigation hook
│   └── useRipple.ts              # Ripple effect hook
├── lib/                          # Utilities and configurations
│   ├── gemini/                   # AI integration
│   │   ├── client.ts             # Gemini API client
│   │   ├── modulePrompts.ts      # Module-specific prompts
│   │   └── systemPrompt.ts       # Base system prompt
│   ├── services/                 # Business logic services
│   │   ├── budgetService.ts      # Budget calculations
│   │   └── progressService.ts    # Progress tracking
│   └── performance.ts            # Performance monitoring
├── public/                       # Static assets
│   ├── icons/                    # App icons (various sizes)
│   ├── favicon.ico               # Browser favicon
│   ├── manifest.json             # PWA manifest
│   └── robots.txt                # SEO robots file
├── .eslintrc.json               # ESLint configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🔧 Development

### Key Architecture Decisions

#### AI Integration

- **Gemini 2.5 Pro**: Latest AI model for enhanced financial reasoning
- **Context-Aware Prompts**: Different prompts for each learning module
- **Conversation History**: Maintains context across chat sessions
- **Error Handling**: Graceful fallbacks for API failures

#### Performance Optimizations

- **Edge Runtime**: API routes run on edge for lower latency
- **Dynamic Imports**: Code splitting for visualization components
- **Bundle Analysis**: Optimized package imports for smaller bundles
- **Image Optimization**: Next.js Image component with WebP/AVIF support

#### State Management

- **React Context**: Global progress tracking and user preferences
- **LocalStorage**: Persistent data without external dependencies
- **Custom Hooks**: Reusable logic for navigation and interactions

#### Error Handling

- **Error Boundaries**: Component-level error catching with recovery
- **TypeScript Strict Mode**: Compile-time error prevention
- **ESLint Rules**: Strict linting for code quality
- **Graceful Degradation**: Fallbacks for failed API calls

### Component Architecture

#### Layout System

```tsx
// Root layout with providers and error boundaries
RootLayout
├── ErrorBoundary          # Global error handling
├── ClientProgressProvider # Progress tracking
├── NoSSR                  # Hydration safety
└── RouteProgress         # Loading states
```

#### Page Structure

```tsx
// Typical page structure
Page
├── Navigation            # Back/forward controls
├── Header               # Page title and description
├── Content              # Main page content
├── Interactive Elements # Charts, forms, etc.
└── Footer              # Additional navigation
```

#### AI Chat System

```tsx
// Chat interface architecture
ChatInterface
├── MessageHistory       # Previous conversations
├── InputArea           # User message input
├── TypingIndicator     # AI response loading
└── QuickActions        # Suggested questions
```

### Styling System

#### Design Tokens

```css
/* Custom Tailwind theme extensions */
colors: {
  finance: {
    primary: '#4F46E5',    /* Indigo */
    secondary: '#7C3AED',  /* Purple */
    success: '#10B981',    /* Emerald */
    warning: '#F59E0B',    /* Amber */
    danger: '#EF4444'      /* Red */
  }
}
```

#### Animation Patterns

- **Page Transitions**: Smooth enter/exit animations
- **Micro-interactions**: Button hover effects and loading states
- **Data Visualization**: Animated chart transitions
- **Progress Indicators**: Visual feedback for user actions

## 🔒 Security & Privacy

### Data Protection

- **No User Authentication**: No personal data collection or storage
- **Local Storage Only**: Progress tracking stored locally on device
- **API Key Security**: Environment variables for sensitive keys
- **Edge Runtime**: Reduced attack surface with serverless functions

### AI Safety

- **Content Filtering**: Financial advice comes with appropriate disclaimers
- **Scope Limitation**: AI responses focused on educational content
- **Error Boundaries**: Graceful handling of AI service failures
- **Rate Limiting**: Built-in protection against API abuse

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel with one command
npx vercel --prod

# Environment variables
GOOGLE_GEMINI_API_KEY=your_key_here
ALPHA_VANTAGE_API_KEY=your_key_here
```

### Other Platforms

- **Netlify**: Full compatibility with edge functions
- **Railway**: Node.js deployment with persistent storage
- **Cloudflare Pages**: Edge runtime support with Workers
- **AWS Amplify**: Full-stack deployment with CI/CD

### Build Optimization

```bash
# Production build with analysis
npm run build
npm run analyze

# Performance checks
npm run type-check
npm run lint:check
```

## 📊 Performance Metrics

### Core Web Vitals

- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8s

### Bundle Size Analysis

```
Route                    Size      First Load JS
├ ○ /                   7.53 kB    149 kB
├ ○ /chat              3.11 kB    209 kB
├ ○ /learn             7.3 kB     148 kB
├ ƒ /learn/[module]    6.89 kB    212 kB
└ ○ /visualizations    5.47 kB    147 kB

○ Static    # Statically generated
ƒ Dynamic   # Server-rendered on demand
```

### Optimization Features

- **Dynamic Imports**: Lazy loading of heavy components
- **Image Optimization**: WebP/AVIF with responsive sizing
- **Edge Runtime**: Reduced cold start times
- **Bundle Splitting**: Optimal chunk sizes for caching

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Create feature branch**: `git checkout -b feature/your-feature`
4. **Start development**: `npm run dev`
5. **Make changes** and test thoroughly
6. **Submit pull request** with detailed description

### Code Standards

- **TypeScript**: Strict mode with full type coverage
- **ESLint**: Extended rules for Next.js and TypeScript
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Clear, descriptive commit messages

### Areas for Contribution

- **New Learning Modules**: Additional financial topics
- **Visualization Components**: More interactive tools
- **AI Prompt Engineering**: Enhanced AI responses
- **Accessibility**: WCAG compliance improvements
- **Performance**: Bundle size and loading optimizations
- **Testing**: Unit and integration tests
- **Documentation**: Code comments and guides

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### AI & APIs

- **Google Gemini AI** - Advanced language model for intelligent tutoring
- **Alpha Vantage** - Real-time financial market data
- **Vercel** - Deployment platform and edge runtime

### Open Source Libraries

- **Next.js Team** - React framework and development tools
- **Tailwind Labs** - Utility-first CSS framework
- **Framer** - Motion library for beautiful animations
- **Recharts** - React charting library built on D3
- **Lucide** - Beautiful icon library

### Design Inspiration

- Modern fintech applications
- Educational platforms
- AI-powered learning tools

## 📞 Support & Contact

### Get Help

- 📧 **Email**: [divyeshkumbhani8@gmail.com](mailto:divyeshkumbhani8@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Divyesh-5981/financeGPT/issues)
- � **Discussions**: [GitHub Discussions](https://github.com/Divyesh-5981/financeGPT/discussions)

### Documentation

- **API Reference**: `/docs/api` (coming soon)
- **Component Library**: `/docs/components` (coming soon)
- **Deployment Guide**: `/docs/deployment` (coming soon)

## 🔮 Roadmap

### Version 2.0 (Q3 2025)

- [ ] **Multi-language Support** - Spanish, French, German translations
- [ ] **Personal Finance Tracking** - Bank account integration (read-only)
- [ ] **Advanced AI Models** - Custom financial reasoning models
- [ ] **Certification System** - Complete courses and earn certificates
- [ ] **Community Features** - Forums and peer learning

### Version 2.1 (Q4 2025)

- [ ] **Mobile Apps** - Native iOS and Android applications
- [ ] **Offline Mode** - Core functionality without internet
- [ ] **Advanced Analytics** - Detailed learning insights
- [ ] **Custom Learning Paths** - Personalized curriculum
- [ ] **Integration APIs** - Third-party app connections

### Version 3.0 (2026)

- [ ] **Real Portfolio Tracking** - Investment account integration
- [ ] **Financial Planning Tools** - Tax optimization and estate planning
- [ ] **AI Financial Advisor** - Personalized investment recommendations
- [ ] **Marketplace** - Third-party financial tools and services

---

<div align="center">

**Made with ❤️ for financial education and empowerment**

[⭐ Star this repo](https://github.com/Divyesh-5981/financeGPT) if you find it helpful!

**Built with Next.js 15 • TypeScript • Google Gemini AI • Tailwind CSS**

</div>
