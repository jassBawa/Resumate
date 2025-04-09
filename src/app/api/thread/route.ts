import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get the most recent thread for this user
    const thread = await prisma.thread.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!thread) {
      return NextResponse.json({ thread: null });
    }

    return NextResponse.json({ thread });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json(
      { error: 'Error fetching thread' },
      { status: 500 }
    );
  }
} 