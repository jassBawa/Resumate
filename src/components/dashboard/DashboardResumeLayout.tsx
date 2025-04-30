'use client';
import { useState } from 'react';
import { TemplateSelectionModal } from './TemplateSelectionModal';

import { Button } from '@/components/ui/button';
import { ParsedResume } from '@/config/parseSections';
import { FileText, Share, Trash } from 'lucide-react';
import ParsedResumeTemplate from '../template/ParsedResumeTemplate';
import { ShareResumeModal } from './ShareResumeModal';

export interface ThreadData {
  isSharable: boolean;
  publicId: string;
  viewerCount: number;
  title: string;
}

interface ResumeLayoutProps extends ParsedResume {
  sections: ParsedResume['sections'];
  threadData: ThreadData;
}

export function ResumeLayout({ sections, threadData }: ResumeLayoutProps) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isShareResumeModalOpen, setIsShareResumeModalOpen] = useState(false);

  // todo;
  const handleDelete = async () => {};

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Resume</h1>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsShareResumeModalOpen(true)}
            >
              Share Resume
              <Share />
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsTemplateModalOpen(true)}
            >
              Export pdf
              <FileText />
            </Button>

            <Button variant="destructive" onClick={handleDelete}>
              Delete Resume
              <Trash />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <span className="font-semibold text-blue-600">Tip:</span> Hover over
          different sections to view helpful insights
        </p>
      </div>

      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        sections={sections}
      />
      <ShareResumeModal
        isOpen={isShareResumeModalOpen}
        onClose={() => setIsShareResumeModalOpen(false)}
        isSharable={threadData.isSharable}
        publicId={threadData.publicId}
      />

      <ParsedResumeTemplate showAnalysis={true} sections={sections} />
    </div>
  );
}
