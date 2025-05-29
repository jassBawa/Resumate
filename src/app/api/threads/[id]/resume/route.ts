import { NextResponse } from 'next/server';
import {
  parseAndStoreResume,
  updateResumeSections,
} from '@/services/resume.services';

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

    const { thread, currentVersionId } = await parseAndStoreResume(threadId);

    return NextResponse.json({
      threadData: {
        isSharable: thread.isSharable,
        publicId: thread.publicId,
        viewerCount: thread.viewerCount,
        title: thread.title,
        resumeText: thread.resumeText,
        currentVersionId: currentVersionId,
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
    const { sections, title } = body;

    if (!sections || typeof sections !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing resume sections' },
        { status: 400 }
      );
    }

    const { updatedAt, skipped } = await updateResumeSections(
      threadId,
      sections,
      title
    );

    return NextResponse.json({
      success: true,
      skipped,
      data: { updatedAt },
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
