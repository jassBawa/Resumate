import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.warn('Unauthorized access to /api/threads');
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      console.warn(`User not found. Clerk ID: ${userId}`);
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const threads = await prisma.thread.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
      include: {
        // Include related data if needed
      },
    });

    return NextResponse.json({ success: true, data: threads });
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: 'Not Unauthorized', sucess: false },
        { status: 401 }
      );

    const { title } = await request.json();

    // Find the user
    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!dbUser)
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );

    // Create empty thread first
    const thread = await prisma.thread.create({
      data: {
        title: title,
        userId: dbUser.id,
        fileId: '',
        resumeText: '',
        parsedSections: {},
      },
    });
    return NextResponse.json({ success: true, data: thread });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
