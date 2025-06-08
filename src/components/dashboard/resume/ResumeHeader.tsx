'use client';

import type React from 'react';
import type { ThreadData } from '../resume/ResumeContainer';

interface ResumeHeaderProps {
  threadData: ThreadData;
}

export function ResumeHeader({ threadData }: ResumeHeaderProps) {
  return (
    <>
      <div className="mt-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {threadData.title || 'Full-Stack Developer'}
              </h1>
              <p className="mt-1 text-muted-foreground">
                Resume • Last updated 2 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
