import { NextRequest, NextResponse } from 'next/server';

// Enable edge runtime for better performance
export const runtime = 'edge'

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
}

interface MarketNews {
  title: string;
  url: string;
  summary: string;
  source: string;
  category: string;
  sentiment: string;
  relevanceScore: number;
}

interface EconomicIndicator {
  name: string;
  value: number;
  unit: string;
  date: string;
  change: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const function_type = searchParams.get('function');
  const symbol = searchParams.get('symbol');

  if (!ALPHA_VANTAGE_API_KEY) {
    return NextResponse.json(
      { error: 'Alpha Vantage API key not configured' },
      { status: 500 }
    );
  }

  try {
    switch (function_type) {
      case 'GLOBAL_QUOTE':
        return await getStockQuote(symbol || 'AAPL');
      
      case 'TOP_GAINERS_LOSERS':
        return await getTopGainersLosers();
      
      case 'NEWS_SENTIMENT':
        return await getMarketNews();
      
      case 'REAL_GDP':
        return await getEconomicIndicators();
      
      case 'SECTOR_PERFORMANCE':
        return await getSectorPerformance();
      
      default:
        return await getMarketOverview();
    }
  } catch (error) {
    console.error('Alpha Vantage API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}

async function getStockQuote(symbol: string): Promise<NextResponse> {
  const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    // Return demo data if API limit reached or error
    const demoData: StockData = {
      symbol: symbol,
      price: 150.00 + Math.random() * 50,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
    };
    demoData.changePercent = (demoData.change / demoData.price) * 100;
    
    return NextResponse.json(demoData);
  }

  const quote = data['Global Quote'];
  const stockData: StockData = {
    symbol: quote['01. symbol'],
    price: parseFloat(quote['05. price']),
    change: parseFloat(quote['09. change']),
    changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
  };

  return NextResponse.json(stockData);
}

async function getTopGainersLosers(): Promise<NextResponse> {
  const url = `${BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    // Return demo data
    const demoData = {
      top_gainers: [
        { ticker: 'NVDA', price: '875.00', change_amount: '45.23', change_percentage: '5.45%' },
        { ticker: 'TSLA', price: '185.50', change_amount: '8.75', change_percentage: '4.95%' },
        { ticker: 'AMZN', price: '145.30', change_amount: '6.20', change_percentage: '4.46%' },
      ],
      top_losers: [
        { ticker: 'META', price: '485.20', change_amount: '-12.45', change_percentage: '-2.50%' },
        { ticker: 'GOOGL', price: '142.15', change_amount: '-5.85', change_percentage: '-3.95%' },
        { ticker: 'AAPL', price: '195.75', change_amount: '-4.25', change_percentage: '-2.13%' },
      ]
    };
    return NextResponse.json(demoData);
  }

  return NextResponse.json(data);
}

async function getMarketNews(): Promise<NextResponse> {
  const url = `${BASE_URL}?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    // Return demo news data
    const demoNews: MarketNews[] = [
      {
        title: 'Federal Reserve Signals Potential Rate Cuts',
        url: '#',
        summary: 'The Federal Reserve indicated potential interest rate adjustments in response to economic indicators.',
        source: 'Financial Times',
        category: 'monetary_policy',
        sentiment: 'positive',
        relevanceScore: 0.85
      },
      {
        title: 'Tech Stocks Rally on AI Developments',
        url: '#',
        summary: 'Major technology companies see significant gains as AI adoption accelerates across industries.',
        source: 'Bloomberg',
        category: 'technology',
        sentiment: 'positive',
        relevanceScore: 0.78
      },
      {
        title: 'Energy Sector Faces Volatility',
        url: '#',
        summary: 'Oil prices fluctuate amid geopolitical tensions and changing demand patterns.',
        source: 'Reuters',
        category: 'energy',
        sentiment: 'neutral',
        relevanceScore: 0.65
      }
    ];
    return NextResponse.json({ feed: demoNews });
  }

  return NextResponse.json(data);
}

async function getEconomicIndicators(): Promise<NextResponse> {
  // Demo economic indicators since Alpha Vantage economic data requires premium
  const demoIndicators: EconomicIndicator[] = [
    {
      name: 'GDP Growth Rate',
      value: 2.4,
      unit: '%',
      date: '2024-Q3',
      change: 0.3
    },
    {
      name: 'Unemployment Rate',
      value: 3.7,
      unit: '%',
      date: '2024-12',
      change: -0.1
    },
    {
      name: 'Inflation Rate',
      value: 3.2,
      unit: '%',
      date: '2024-12',
      change: -0.2
    },
    {
      name: 'Federal Funds Rate',
      value: 5.25,
      unit: '%',
      date: '2024-12',
      change: 0.0
    }
  ];

  return NextResponse.json({ indicators: demoIndicators });
}

async function getSectorPerformance(): Promise<NextResponse> {
  const url = `${BASE_URL}?function=SECTOR&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data['Error Message'] || data['Note']) {
    // Return demo sector data
    const demoSectors = {
      'Rank A: Real-Time Performance': {
        'Information Technology': '2.45%',
        'Health Care': '1.87%',
        'Financials': '0.95%',
        'Consumer Discretionary': '0.73%',
        'Communication Services': '0.42%',
        'Industrials': '0.31%',
        'Materials': '-0.15%',
        'Energy': '-0.67%',
        'Utilities': '-0.89%',
        'Real Estate': '-1.23%',
        'Consumer Staples': '-1.45%'
      }
    };
    return NextResponse.json(demoSectors);
  }

  return NextResponse.json(data);
}

async function getMarketOverview(): Promise<NextResponse> {
  // Fetch multiple data points for a comprehensive overview
  const [stockData, sectorData, newsData] = await Promise.allSettled([
    getTopGainersLosers(),
    getSectorPerformance(),
    getMarketNews()
  ]);

  const overview = {
    timestamp: new Date().toISOString(),
    market_status: 'Open', // Simplified - could be enhanced with actual market hours
    topGainersLosers: stockData.status === 'fulfilled' ? await stockData.value.json() : null,
    sectorPerformance: sectorData.status === 'fulfilled' ? await sectorData.value.json() : null,
    news: newsData.status === 'fulfilled' ? await newsData.value.json() : null,
  };

  return NextResponse.json(overview);
}
