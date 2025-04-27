import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { getResumeSystemPrompt } from '@/config/prompts';
import { ENV_CONFIG } from '@/config/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is required' },
        { status: 400 }
      );
    }

    const threadData = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!threadData || !threadData.fileId) {
      return NextResponse.json(
        { error: 'No file found for this thread' },
        { status: 404 }
      );
    }

    if (threadData.resumeText) {
      // If resumeText is already stored, return it
      return NextResponse.json({ response: threadData.resumeText });
    }

    const fileContent = await openai.vectorStores.files.content(
      ENV_CONFIG.OPENAI_VECTOR_STORE_ID,
      threadData.fileId
    );

    if (!fileContent) {
      return NextResponse.json(
        { error: 'Could not retrieve file content' },
        { status: 404 }
      );
    }

    const textContent = fileContent.data.map((item) => item.text).join('\n');

    // Use OpenAI to extract and structure the sections
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: getResumeSystemPrompt(),
        },
        {
          role: 'user',
          content: textContent,
        },
      ],
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Store the parsed resume text in the database
   await prisma.thread.update({
      where: { id: threadData.id },
      data: { resumeText: response },
    });

    return NextResponse.json({response: response });
  } catch (error) {
    console.error('Error retrieving resume sections:', error);
    return NextResponse.json(
      { error: 'Error retrieving resume sections' },
      { status: 500 }
    );
  }
}