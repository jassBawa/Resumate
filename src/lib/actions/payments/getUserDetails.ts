'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export const getUserDetails = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: 'User not found' };
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return { user };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { error: 'Failed to fetch user details' };
  }
};
