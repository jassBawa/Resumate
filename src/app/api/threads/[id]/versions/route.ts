import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// GET /api/resume/[id]/versions
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id: threadId } = await params;

    if (!userId) {
      console.warn('Unauthorized access to /api/threads');
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 401 }
      );
    }
    const thread = await prisma.thread.findUnique({
      where: {
        id: threadId,
      },
    });

    if (!thread) {
      console.warn(`Thread not found. Thread ID: ${threadId}`);
      return NextResponse.json(
        { success: false, error: 'Thread not found' },
        { status: 404 }
      );
    }
    const versions = await prisma.resumeVersion.findMany({
      where: { threadId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, versions });
  } catch (error) {
    console.error('Error fetching resume versions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
