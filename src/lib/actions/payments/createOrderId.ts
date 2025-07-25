'use server';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { Orders } from 'razorpay/dist/types/orders';

export const createOrderId = async () => {
  try {
    const response = await fetchWithAuth('/api/payments/create-order', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data } = await response.json();
    return { data: data as Orders.RazorpayOrder, success: true };
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    return { error: 'Failed to create order', success: false, data: null };
  }
};
