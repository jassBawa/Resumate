import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { FileText } from 'lucide-react';
import CustomDarkToggle from '../DarkToggle';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-[#353945] dark:bg-[#23272f]/95 dark:supports-[backdrop-filter]:bg-[#23272f]/60">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/dashboard" className="group flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm transition-all duration-200 group-hover:shadow-md">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              ResuMate
            </span>
            <span className="-mt-1 text-xs text-gray-500 dark:text-gray-400">
              Your AI-Powered Resume Wingman
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <CustomDarkToggle />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
