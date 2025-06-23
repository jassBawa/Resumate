import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { ENV_CONFIG } from '@/config/config';

const ASSISTANT_ID = ENV_CONFIG.OPENAI_ASSISTANT_ID;

export async function POST(req: Request) {
  try {
    const { message, threadId } = await req.json();

    if (!message || !threadId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      return;
    }

    const openaiThreadId = thread.openaiThreadId as string;

    // Step 1: Add user message to the assistant thread
    await openai.beta.threads.messages.create(openaiThreadId, {
      role: 'user',
      content: message,
    });

    const run = await openai.beta.threads.runs.create(openaiThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    let status = run.status;
    let runResult = run;

    while (status === 'queued' || status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runResult = await openai.beta.threads.runs.retrieve(openaiThreadId, run.id);
      status = runResult.status;
    }

    if (status !== 'completed') {
      return NextResponse.json({ error: 'Assistant failed to complete' }, { status: 500 });
    }

    const messages = await openai.beta.threads.messages.list(openaiThreadId, { limit: 1 });
    const last = messages.data[0]?.content?.[0];

    if (!last || last.type !== 'text') {
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

    // // Step 5: Parse assistant response
    const contentRes = last.text.value.trim();

    const parsed = JSON.parse(contentRes);
    if (!parsed || typeof parsed !== 'object') {
      return NextResponse.json({ error: 'Failed to parse assistant response' }, { status: 500 });
    }

    const { type, content, data } = parsed;

    return NextResponse.json({ type, content, data });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
