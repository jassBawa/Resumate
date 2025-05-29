'use client';
import { ResumeSections } from '@/config/parseSections';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import AnalysisCard from './AnalysisCard';
import ResumeSection from './ResumeSection';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useResumeStore } from '@/hooks/useResumeStore';

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
  { key: 'summary', displayName: 'Summary', icon: '📝', editable: false },
  { key: 'skills', displayName: 'Skills', icon: '🛠️', editable: false },
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
}
function ParsedResumeTemplate({ showAnalysis }: ParsedResumeTemplateProps) {
  const [hoveredSection, setHoveredSection] = useState<
    keyof ResumeSections | null
  >(null);
  const [editingSection, setEditingSection] = useState<
    keyof ResumeSections | null
  >(null);
  const [tempMessage, setTempMessage] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resumeSections, setResumeSections, updateSection, originalSections } =
    useResumeStore();
  const [originalSectionsMap, setOriginalSectionsMap] = useState<
    Partial<ResumeSections>
  >({});

  const handleRevertChanges = () => {
    setResumeSections(originalSectionsMap);
    setEditingSection(null);
    setAIResponse('');
    setTempMessage('');
  };

  const handleEditSection = async (sectionId: keyof ResumeSections) => {
    console.log(tempMessage, sectionId);
    setIsSubmitting(true);
    setAIResponse('');

    try {
      const resumeText = JSON.stringify(originalSections);
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

      updateSection(sectionId, data.section);

      setAIResponse(data.response);
    } catch (err) {
      console.error(err);
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

  const hasChanges =
    editingSection &&
    JSON.stringify(resumeSections[editingSection]) !==
      JSON.stringify(originalSectionsMap[editingSection]);
  return (
    <div className="flex items-center max-w-3xl gap-4 mx-auto">
      <div className="relative p-4 mt-4 space-y-3 border rounded-lg bg-white/80 dark:bg-zinc-900 backdrop-blur-sm dark:border-zinc-600 drop-shadow-2xl">
        {sectionOrder.map(({ key, displayName, icon, editable }) => {
          const section = resumeSections[key];
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
                      setOriginalSectionsMap((prev) => ({
                        ...prev,
                        [key]: resumeSections[key],
                      }));
                    }}
                    className="absolute top-0 right-0 px-2 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
                    title="Edit this section"
                  >
                    ✏️
                  </button>
                </div>
              )}

              {editable && editingSection === key && (
                <div
                  ref={chatRef}
                  className="absolute z-30 p-4 space-y-3 bg-white border shadow-xl top-2 right-2 dark:bg-zinc-800 dark:border-zinc-600 rounded-xl w-80"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Editing &quot;{displayName}&quot;
                  </label>
                  <input
                    type="text"
                    value={tempMessage}
                    onChange={(e) => setTempMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded dark:bg-zinc-700 dark:text-white"
                    placeholder="e.g. Improve bullet points, add more achievements"
                    disabled={isSubmitting}
                  />
                  {aiResponse && (
                    <div className="mt-1 text-xs italic text-green-600 dark:text-green-400">
                      ✅ Changes applied. You can Regenerate or Revert.
                    </div>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                    {hasChanges && (
                      <Button
                        variant="ghost"
                        onClick={handleRevertChanges}
                        className="text-xs text-gray-600 hover:text-red-500 hover:underline"
                      >
                        ⟲ Revert
                      </Button>
                    )}

                    <div className="flex gap-2 ml-auto">
                      <Button
                        size="sm"
                        disabled={
                          isSubmitting ||
                          !tempMessage ||
                          tempMessage.trim().length < 3
                        }
                        onClick={() => handleEditSection(key)}
                        className="text-white bg-blue-600 hover:bg-blue-700"
                      >
                        {isSubmitting
                          ? 'Thinking...'
                          : aiResponse
                          ? 'Regenerate'
                          : 'Submit'}
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
