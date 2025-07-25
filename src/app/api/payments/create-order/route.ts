import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { razorpay } from '@/lib/clients/razorypay';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Define plan details
    const plan = {
      amount: 99 * 100,
      currency: 'INR',
    };

    // Generate a unique order ID
    const orderId = `order_${user.id}`;
    console.log(orderId);
    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: plan.currency,
      receipt: orderId,
      notes: {
        userId: user.id,
      },
    });
    console.log(order);

    await prisma.payment.create({
      data: {
        userId: user.id,
        razorpayOrderId: order.id,
        amount: plan.amount,
        currency: plan.currency,
        planType: 'pro',
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
