import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log(payload)

    if (!payload || !payload.data) {
      console.error('Webhook Error: Invalid payload', payload);
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { id, email_addresses, first_name, last_name, username } = payload.data;

    if (!id) {
      console.error('Webhook Error: Missing Clerk user ID', payload.data);
      return NextResponse.json({ error: 'Missing Clerk user ID' }, { status: 400 });
    }

    const email = email_addresses?.[0]?.email_address;

    if (!email) {
      console.error('Webhook Error: Missing email address', payload.data);
      return NextResponse.json({ error: 'Missing email address' }, { status: 400 });
    }

    // Check if user already exists to make it idempotent
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (existingUser) {
      console.warn(`Webhook Notice: User already exists. Clerk ID: ${id}`);
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    // Create new user
    const createdUser = await prisma.user.create({
      data: {
        clerkId: id,
        email,
        name: `${first_name ?? ''} ${last_name ?? ''}`.trim() || username || 'Unknown',
      },
    });

    console.log(`Webhook Success: Created user with ID ${createdUser.id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook user creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function GET() {
  return Response.json({ message: 'Hello World!' })
}