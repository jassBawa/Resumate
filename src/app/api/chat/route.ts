import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import {
  getCoverLetterSystemPrompt,
  getDefaultSystemPrompt,
  getResumeSystemPrompt,
} from '@/config/prompts';

export async function POST(request: Request) {
  try {
    const { message, conversationHistory, resumeText } = await request.json();

    if (!resumeText || !message) {
      return NextResponse.json(
        { error: 'Fields are missing' },
        { status: 400 }
      );
    }

    let systemPrompt = getDefaultSystemPrompt();
    const userPrompt = `Here is the resume content for context:\n\n${resumeText}`;
    let commandInstruction = '';
    const isModify = message.startsWith('/modify');
    const isCoverLetter = message.startsWith('/cover-letter');

    if (isModify) {
      systemPrompt = getResumeSystemPrompt();
      commandInstruction = `
        ${message}
        Return a JSON object with:
        {
          "response": "Short summary message",
          "parsedResume": { ...parsed content... }
        }
      `;
    } else if (isCoverLetter) {
      systemPrompt = getCoverLetterSystemPrompt();
      commandInstruction = `
        ${message}
        Return a JSON object with:
        {
          "response": "Tailored cover letter as a string"
        }
      `;
    } else {
      commandInstruction = `
        ${message}
        Return a JSON object with:
        {
          "response": "Answer as a string"
        }
      `;
    }

    console.log(commandInstruction, userPrompt);
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
      ...conversationHistory,
      { role: 'user', content: commandInstruction },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }
    console.log(responseContent);
    const parsed = JSON.parse(responseContent);

    return NextResponse.json({
      response: parsed.response,
      parsedSections: parsed.parsedResume || undefined,
    });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
