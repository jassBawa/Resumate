'use client';
import { ResumeSections } from '@/types';
import ResumeSection from './ResumeSection';

const sectionOrder: {
  key: keyof ResumeSections;
  displayName: string;
  icon: string;
  editable: boolean; // ✅ Add this
}[] = [
  {
    key: 'contactInfo',
    displayName: 'Contact Information',
    icon: '👤',
    editable: false,
  },
  { key: 'summary', displayName: 'Summary', icon: '📝', editable: true },
  { key: 'skills', displayName: 'Skills', icon: '🛠️', editable: true },
  {
    key: 'workExperience',
    displayName: 'Work Experience',
    icon: '💼',
    editable: true,
  },
  { key: 'projects', displayName: 'Projects', icon: '📚', editable: true },
  { key: 'education', displayName: 'Education', icon: '🎓', editable: false },
];

interface ShareableResumeTemplateProps {
  sections: ResumeSections;
}
function ShareableResumeTemplate({ sections }: ShareableResumeTemplateProps) {
  return (
    <div className="max-w-3xl mx-auto flex items-center gap-4">
      <div className="space-y-3 relative mt-4 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm border dark:border-zinc-600 drop-shadow-2xl rounded-lg p-4">
        {sectionOrder.map(({ key, displayName, icon }) => {
          const section = sections[key];
          if (!section?.data) return null;
          return (
            <div
              key={key}
              className={`relative transition-all duration-400 px-3 py-4`}
            >
              <ResumeSection
                type={key}
                data={section.data}
                analysis={section.analysis}
                displayName={displayName}
                icon={icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShareableResumeTemplate;
