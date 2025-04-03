import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import openai from '@/lib/openai';

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

    // Get messages from database
    const messages = await prisma.message.findMany({
      where: { threadId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Error fetching messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { threadId, message } = await request.json();

    if (!threadId || !message) {
      return NextResponse.json(
        { error: 'Thread ID and message are required' },
        { status: 400 }
      );
    }

    // Get thread from database
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 10, // Get last 10 messages for context
        },
      },
    });

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    // Create OpenAI thread if it doesn't exist
    let openaiThread;
    try {
      openaiThread = await openai.beta.threads.retrieve(threadId);
    } catch {
      // ideally it should not go here
      openaiThread = await openai.beta.threads.create();
    }

    // Add user message to OpenAI thread
    await openai.beta.threads.messages.create(openaiThread.id, {
      role: "user",
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(openaiThread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
    });

    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(openaiThread.id, run.id);
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(openaiThread.id, run.id);
    }

    if (runStatus.status === 'failed') {
      throw new Error('Assistant run failed');
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(openaiThread.id);
    const lastMessage = messages.data[0];
    const messageContent = lastMessage.content[0];
    
    if (messageContent.type !== 'text') {
      throw new Error('Unexpected message content type');
    }

    const assistantResponse = messageContent.text.value;

    // Store messages in database
    await prisma.message.createMany({
      data: [
        {
          threadId,
          role: 'user',
          content: message,
        },
        {
          threadId,
          role: 'assistant',
          content: assistantResponse,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: assistantResponse,
    });
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { error: 'Error processing message' },
      { status: 500 }
    );
  }
} 