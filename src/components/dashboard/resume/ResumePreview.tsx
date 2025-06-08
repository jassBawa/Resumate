'use client';

import type React from 'react';

// Components
import ParsedResumeTemplate from '../../template/ParsedResumeTemplate';

interface ResumePreviewProps {
  isRefreshing: boolean;
}

export function ResumePreview({ isRefreshing }: ResumePreviewProps) {
  return (
    <>
      <div style={{ opacity: isRefreshing ? 0.6 : 1 }}>
        <ParsedResumeTemplate />
      </div>
    </>
  );
}
