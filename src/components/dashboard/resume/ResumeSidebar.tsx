'use client';

import React from 'react';
import { FileDown, GitBranch, Share2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResumeViewStore } from '@/hooks/useResumeViewStore';

interface ResumeSidebarProps {
  activeView: 'preview' | 'edit' | 'analysis';
  setActiveView: (view: 'preview' | 'edit' | 'analysis') => void;
}

interface ActionButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const ResumeSidebar: React.FC<ResumeSidebarProps> = ({
  activeView,
  setActiveView,
}) => {
  const {
    openShareModal,
    openTemplateModal,
    openVersionModal,
    openDeleteDialog,
  } = useResumeViewStore();

  const tabs = [
    {
      id: 'preview',
      label: 'Preview',
      icon: '👁️',
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: '✏️',
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: '📊',
    },
  ] as const;

  const actionButtons: ActionButton[] = [
    {
      id: 'share',
      label: 'Share Resume',
      icon: <Share2 className="w-4 h-4" />,
      onClick: openShareModal,
    },
    {
      id: 'export',
      label: 'Export PDF',
      icon: <FileDown className="w-4 h-4" />,
      onClick: openTemplateModal,
    },
    {
      id: 'versions',
      label: 'View Versions',
      icon: <GitBranch className="w-4 h-4" />,
      onClick: openVersionModal,
    },
    {
      id: 'delete',
      label: 'Delete Chat',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: openDeleteDialog,
      className: 'text-red-500 hover:bg-red-500/10 hover:text-red-500',
    },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] bg-white dark:bg-neutral-900  border dark:border-neutral-600 flex flex-col p-4 backdrop-blur-sm rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-black/20">
      <div className=" backdrop-blur-sm rounded-lg p-2">
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Thread
          </h2>
        </div>
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                activeView === tab.id
                  ? 'bg-primary/90 text-primary-foreground'
                  : 'hover:bg-muted/80'
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 backdrop-blur-sm rounded-lg p-2">
        <div className="space-y-2">
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={button.onClick}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                button.className || 'hover:bg-muted/80'
              )}
            >
              {button.icon}
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
