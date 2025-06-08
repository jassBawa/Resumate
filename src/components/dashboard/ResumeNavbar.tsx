import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { MessageSquare } from 'lucide-react';
import CustomDarkToggle from '../DarkToggle';

export default function ResumeNavbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center px-16">
        {/* todo: button for toggling sidebar on off */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <span className="text-xl font-bold">Resume Agent</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <CustomDarkToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
