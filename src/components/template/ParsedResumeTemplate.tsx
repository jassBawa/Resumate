'use client';
import { ResumeSections } from '@/config/parseSections';
import React, { useRef, useState } from 'react';
import ResumeSection from './ResumeSection';
import { AnimatePresence, motion } from 'framer-motion';
import AnalysisCard from './AnalysisCard';

interface ParsedResumeTemplateProps {
  showAnalysis: boolean;
  sections: ResumeSections;
}

function ParsedResumeTemplate({
  showAnalysis,
  sections,
}: ParsedResumeTemplateProps) {
  const [hoveredSection, setHoveredSection] = useState<
    keyof ResumeSections | null
  >(null);
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
    <div className="max-w-3xl mx-auto flex items-center gap-4">
      <div
        className="space-y-3 relative mt-4 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm border dark:border-zinc-600 drop-shadow-2xl rounded-lg p-4"
        ref={resumeRef}
      >
        {sectionOrder.map(({ key, displayName, icon }) => {
          const section = sections[key];
          if (!section?.data) return null;

          return (
            <div
              key={key}
              onMouseEnter={() => setHoveredSection(key)}
              onMouseLeave={() => setHoveredSection(null)}
              className={`relative transition-all duration-400 px-3 py-4 ${
                hoveredSection === key
                  ? 'bg-gray-200 dark:bg-zinc-700/50 rounded-lg'
                  : ''
              }`}
            >
              <ResumeSection
                key={key}
                type={key}
                data={section.data}
                analysis={section.analysis}
                displayName={displayName}
                icon={icon}
              />
              <AnimatePresence>
                {hoveredSection === key && section.analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="hidden transition-opacity sm:block absolute z-20 sm:left-1/2 md:left-[60%] top-0 lg:left-full lg:ml-8 w-72 shadow-2xl"
                  >
                    {showAnalysis && (
                      <AnalysisCard analysis={section.analysis} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ParsedResumeTemplate;
