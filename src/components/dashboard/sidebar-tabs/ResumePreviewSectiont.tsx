'use client';
import ParsedResumeTemplate from '@/components/template/ParsedResumeTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, History, Save, Share } from 'lucide-react';
import { useState } from 'react';
import { TemplateSelectionModal } from '../modals/TemplateSelectionModal';
import { VersionModal } from '../modals/VersionModal';
import { ShareResumeModal } from '../modals/ShareResumeModal';
import { SaveTitleDialog } from '../resume/ResumeSaveModal';
import { useHasUnsavedChanges } from '@/hooks/useHasUnsavedChanges';
import { ThreadData } from '@/hooks/useResumeData';

interface PreviewSectionProps {
  threadData: ThreadData;
  threadId: string;
}

export function PreviewSection({ threadData, threadId }: PreviewSectionProps) {
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [saveVersionOpen, setSaveVersionOpen] = useState(false);
  const [exportPDFOpen, setExportPDFOpen] = useState(false);
  const hasChanges = useHasUnsavedChanges();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-3xl font-bold">Resume Preview</h2>
          <p className="text-muted-foreground mt-1">See how your resume looks</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setVersionHistoryOpen(true)}>
            <History className="mr-2 h-4 w-4" />
            Version History
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShareModalOpen(true)}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => setExportPDFOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button size="sm" onClick={() => setSaveVersionOpen(true)} disabled={!hasChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Version
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-4xl">
        <Card className="border p-0 shadow-sm">
          <CardContent className="">
            <ParsedResumeTemplate />
          </CardContent>
        </Card>
      </div>

      <TemplateSelectionModal isOpen={exportPDFOpen} onClose={() => setExportPDFOpen(false)} />
      <VersionModal
        isOpen={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
        currentVersionId={threadData.currentVersionId}
        threadId={threadId}
      />
      <ShareResumeModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        isSharable={threadData.isSharable}
        publicId={threadData.publicId}
        threadId={threadId}
      />
      <SaveTitleDialog
        isOpen={saveVersionOpen}
        onClose={() => setSaveVersionOpen(false)}
        threadId={threadId}
      />
    </div>
  );
}
