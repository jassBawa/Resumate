import { useState, useEffect, useCallback } from 'react';

interface UseRazorpayScriptReturn {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useRazorpayScript(): UseRazorpayScriptReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkRazorpayAvailability = useCallback(() => {
    return typeof window !== 'undefined' && !!window.Razorpay;
  }, []);

  const reload = useCallback(() => {
    setIsLoaded(false);
    setIsLoading(true);
    setError(null);

    // Force reload by removing and re-adding the script
    const existingScript = document.getElementById('razorpay-checkout-js');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
    script.onerror = () => {
      setError('Failed to load Razorpay script');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Check if Razorpay is already available
    if (checkRazorpayAvailability()) {
      setIsLoaded(true);
      return;
    }

    setIsLoading(true);

    // Check periodically for Razorpay availability (fallback)
    const checkInterval = setInterval(() => {
      if (checkRazorpayAvailability()) {
        setIsLoaded(true);
        setIsLoading(false);
        clearInterval(checkInterval);
      }
    }, 500);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      if (!checkRazorpayAvailability()) {
        setError('Razorpay script failed to load within timeout');
        setIsLoading(false);
      }
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [checkRazorpayAvailability]);

  return {
    isLoaded,
    isLoading,
    error,
    reload,
  };
}
