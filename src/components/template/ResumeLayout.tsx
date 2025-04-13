import React, { useState, useRef } from 'react';
import { ParsedResume } from '@/config/parseSections';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ResumeSection from './ResumeSection';
import AnalysisCard from './AnalysisCard';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeLayout: React.FC<ParsedResume> = ({ sections }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const sectionOrder = [
    { key: 'contactInfo', displayName: 'Contact Information' },
    { key: 'summary', displayName: 'Summary' },
    { key: 'skills', displayName: 'Skills' },
    { key: 'workExperience', displayName: 'Work Experience' },
    { key: 'education', displayName: 'Education' },
    { key: 'projects', displayName: 'Projects' },
    { key: 'certifications', displayName: 'Certifications' },
  ];

  return (
    <>
      <div className="space-y-8 relative max-w-3xl mx-auto" ref={resumeRef}>
        {sectionOrder.map(({ key, displayName }, idx) => {
          // @ts-expect-error afaf
          const section = sections[key];
          if (!section) return null;

          return (
            <div
              key={key}
              onMouseEnter={() => setHoveredSection(key)}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">{displayName}</h2>
                  </div>
                  <ResumeSection sectionKey={key} section={section} />
                </CardContent>
                {idx < sectionOrder.length - 1 && <Separator />}
              </Card>

              {/* Floating Animated Analysis Card */}
              <AnimatePresence>
                {hoveredSection === key && section.analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute top-4 left-full ml-4 w-[320px] z-50"
                  >
                    <AnalysisCard analysis={section.analysis} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ResumeLayout;
