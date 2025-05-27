'use client';
import { ResumeSections } from '@/config/parseSections';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import AnalysisCard from './AnalysisCard';
import ResumeSection from './ResumeSection';
import { useClickOutside } from '@/hooks/useClickOutside';

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

interface ParsedResumeTemplateProps {
  showAnalysis: boolean;
  initialSections: ResumeSections;
  resumeText: string;
}
function ParsedResumeTemplate({
  showAnalysis,
  initialSections,
  resumeText,
}: ParsedResumeTemplateProps) {
  const [hoveredSection, setHoveredSection] = useState<
    keyof ResumeSections | null
  >(null);
  const [editingSection, setEditingSection] = useState<
    keyof ResumeSections | null
  >(null);
  const [tempMessage, setTempMessage] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<ResumeSections>(initialSections);
  const [originalSections] = useState<ResumeSections>(initialSections); // for revert

  const handleRevertChanges = () => {
    setSections(originalSections);
    setEditingSection(null);
    setAIResponse('');
    setTempMessage('');
  };

  const handleEditSection = async (sectionId: keyof ResumeSections) => {
    console.log(tempMessage, sectionId);
    setIsSubmitting(true);
    setAIResponse('');

    try {
      const res = await fetch('/api/chat/edit-section', {
        method: 'POST',
        body: JSON.stringify({
          message: tempMessage,
          conversationHistory: [],
          sectionId,
          resumeText,
        }),
      });

      const data = await res.json();
      console.log(data);

      setSections((sections) => ({
        ...sections,
        [sectionId]: data.section,
      }));

      setAIResponse(data.response);
    } catch (err) {
      console.log(err);
      setAIResponse('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const chatRef = useRef<HTMLDivElement>(null);

  useClickOutside(chatRef, () => {
    if (editingSection !== null) {
      setEditingSection(null);
      setAIResponse('');
    }
  });

  return (
    <div className="max-w-3xl mx-auto flex items-center gap-4">
      <div className="space-y-3 relative mt-4 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm border dark:border-zinc-600 drop-shadow-2xl rounded-lg p-4">
        {sectionOrder.map(({ key, displayName, icon, editable }) => {
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
              {editable && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setTempMessage('');
                      setAIResponse('');
                      setEditingSection(key);
                    }}
                    className="absolute top-0 right-0 text-sm px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
                    title="Edit this section"
                  >
                    ✏️
                  </button>
                </div>
              )}

              {editable && editingSection === key && (
                <div
                  ref={chatRef}
                  className="absolute top-2 right-2 z-30 bg-white dark:bg-zinc-800 border dark:border-zinc-600 p-3 rounded-lg shadow-xl w-72 space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Edit &quot;{displayName}&quot;
                  </label>
                  <input
                    type="text"
                    value={tempMessage}
                    onChange={(e) => setTempMessage(e.target.value)}
                    className="w-full border rounded px-2 py-1 dark:bg-zinc-700 dark:text-white text-sm"
                    placeholder="e.g. Edit existing or add new"
                    disabled={isSubmitting}
                  />
                  {aiResponse && (
                    <>
                      <div className="text-xs mt-1 text-green-600 dark:text-green-400">
                        {aiResponse}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button variant="outline" onClick={handleRevertChanges}>
                          Revert Changes
                        </Button>
                      </div>
                    </>
                  )}
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      size="sm"
                      disabled={isSubmitting || !tempMessage}
                      onClick={() => handleEditSection(key)}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingSection(null);
                        setAIResponse('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <ResumeSection
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
