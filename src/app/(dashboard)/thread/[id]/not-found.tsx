import Link from 'next/link';
import { FileText, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#f6f8fa] via-white to-[#f0f4f8] p-6 dark:from-[#181a20] dark:via-[#1a1d26] dark:to-[#15171e]">
      <div className="relative w-full max-w-md">
        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl">
            <FileText className="h-12 w-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Resume Not Found
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            The resume you're looking for doesn't exist or may have been moved.
          </p>

          {/* CTA Buttons */}
          <div className="mb-8 space-y-4">
            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-gray-900 text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/80">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Need help? Check your dashboard for all available resume projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
