import { NextResponse } from 'next/server';
import { parseAndStoreResume } from '@/services/resume.services';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is required' },
        { status: 400 }
      );
    }

    const { thread } = await parseAndStoreResume(threadId);

    return NextResponse.json({
      threadData: {
        isSharable: thread.isSharable,
        publicId: thread.publicId,
        viewerCount: thread.viewerCount,
        title: thread.title,
        resumeText: thread.resumeText,
      },
      parsedSections: thread.parsedSections,
    });
  } catch (error) {
    console.error('Resume parsing failed:', error);
    return NextResponse.json(
      { error: 'Error retrieving resume sections' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { sections } = body;

    if (!sections || typeof sections !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing resume sections' },
        { status: 400 }
      );
    }

    const updatedThread = await prisma.thread.update({
      where: { id: threadId },
      data: {
        parsedSections: sections,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: { updatedAt: updatedThread.updatedAt.toISOString() },
    });
  } catch (error) {
    console.error('PATCH /resume error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error || 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
