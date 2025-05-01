import type React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const ResumeSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-sm">
      {/* Header/Personal Info */}
      <div className="space-y-5 relative">
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
        <Skeleton className="h-12 w-3/4 bg-gradient-to-r from-purple-300/70 to-pink-300/70 dark:from-purple-700/40 dark:to-pink-700/40 rounded-lg animate-pulse" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-6 w-36 bg-gradient-to-r from-blue-300/60 to-cyan-300/60 dark:from-blue-700/30 dark:to-cyan-700/30 rounded-md animate-pulse" />
          <Skeleton className="h-6 w-44 bg-gradient-to-r from-blue-300/60 to-cyan-300/60 dark:from-blue-700/30 dark:to-cyan-700/30 rounded-md animate-pulse" />
          <Skeleton className="h-6 w-40 bg-gradient-to-r from-blue-300/60 to-cyan-300/60 dark:from-blue-700/30 dark:to-cyan-700/30 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Summary */}
      <Card className="p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="space-y-3">
          <Skeleton className="h-7 w-40 bg-gradient-to-r from-emerald-300/70 to-teal-300/70 dark:from-emerald-700/40 dark:to-teal-700/40 rounded-md animate-pulse" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-slate-200/80 dark:bg-slate-700/50 rounded animate-pulse" />
            <Skeleton className="h-4 w-full bg-slate-200/80 dark:bg-slate-700/50 rounded animate-pulse" />
            <Skeleton className="h-4 w-5/6 bg-slate-200/80 dark:bg-slate-700/50 rounded animate-pulse" />
          </div>
        </div>
      </Card>

      {/* Experience */}
      <Card className="p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="space-y-5">
          <Skeleton className="h-7 w-44 bg-gradient-to-r from-amber-300/70 to-orange-300/70 dark:from-amber-700/40 dark:to-orange-700/40 rounded-md animate-pulse" />

          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`exp-${i}`}
              className="space-y-3 p-4 border-l-2 border-amber-200 dark:border-amber-800 pl-4 relative"
            >
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-amber-300 dark:bg-amber-600" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-52 bg-gradient-to-r from-amber-200/90 to-orange-200/90 dark:from-amber-800/60 dark:to-orange-800/60 rounded-md animate-pulse" />
                <Skeleton className="h-5 w-36 bg-slate-200/70 dark:bg-slate-700/40 rounded animate-pulse" />
              </div>
              <Skeleton className="h-5 w-44 bg-slate-200/80 dark:bg-slate-700/50 rounded animate-pulse" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-slate-200/60 dark:bg-slate-700/30 rounded animate-pulse" />
                <Skeleton className="h-4 w-full bg-slate-200/60 dark:bg-slate-700/30 rounded animate-pulse" />
                <Skeleton className="h-4 w-3/4 bg-slate-200/60 dark:bg-slate-700/30 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card className="p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="space-y-4">
          <Skeleton className="h-7 w-36 bg-gradient-to-r from-violet-300/70 to-indigo-300/70 dark:from-violet-700/40 dark:to-indigo-700/40 rounded-md animate-pulse" />
          <div className="space-y-3 p-4 border-l-2 border-violet-200 dark:border-violet-800 pl-4 relative">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-violet-300 dark:bg-violet-600" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-56 bg-gradient-to-r from-violet-200/90 to-indigo-200/90 dark:from-violet-800/60 dark:to-indigo-800/60 rounded-md animate-pulse" />
              <Skeleton className="h-5 w-36 bg-slate-200/70 dark:bg-slate-700/40 rounded animate-pulse" />
            </div>
            <Skeleton className="h-5 w-44 bg-slate-200/80 dark:bg-slate-700/50 rounded animate-pulse" />
            <Skeleton className="h-4 w-3/4 bg-slate-200/60 dark:bg-slate-700/30 rounded animate-pulse" />
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="space-y-4">
          <Skeleton className="h-7 w-28 bg-gradient-to-r from-cyan-300/70 to-sky-300/70 dark:from-cyan-700/40 dark:to-sky-700/40 rounded-md animate-pulse" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={`skill-${i}`}
                className={`h-8 ${
                  i % 3 === 0 ? 'w-24' : i % 3 === 1 ? 'w-20' : 'w-28'
                } 
                  bg-gradient-to-r from-cyan-200/80 to-sky-200/80 
                  dark:from-cyan-800/50 dark:to-sky-800/50 
                  rounded-full animate-pulse`}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Projects or Certifications */}
      <Card className="p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="space-y-5">
          <Skeleton className="h-7 w-36 bg-gradient-to-r from-green-300/70 to-emerald-300/70 dark:from-green-700/40 dark:to-emerald-700/40 rounded-md animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={`proj-${i}`}
                className="space-y-3 p-4 border border-green-100 dark:border-green-900/50 rounded-lg"
              >
                <Skeleton className="h-6 w-3/4 bg-gradient-to-r from-green-200/90 to-emerald-200/90 dark:from-green-800/60 dark:to-emerald-800/60 rounded-md animate-pulse" />
                <Skeleton className="h-4 w-full bg-slate-200/60 dark:bg-slate-700/30 rounded animate-pulse" />
                <Skeleton className="h-4 w-5/6 bg-slate-200/60 dark:bg-slate-700/30 rounded animate-pulse" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-6 w-16 bg-slate-200/70 dark:bg-slate-700/40 rounded-full animate-pulse" />
                  <Skeleton className="h-6 w-16 bg-slate-200/70 dark:bg-slate-700/40 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
