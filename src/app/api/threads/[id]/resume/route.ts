import { NextResponse } from 'next/server';
import { parseAndStoreResume } from '@/services/resume.services';

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

    const { parsedResume, thread } = await parseAndStoreResume(threadId);

    return NextResponse.json({
      response: parsedResume,
      threadData: {
        isSharable: thread.isSharable,
        publicId: thread.publicId,
        viewerCount: thread.viewerCount,
        title: thread.title,
      },
    });
  } catch (error) {
    console.error('Resume parsing failed:', error);
    return NextResponse.json(
      { error: 'Error retrieving resume sections' },
      { status: 500 }
    );
  }
}
