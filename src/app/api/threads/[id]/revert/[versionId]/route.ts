import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { revertToVersion } from '@/services/resume.services';

// PATCH /api/resume/[threadId]/revert/[versionId]
export async function PATCH(
  req: Request,

  { params }: { params: Promise<{ versionId: string; id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id: threadId, versionId } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 401 }
      );
    }

    const result = await revertToVersion(threadId, versionId);

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Error reverting version:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
