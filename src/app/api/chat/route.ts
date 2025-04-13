import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { getResumeSystemPrompt } from '@/config/prompts';

/**
 * POST /api/chat
 *
 * Expected JSON body:
 * {
 *   "message": "User's latest input",
 *   "conversationHistory": [ { "role": "user", "content": "..." }, { "role": "assistant", "content": "..." } ],
 *   "resumeText": "The full or snippet resume text..."
 * }
 */
export async function POST(request: Request) {
  try {
    // Destructure the JSON payload
    const { message, conversationHistory, resumeText } = await request.json();
    console.log(message, conversationHistory, resumeText);

    // Get the system prompt that defines how resumes should be processed.
    const systemPrompt = getResumeSystemPrompt();

    const messages = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Here is the resume content for context:\n\n${resumeText}`,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: `
    ${message}
    
    Please return a structured JSON object with two top-level keys:
    
    1. "response" – A short, friendly, human-like message summarizing or introducing the results.
    2. "resume" – The full <parsedResume>...</parsedResume> block exactly as defined by the system prompt.
    
    Do NOT reuse the example text verbatim. Generate your own natural and helpful message in the "response" field.
    
    Example format (your message should be different):
    {
      "response": "Here’s your updated resume breakdown! Let me know if you'd like to tweak anything.",
      "resume": "<parsedResume>...</parsedResume>"
    }
        `.trim(),
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      stream: false, // For simplicity; you could enable streaming for real-time responses.
    });

    const responseContent = completion.choices[0].message.content;
    console.log(responseContent);

    return NextResponse.json({ response: responseContent });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
