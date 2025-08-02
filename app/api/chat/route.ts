import { NextRequest, NextResponse } from 'next/server'
import { generateFinancialResponse } from '@/lib/gemini/client'

// Enable edge runtime for better performance
export const runtime = 'edge'

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { message, history, topic } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      )
    }

    // Convert chat history format
    const conversationHistory = history?.map((msg: ChatMessage) => ({
      role: msg.role === 'user' ? 'User' : 'Assistant',
      content: msg.content,
    })) || []

    // Generate AI response with topic context
    const response = await generateFinancialResponse(message, conversationHistory, topic)

    if (!response.success) {
      return NextResponse.json(
        { error: response.error || 'Failed to generate response' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: response.message })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
