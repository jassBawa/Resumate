import type React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ShimmerSkeleton: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    {children || (
      <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
    )}
  </div>
);

export const ResumeSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl p-6 mx-auto space-y-6">
      {/* Loading Message */}
      <div className="relative overflow-hidden">
        <div className="p-6 border-2 border-blue-200 border-dashed bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 dark:border-blue-800 rounded-xl">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative">
              <div className="w-6 h-6 border-blue-500 rounded-full border-3 border-t-transparent animate-spin" />
              <div
                className="absolute inset-0 w-6 h-6 border-blue-300 rounded-full border-3 border-t-transparent animate-spin animate-reverse"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
            <span className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text">
              Converting your resume...
            </span>
          </div>
          <p className="text-sm text-center text-blue-600/80 dark:text-blue-400/80">
            This usually takes up to 1 minute • AI is analyzing your content
          </p>
        </div>
      </div>

      {/* Header/Personal Info */}
      <Card className="shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 border-slate-200 dark:border-zinc-700">
        <CardContent className="pt-8 pb-8">
          <div className="space-y-6">
            <div className="space-y-4 text-center">
              <ShimmerSkeleton className="h-12 mx-auto rounded-lg w-80">
                <div className="w-full h-full rounded-lg bg-gradient-to-r from-slate-400 to-slate-500 dark:from-zinc-600 dark:to-zinc-500" />
              </ShimmerSkeleton>
              <div className="flex flex-wrap justify-center gap-4">
                <ShimmerSkeleton className="w-40 h-6 rounded-full">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 dark:from-emerald-700 dark:to-emerald-600" />
                </ShimmerSkeleton>
                <ShimmerSkeleton className="w-48 h-6 rounded-full">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-300 to-blue-400 dark:from-blue-700 dark:to-blue-600" />
                </ShimmerSkeleton>
                <ShimmerSkeleton className="h-6 rounded-full w-36">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-300 to-purple-400 dark:from-purple-700 dark:to-purple-600" />
                </ShimmerSkeleton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card className="border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800">
        <CardHeader className="pb-4">
          <ShimmerSkeleton className="rounded-lg h-7 w-44">
            <div className="w-full h-full rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-500" />
          </ShimmerSkeleton>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ShimmerSkeleton className="w-full h-4 rounded">
              <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
            </ShimmerSkeleton>
            <ShimmerSkeleton className="w-full h-4 rounded">
              <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
            </ShimmerSkeleton>
            <ShimmerSkeleton className="w-4/5 h-4 rounded">
              <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
            </ShimmerSkeleton>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
        <CardHeader className="pb-4">
          <ShimmerSkeleton className="rounded-lg h-7 w-36">
            <div className="w-full h-full rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-500" />
          </ShimmerSkeleton>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`exp-${i}`} className="relative">
                {i > 0 && (
                  <Separator className="mb-8 bg-emerald-200 dark:bg-emerald-800" />
                )}
                <div className="relative pl-8">
                  <div className="absolute left-0 w-4 h-4 rounded-full shadow-lg top-2 bg-gradient-to-r from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-400" />
                  <div className="absolute left-2 top-6 w-0.5 h-20 bg-gradient-to-b from-emerald-300 to-transparent dark:from-emerald-700" />
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <ShimmerSkeleton className="h-6 rounded-lg w-52">
                        <div className="w-full h-full rounded-lg bg-gradient-to-r from-slate-400 to-slate-500 dark:from-zinc-600 dark:to-zinc-500" />
                      </ShimmerSkeleton>
                      <ShimmerSkeleton className="h-5 rounded-full w-36">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-300 to-red-400 dark:from-orange-700 dark:to-red-600" />
                      </ShimmerSkeleton>
                    </div>
                    <ShimmerSkeleton className="h-5 rounded w-44">
                      <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
                    </ShimmerSkeleton>
                    <div className="space-y-2">
                      <ShimmerSkeleton className="w-full h-4 rounded">
                        <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
                      </ShimmerSkeleton>
                      <ShimmerSkeleton className="w-full h-4 rounded">
                        <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
                      </ShimmerSkeleton>
                      <ShimmerSkeleton className="w-3/4 h-4 rounded">
                        <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
                      </ShimmerSkeleton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-800">
        <CardHeader className="pb-4">
          <ShimmerSkeleton className="w-32 rounded-lg h-7">
            <div className="w-full h-full rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-500" />
          </ShimmerSkeleton>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8">
            <div className="absolute left-0 w-4 h-4 rounded-full shadow-lg top-2 bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-400" />
            <div className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <ShimmerSkeleton className="h-6 rounded-lg w-60">
                  <div className="w-full h-full rounded-lg bg-gradient-to-r from-slate-400 to-slate-500 dark:from-zinc-600 dark:to-zinc-500" />
                </ShimmerSkeleton>
                <ShimmerSkeleton className="h-5 rounded-full w-36">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-orange-300 to-red-400 dark:from-orange-700 dark:to-red-600" />
                </ShimmerSkeleton>
              </div>
              <ShimmerSkeleton className="w-48 h-5 rounded">
                <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
              </ShimmerSkeleton>
              <ShimmerSkeleton className="w-3/4 h-4 rounded">
                <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
              </ShimmerSkeleton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 dark:border-orange-800">
        <CardHeader className="pb-4">
          <ShimmerSkeleton className="w-24 rounded-lg h-7">
            <div className="w-full h-full rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-600 dark:to-amber-500" />
          </ShimmerSkeleton>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 12 }).map((_, i) => {
              const colors = [
                'from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-500',
                'from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-500',
                'from-purple-400 to-violet-500 dark:from-purple-600 dark:to-violet-500',
                'from-pink-400 to-rose-500 dark:from-pink-600 dark:to-rose-500',
                'from-indigo-400 to-blue-500 dark:from-indigo-600 dark:to-blue-500',
                'from-teal-400 to-cyan-500 dark:from-teal-600 dark:to-cyan-500',
              ];
              const colorClass = colors[i % colors.length];
              const widths = ['w-16', 'w-20', 'w-12', 'w-24', 'w-18', 'w-14'];
              const widthClass = widths[i % widths.length];

              return (
                <ShimmerSkeleton
                  key={`skill-${i}`}
                  className={`h-8 ${widthClass} rounded-full`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-r ${colorClass} rounded-full shadow-md`}
                  />
                </ShimmerSkeleton>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border-cyan-200 dark:border-cyan-800">
        <CardHeader className="pb-4">
          <ShimmerSkeleton className="rounded-lg h-7 w-28">
            <div className="w-full h-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-500" />
          </ShimmerSkeleton>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={`proj-${i}`}
                className="p-5 space-y-4 border-2 shadow-md border-slate-200 dark:border-zinc-700 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900"
              >
                <ShimmerSkeleton className="w-3/4 h-6 rounded-lg">
                  <div className="w-full h-full rounded-lg bg-gradient-to-r from-slate-400 to-slate-500 dark:from-zinc-600 dark:to-zinc-500" />
                </ShimmerSkeleton>
                <div className="space-y-2">
                  <ShimmerSkeleton className="w-full h-4 rounded">
                    <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
                  </ShimmerSkeleton>
                  <ShimmerSkeleton className="w-5/6 h-4 rounded">
                    <div className="w-full h-full rounded bg-gradient-to-r from-slate-300 to-slate-400 dark:from-zinc-700 dark:to-zinc-600" />
                  </ShimmerSkeleton>
                </div>
                <div className="flex gap-2">
                  <ShimmerSkeleton className="w-16 h-6 rounded-full">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-500" />
                  </ShimmerSkeleton>
                  <ShimmerSkeleton className="w-20 h-6 rounded-full">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-500" />
                  </ShimmerSkeleton>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
