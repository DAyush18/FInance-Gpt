import { GoogleGenerativeAI } from '@google/generative-ai'
import { SYSTEM_PROMPT } from './systemPrompt'
import { getModulePrompt, hasModulePrompt } from './modulePrompts'

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateFinancialResponse(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  topic?: string
) {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })

    // Choose the appropriate system prompt based on topic
    const systemPrompt = topic && hasModulePrompt(topic) ? getModulePrompt(topic) : SYSTEM_PROMPT

    // Add topic context to the prompt if provided
    const topicContext = topic ? `\n\n### CURRENT MODULE CONTEXT\nUser is in the "${topic}" learning module. Focus responses on this topic area and redirect off-topic questions appropriately.\n\n` : '\n\n'

    // Construct the full prompt with conversation history
    const fullPrompt = `${systemPrompt}${topicContext}Conversation History:\n${conversationHistory
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n')}\n\nUser: ${userMessage}\n\nAssistant:`

    // Generate response
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return {
      success: true,
      message: text,
    }
  } catch (error) {
    console.error('Error generating AI response:', error)
    return {
      success: false,
      message: 'I apologize, but I encountered an error. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Function to generate topic explanations
export async function explainFinancialTopic(topic: string, userLevel: string = 'beginner') {
  const levelPrompts = {
    beginner: 'Explain this as if I have no financial knowledge',
    intermediate: 'I understand basic financial concepts',
    advanced: 'I have good financial knowledge, give me detailed insights',
  }

  const prompt = `${SYSTEM_PROMPT}\n\nUser Level: ${levelPrompts[userLevel as keyof typeof levelPrompts] || levelPrompts.beginner}\n\nPlease explain the following financial topic: ${topic}\n\nProvide:
1. A clear definition
2. Why it's important
3. A simple example
4. Common misconceptions
5. Actionable first steps`

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error explaining topic:', error)
    return 'Unable to generate explanation at this time.'
  }
}
