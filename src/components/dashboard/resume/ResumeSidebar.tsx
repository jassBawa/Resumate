'use client';

import type React from 'react';
import { FileDown, GitBranch, Eye, Pencil, Share2, Trash2 } from 'lucide-react';
import {
  ResumeViewSidebar,
  ResumeViewSidebarNav,
  ResumeViewSidebarNavLink,
} from './ResumeViewLayout';
import { useResumeViewStore } from '@/hooks/useResumeViewStore';

interface ResumeSidebarProps {
  activeView: 'preview' | 'edit';
  setActiveView: (view: 'preview' | 'edit') => void;
}

export function ResumeSidebar({
  activeView,
  setActiveView,
}: ResumeSidebarProps) {
  const {
    openShareModal,
    openTemplateModal,
    openVersionModal,
    openDeleteDialog,
  } = useResumeViewStore();

  return (
    <ResumeViewSidebar>
      <div className="bg-white dark:bg-accent">
        <div className="px-3 py-2 mt-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Thread
          </h2>
        </div>
        <ResumeViewSidebarNav>
          <ResumeViewSidebarNavLink
            onClick={() => setActiveView('preview')}
            isActive={activeView === 'preview'}
          >
            <Eye className="w-4 h-4" />
            Preview & Chat
          </ResumeViewSidebarNavLink>
          <ResumeViewSidebarNavLink
            onClick={() => setActiveView('edit')}
            isActive={activeView === 'edit'}
          >
            <Pencil className="w-4 h-4" />
            Edit Sections
          </ResumeViewSidebarNavLink>
        </ResumeViewSidebarNav>
      </div>
      <div className="mt-auto">
        <ResumeViewSidebarNav>
          <ResumeViewSidebarNavLink onClick={openShareModal}>
            <Share2 className="w-4 h-4" />
            Share Resume
          </ResumeViewSidebarNavLink>
          <ResumeViewSidebarNavLink onClick={openTemplateModal}>
            <FileDown className="w-4 h-4" />
            Export PDF
          </ResumeViewSidebarNavLink>
          <ResumeViewSidebarNavLink onClick={openVersionModal}>
            <GitBranch className="w-4 h-4" />
            View Versions
          </ResumeViewSidebarNavLink>
          <ResumeViewSidebarNavLink
            onClick={openDeleteDialog}
            className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
            Delete Chat
          </ResumeViewSidebarNavLink>
        </ResumeViewSidebarNav>
      </div>
    </ResumeViewSidebar>
  );
}
