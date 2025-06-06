'use client';

import type React from 'react';

import { Info, KeyRound } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { ResumeActionBar } from '../DashboardActionBar';
import type { ThreadData } from '../resume/ResumeContainer';

interface ResumeHeaderProps {
  threadData: ThreadData;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function ResumeHeader({
  threadData,
  onRefresh,
  isRefreshing,
}: ResumeHeaderProps) {
  return (
    <div className="max-w-4xl mx-auto">
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

          <ResumeActionBar onRefresh={onRefresh} isRefreshing={isRefreshing} />
        </div>

        <Card className="p-4 mt-6 mb-6 border-border/50 bg-muted/20">
          <div className="flex items-start gap-3">
            <Info className="flex-shrink-0 w-5 h-5 mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium text-primary">Pro Tips</p>
              <ul className="mt-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <span>•</span> Hover over sections for helpful insights.
                </li>
                <li className="flex items-center gap-1.5">
                  <span>•</span> Use shortcuts for quick actions
                  <span className="inline-flex items-center ml-1.5 text-xs bg-primary/10 text-primary-foreground px-1.5 py-0.5 rounded">
                    <KeyRound className="w-3 h-3 mr-1" /> ⌘S, ⌘E, ⌘V
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
