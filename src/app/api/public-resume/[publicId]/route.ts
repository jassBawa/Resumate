import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await params;
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      );
    }

    const thread = await prisma.thread.findUnique({
      where: { publicId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!thread || !thread.isSharable) {
      return NextResponse.json(
        { success: false, error: 'This resume is not available for sharing' },
        { status: 404 }
      );
    }

    await prisma.thread.update({
      where: { publicId },
      data: { viewerCount: { increment: 1 } },
    });

    const { title, resumeText, createdAt, user } = thread;

    return NextResponse.json({
      success: true,
      data: {
        title,
        resumeText,
        name: user.name,
        createdAt,
        viewerCount: thread.viewerCount + 1,
        parsedSections: thread.parsedSections,
      },
    });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
