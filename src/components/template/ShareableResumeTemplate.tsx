'use client';
import { ResumeSections } from '@/types';
import ResumeSection from './ResumeSection';

// todo: fix the limited section here
const sectionOrder: {
  key: keyof ResumeSections;
  displayName: string;
  icon: string;
  editable: boolean;
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
    <div className="mx-auto flex max-w-3xl items-center gap-4">
      <div className="relative mt-4 space-y-3 rounded-lg border bg-white/80 p-4 drop-shadow-2xl backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900">
        {sectionOrder.map(({ key, displayName, icon }) => {
          const section = sections[key];
          if (!section?.data) return null;
          return (
            <div key={key} className={`relative px-3 py-4 transition-all duration-400`}>
              <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h3>{displayName}</h3>
              </div>
              <ResumeSection type={key} data={section.data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShareableResumeTemplate;
