// Core subscription types
export interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  popular?: boolean;
  description?: string;
}

export interface SubscriptionModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: SubscriptionMode;
  onSuccess?: () => void;
  onCancel?: () => void;
  plan?: Plan;
}

export type SubscriptionMode = 'forced' | 'upgrade' | 'purchase';

export interface PaymentData {
  orderCreationId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  razorpayCustomerId?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
  retry: {
    enabled: boolean;
    max_count: number;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  razorpay_customer_id?: string;
}

export interface OrderResponse {
  success: boolean;
  data?: {
    id: string;
    amount: number;
    currency: string;
  };
  error?: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Error types
export class PaymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

export class RazorpayError extends Error {
  constructor(
    message: string,
    public razorpayError: any
  ) {
    super(message);
    this.name = 'RazorpayError';
  }
}
