import React, { useState, useRef } from 'react';
import { ParsedResume, ResumeSections } from '@/config/parseSections';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ResumeSection from './ResumeSection';
import AnalysisCard from './AnalysisCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Download, Trash2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

interface ResumeLayoutProps extends ParsedResume {
  onDelete?: () => Promise<void>;
}

const ResumeLayout: React.FC<ResumeLayoutProps> = ({ sections, onDelete }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting resume:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const sectionOrder: { key: keyof ResumeSections; displayName: string; icon: string }[] = [
    { key: 'contactInfo', displayName: 'Contact Information', icon: '👤' },
    { key: 'summary', displayName: 'Professional Summary', icon: '📝' },
    { key: 'skills', displayName: 'Skills & Expertise', icon: '🛠️' },
    { key: 'workExperience', displayName: 'Work Experience', icon: '💼' },
    { key: 'education', displayName: 'Education', icon: '🎓' },
    { key: 'certifications', displayName: 'Certifications', icon: '🏆' },
    { key: 'projects', displayName: 'Projects', icon: '📚' },
    { key: 'awards', displayName: 'Awards & Achievements', icon: '🏅' },
    { key: 'publications', displayName: 'Publications', icon: '📖' },
    { key: 'languages', displayName: 'Languages', icon: '🌐' },
    { key: 'hobbies', displayName: 'Hobbies & Interests', icon: '🎯' },
    { key: 'customSection', displayName: 'Additional Information', icon: '📋' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end gap-4 mb-4">
        <PDFDownloadLink
          document={<ResumePDF sections={sections} />}
          fileName="resume.pdf"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          {({ loading }) => (
            <>
              <Download className="h-4 w-4 mr-2" />
              {loading ? 'Preparing PDF...' : 'Download PDF'}
            </>
          )}
        </PDFDownloadLink>
        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete Resume'}
          </button>
        )}
      </div>
      <div className="space-y-6 relative" ref={resumeRef}>
        {sectionOrder.map(({ key, displayName, icon }, idx) => {
          const section = sections[key];
          if (!section) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredSection(key)}
              onMouseLeave={() => setHoveredSection(null)}
              className="relative group"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <h2 className="text-2xl font-bold text-primary">{displayName}</h2>
                    </div>
                    {section.analysis && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Info className="h-5 w-5" />
                        <span className="text-sm">Hover for analysis</span>
                      </div>
                    )}
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
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-4 left-full ml-4 w-[320px] z-50"
                  >
                    <AnalysisCard analysis={section.analysis} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeLayout;
