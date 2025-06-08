import React from 'react';
import { ResumeSections } from '@/types';
import { useResumeStore } from '@/hooks/useResumeStore';
import AnalysisCard from '../../template/AnalysisCard';

const sectionOrder: {
  key: keyof ResumeSections;
  displayName: string;
  icon: string;
}[] = [
  {
    key: 'contactInfo',
    displayName: 'Contact Information',
    icon: '👤',
  },
  { key: 'summary', displayName: 'Summary', icon: '📝' },
  { key: 'skills', displayName: 'Skills', icon: '🛠️' },
  {
    key: 'workExperience',
    displayName: 'Work Experience',
    icon: '💼',
  },
  { key: 'projects', displayName: 'Projects', icon: '📚' },
  { key: 'education', displayName: 'Education', icon: '🎓' },
];

export const ResumeAnalysisView: React.FC = () => {
  const { resumeSections } = useResumeStore();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resume Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Review the analysis for each section of your resume.
        </p>
      </div>

      <div className="grid gap-6">
        {sectionOrder.map(({ key, displayName, icon }) => {
          const section = resumeSections[key];
          if (!section?.data || !section.analysis) return null;

          return (
            <div
              key={key}
              className="p-4 space-y-4 bg-white dark:bg-zinc-900 rounded-lg dark:border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <h2 className="text-lg font-semibold">{displayName}</h2>
              </div>
              <AnalysisCard analysis={section.analysis} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
