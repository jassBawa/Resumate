import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { prisma } from '@/lib/prisma';

const ASSISTANT_ID = 'asst_NmnAT6X8r7W50310h1Mm56S2';

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
    // const openaiThread = await openai.beta.threads.create();
    // console.log(JSON);
    // const openaiThreadId = thread.openaiThreadId as string;
    // console.log(openaiThreadId);
    const openaiThreadId = 'thread_YCi6ThGpqyE9myCxK5obpMTi';
    // // Step 1: Add user message to the assistant thread
    // const result = await openai.beta.threads.messages.create(openaiThreadId, {
    //   role: 'user',
    //   content: message,
    // });

    // if(result.content[0].type);

    // // Step 2: Run the assistant
    const run = await openai.beta.threads.runs.create(openaiThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // // Step 3: Poll for completion
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

    // // Step 4: Fetch messages from the thread
    const messages = await openai.beta.threads.messages.list(openaiThreadId, { limit: 1 });
    const last = messages.data[0]?.content?.[0];
    console.log(message, last);

    if (!last || last.type !== 'text') {
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

    // // Step 5: Parse assistant response
    const contentRes = last.text.value.trim();
    const parsed = JSON.parse(contentRes);
    console.log(parsed);
    if (!parsed || typeof parsed !== 'object') {
      return NextResponse.json({ error: 'Failed to parse assistant response' }, { status: 500 });
    }

    const { type, content, parsedResume } = parsed;
    console.log(parsedResume);
    return NextResponse.json({ type, content, parsedResume });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
