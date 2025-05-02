import type React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const ResumeSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 bg-gray-200 dark:bg-gray-600 rounded-xl shadow-sm">
      {/* Header/Personal Info */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 bg-gray-400 dark:bg-gray-500 rounded-lg" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-6 w-36 bg-gray-400 dark:bg-gray-500 rounded-md" />
          <Skeleton className="h-6 w-44 bg-gray-400 dark:bg-gray-500 rounded-md" />
          <Skeleton className="h-6 w-40 bg-gray-400 dark:bg-gray-500 rounded-md" />
        </div>
      </div>

      {/* Summary */}
      <Card className="p-5 border border-gray-200 dark:border-gray-500">
        <div className="space-y-3">
          <Skeleton className="h-7 w-40 bg-gray-400 dark:bg-gray-500 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded" />
            <Skeleton className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded" />
            <Skeleton className="h-4 w-5/6 bg-gray-400 dark:bg-gray-500 rounded" />
          </div>
        </div>
      </Card>

      {/* Experience */}
      <Card className="p-5 border border-gray-200 dark:border-gray-500">
        <div className="space-y-5">
          <Skeleton className="h-7 w-44 bg-gray-400 dark:bg-gray-500 rounded-md" />

          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`exp-${i}`}
              className="space-y-3 p-4 border-l-2 border-gray-200 dark:border-gray-500 pl-4 relative"
            >
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-500" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-52 bg-gray-400 dark:bg-gray-500 rounded-md" />
                <Skeleton className="h-5 w-36 bg-gray-400 dark:bg-gray-500 rounded" />
              </div>
              <Skeleton className="h-5 w-44 bg-gray-400 dark:bg-gray-500 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded" />
                <Skeleton className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded" />
                <Skeleton className="h-4 w-3/4 bg-gray-400 dark:bg-gray-500 rounded" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card className="p-5 border border-gray-200 dark:border-gray-500">
        <div className="space-y-4">
          <Skeleton className="h-7 w-36 bg-gray-400 dark:bg-gray-500 rounded-md" />
          <div className="space-y-3 p-4 border-l-2 border-gray-200 dark:border-gray-500 pl-4 relative">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-500" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-56 bg-gray-400 dark:bg-gray-500 rounded-md" />
              <Skeleton className="h-5 w-36 bg-gray-400 dark:bg-gray-500 rounded" />
            </div>
            <Skeleton className="h-5 w-44 bg-gray-400 dark:bg-gray-500 rounded" />
            <Skeleton className="h-4 w-3/4 bg-gray-400 dark:bg-gray-500 rounded" />
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-5 border border-gray-200 dark:border-gray-500">
        <div className="space-y-4">
          <Skeleton className="h-7 w-28 bg-gray-400 dark:bg-gray-500 rounded-md" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={`skill-${i}`}
                className={`h-8 ${
                  i % 3 === 0 ? 'w-24' : i % 3 === 1 ? 'w-20' : 'w-28'
                } bg-gray-400 dark:bg-gray-500 rounded-full`}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Projects or Certifications */}
      <Card className="p-5 border border-gray-200 dark:border-gray-500">
        <div className="space-y-5">
          <Skeleton className="h-7 w-36 bg-gray-400 dark:bg-gray-500 rounded-md" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={`proj-${i}`}
                className="space-y-3 p-4 border border-gray-200 dark:border-gray-500 rounded-lg"
              >
                <Skeleton className="h-6 w-3/4 bg-gray-400 dark:bg-gray-500 rounded-md" />
                <Skeleton className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded" />
                <Skeleton className="h-4 w-5/6 bg-gray-400 dark:bg-gray-500 rounded" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full" />
                  <Skeleton className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
