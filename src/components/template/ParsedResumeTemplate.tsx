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
  { key: 'certifications', displayName: 'Certifications', icon: '🏆', editable: false },
  { key: 'publications', displayName: 'Publications', icon: '📄', editable: false },
];

function ParsedResumeTemplate() {
  const [editingSection, setEditingSection] = useState<keyof ResumeSections | null>(null);
  const [tempMessage, setTempMessage] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resumeSections, setResumeSections, updateSection, originalSections } = useResumeStore();
  const [originalSectionsMap, setOriginalSectionsMap] = useState<Partial<ResumeSections>>({});

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
    <div className="divide-y divide-gray-200 dark:divide-zinc-800">
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
                  setOriginalSectionsMap(prev => ({
                    ...prev,
                    [key]: resumeSections[key],
                  }));
                }}
                className="absolute top-4 right-0 rounded-full p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
                title="Edit this section"
              >
                ✏️
              </button>
            )}

            {editable && editingSection === key && (
              <div
                ref={chatRef}
                className="absolute top-12 right-0 z-30 w-80 space-y-3 rounded-xl border bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Editing "{displayName}"
                </label>
                <input
                  type="text"
                  value={tempMessage}
                  onChange={e => setTempMessage(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                  placeholder="e.g. Improve bullet points, add more achievements"
                  disabled={isSubmitting}
                />
                {aiResponse && (
                  <div className="mt-1 text-xs text-green-600 italic dark:text-green-400">
                    ✅ Changes applied. You can Regenerate or Revert.
                  </div>
                )}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  {hasChanges && (
                    <Button
                      variant="ghost"
                      onClick={handleRevertChanges}
                      className="text-xs text-gray-600 hover:text-red-500 hover:underline"
                    >
                      ⟲ Revert
                    </Button>
                  )}

                  <div className="ml-auto flex gap-2">
                    <Button
                      size="sm"
                      disabled={isSubmitting || !tempMessage || tempMessage.trim().length < 3}
                      onClick={() => handleEditSection(key)}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {isSubmitting ? 'Thinking...' : aiResponse ? 'Regenerate' : 'Submit'}
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

            <div className="mb-2 flex items-center gap-2">
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
  );
}

export default ParsedResumeTemplate;
