import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { MessageSquare } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <span className="font-bold text-xl">Resume Agent</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
