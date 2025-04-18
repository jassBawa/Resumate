'use client';
import { useState, useRef } from 'react';
import { TemplateSelectionModal } from './TemplateSelectionModal';

import { Button } from '@/components/ui/button';
import { ParsedResume, ResumeSections } from '@/config/parseSections';
import ResumeSection from './ResumeSection';
import AnalysisCard from './AnalysisCard';
import { FileText, Trash } from 'lucide-react';

interface ResumeLayoutProps extends ParsedResume {
  onDelete?: () => void;
}

export function ResumeLayout({ sections, onDelete }: ResumeLayoutProps) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const sectionOrder: {
    key: keyof ResumeSections;
    displayName: string;
    icon: string;
  }[] = [
    { key: 'contactInfo', displayName: 'Contact Information', icon: '👤' },
    { key: 'summary', displayName: 'Summary', icon: '📝' },
    { key: 'skills', displayName: 'Skills', icon: '🛠️' },
    { key: 'workExperience', displayName: 'Work Experience', icon: '💼' },
    { key: 'projects', displayName: 'Projects', icon: '📚' },
    { key: 'education', displayName: 'Education', icon: '🎓' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Resume</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsTemplateModalOpen(true)}
          >
            Export pdf
            <FileText />
          </Button>
          {onDelete && (
            <Button variant="destructive" onClick={onDelete}>
              Delete Resume
              <Trash />
            </Button>
          )}
        </div>
      </div>

      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        sections={sections}
      />

      <div
        className="space-y-6 relative mt-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border dark:border-zinc-700 drop-shadow-2xl rounded-lg p-6"
        ref={resumeRef}
      >
        {sectionOrder.map(({ key, displayName, icon }) => {
          const section = sections[key];
          if (!section?.data) return null;

          return (
            <div key={key}>
              <ResumeSection
                key={key}
                type={key}
                data={section.data}
                analysis={section.analysis}
                displayName={displayName}
                icon={icon}
              />
              {/* <AnalysisCard analysis={section.analysis} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
