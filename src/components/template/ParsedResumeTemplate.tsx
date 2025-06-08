'use client';
import { ResumeSections } from '@/types';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import ResumeSection from './ResumeSection';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useResumeStore } from '@/hooks/useResumeStore';

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

function ParsedResumeTemplate() {
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
    <div className="mt-4 w-full px-2 sm:px-4 md:px-8">
      <div className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 shadow-xl shadow-blue-900/20 ring-1 ring-inset ring-blue-500/5 rounded-2xl mx-auto max-w-4xl px-0 sm:px-2 md:px-0 transition-all">
        <div className="px-6 py-6 divide-y divide-gray-200 dark:divide-zinc-800">
          {sectionOrder.map(({ key, displayName, icon, editable }) => {
            const section = resumeSections[key];
            if (!section?.data) return null;

            return (
              <div key={key} className="relative py-8">
                {editable && (
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
                    className="absolute top-4 right-0 p-2 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                    title="Edit this section"
                  >
                    ✏️
                  </button>
                )}

                {editable && editingSection === key && (
                  <div
                    ref={chatRef}
                    className="absolute z-30 p-4 space-y-3 bg-white dark:bg-zinc-800 border dark:border-zinc-700 shadow-xl top-12 right-0 rounded-xl w-80"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Editing &quot;{displayName}&quot;
                    </label>
                    <input
                      type="text"
                      value={tempMessage}
                      onChange={(e) => setTempMessage(e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
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

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {displayName}
                  </h3>
                </div>

                <ResumeSection type={key} data={section.data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ParsedResumeTemplate;
