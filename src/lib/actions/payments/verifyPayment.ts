'use server';

import { fetchWithAuth } from '@/lib/fetchWithAuth';

interface VerifyPaymentData {
  orderCreationId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export const verifyPayment = async (data: VerifyPaymentData) => {
  try {
    const response = await fetchWithAuth('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return { data: responseData, success: true };
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    return { error: 'Failed to verify payment', success: false };
  }
};
