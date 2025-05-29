import { getSectionResumePrompt } from '@/config/prompts';
import openai from '@/lib/openai';
import { NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export async function POST(request: Request) {
  try {
    const {
      message,
      resumeText,
      sectionId,
      conversationHistory,
    }: {
      message: string;
      conversationHistory: { role: 'user' | 'assistant'; content: string }[];
      resumeText: string;
      sectionId: string;
    } = await request.json();
    console.log('resumeText', resumeText);

    if (!message || !sectionId || !resumeText || !conversationHistory) {
      return NextResponse.json(
        { error: 'Missing required fields: message, sectionId, or resumeText' },
        { status: 400 }
      );
    }

    const systemPrompt = getSectionResumePrompt();

    const userContext = `Here is the resume content for context:\n\n${resumeText}`;
    const sectionMessage = `
    ${message}

    Please return a structured JSON for this section only:
    
{
    "response" – A short, friendly, human-like message summarizing or introducing the results.
    "${sectionId}" – <${sectionId}>...</${sectionId}>
    
}
    `.trim();

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContext },
      ...conversationHistory,
      { role: 'user', content: sectionMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    });
    const response = completion.choices[0].message.content;
    if (!response) {
      return;
    }
    const parsed = JSON.parse(response);

    return NextResponse.json({
      response: parsed.response,
      section: parsed[sectionId],
    });
  } catch (error: any) {
    console.error('Error in /api/chat/modify-section:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
