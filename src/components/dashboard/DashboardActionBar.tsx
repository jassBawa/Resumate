'use client';

import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ResumeActionBarProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function ResumeActionBar({
  onRefresh,
  isRefreshing,
}: ResumeActionBarProps) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <Button variant="outline" onClick={onRefresh} disabled={isRefreshing}>
        {isRefreshing ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4 mr-2" />
        )}
        Refresh
      </Button>
    </div>
  );
}
