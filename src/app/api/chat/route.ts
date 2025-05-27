import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import {
  getCoverLetterSystemPrompt,
  getDefaultSystemPrompt,
  getResumeSystemPrompt,
} from '@/config/prompts';

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
    // Destructure the JSON payload (sectionId)
    const { message, conversationHistory, resumeText } = await request.json();

    let systemPrompt = getDefaultSystemPrompt();
    const userContent = `Here is the resume content for context:\n\n${resumeText}`;
    let postMessage = '';

    if (message.startsWith('/modify')) {
      systemPrompt = getResumeSystemPrompt();
      postMessage = `
        ${message}
        
        Please return a structured JSON object with two top-level keys:

        1. "response" – A short, friendly, human-like message summarizing or introducing the results.
        2. "resume" – The full <parsedResume>...</parsedResume> block exactly as defined by the system prompt.
      `.trim();
    } else if (message.startsWith('/cover-letter')) {
      systemPrompt = getCoverLetterSystemPrompt();
      postMessage = `
        ${message}

        Please return a JSON object with one key:
        {
          "coverLetter": "Your personalized cover letter goes here."
        }
      `.trim();
    } else {
      // Default resume Q&A
      systemPrompt = getDefaultSystemPrompt();
      postMessage = message;
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
      ...conversationHistory,
      { role: 'user', content: postMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      stream: false, // For simplicity; you could enable streaming for real-time responses.
    });

    const responseContent = completion.choices[0].message.content;

    return NextResponse.json({ response: responseContent });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
