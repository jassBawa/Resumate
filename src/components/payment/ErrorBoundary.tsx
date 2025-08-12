import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PaymentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Payment Error Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/20">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Payment System Error
          </h3>

          <p className="mb-6 max-w-md text-sm text-gray-600 dark:text-gray-400">
            Something went wrong with the payment system. Please try again or contact support if the
            problem persists.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={this.handleRetry}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              onClick={() => (window.location.href = 'mailto:support@resumate.com')}
              size="sm"
            >
              Contact Support
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 max-w-md">
              <summary className="cursor-pointer text-xs text-gray-500">
                Error Details (Development)
              </summary>
              <pre className="mt-2 overflow-auto text-left text-xs text-red-600">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
