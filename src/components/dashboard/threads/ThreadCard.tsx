import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Thread {
  id: string;
  title: string;
  createdAt: string;
}

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Card className="group relative overflow-hidden border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-[#353945] dark:bg-[#23272f]/60">
      {/* Gradient accent line */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-sm">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="line-clamp-1 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {thread.title || 'Untitled Resume'}
              </CardTitle>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">AI-Powered Resume</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {thread.title ? `Resume for ${thread.title}` : 'Your professional resume'}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Click to edit and optimize your resume
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            <span>
              Last updated{' '}
              {formatDistanceToNow(new Date(thread.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          asChild
          className="w-full bg-gray-900 text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <Link href={`/thread/${thread.id}`}>
            <span className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              Open Resume
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
