import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is required' },
        { status: 400 }
      );
    }

    // Get the thread data to access the fileId
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    // Delete from OpenAI vector store
    if (thread.fileId) {
      try {
        await openai.vectorStores.files.del(
          process.env.OPENAI_VECTOR_STORE_ID!,
          thread.fileId
        );
      } catch (error) {
        console.error('Error deleting from vector store:', error);
      }

      // Delete the file from OpenAI
      try {
        await openai.files.del(thread.fileId);
      } catch (error) {
        console.error('Error deleting OpenAI file:', error);
      }
    }

    // Delete the thread from OpenAI
    await openai.beta.threads.del(threadId);

    // Delete the thread from our database
    await prisma.thread.delete({
      where: {
        id: threadId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Error deleting resume' },
      { status: 500 }
    );
  }
} 