import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import openai from '@/lib/openai';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: threadId } = await params;

    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Ensure thread belongs to the user
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser || thread.userId !== dbUser.id) {
      return NextResponse.json(
        { error: 'Thread not found or access denied' },
        { status: 403 }
      );
    }

    // Delete from OpenAI vector store & file store if fileId exists
    if (thread.fileId) {
      try {
        await openai.vectorStores.files.del(
          process.env.OPENAI_VECTOR_STORE_ID!,
          thread.fileId
        );
      } catch (error) {
        console.error('Error deleting from vector store:', error);
      }

      try {
        await openai.files.del(thread.fileId);
      } catch (error) {
        console.error('Error deleting OpenAI file:', error);
      }
    }

    // Update DB: remove resumeText and fileId
    await prisma.thread.update({
      where: { id: threadId },
      data: {
        fileId: '',
        resumeText: '',
      },
    });

    revalidateTag(`thread-${threadId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH /api/threads/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete resume content' },
      { status: 500 }
    );
  }
}
