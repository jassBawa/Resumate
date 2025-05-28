'use client';

import React, { useEffect, useState } from 'react';
import { ResumeLayout, ThreadData } from './DashboardResumeLayout';
import { ChatInterface } from '../resume/ChatInterface';
import { getResumeSections } from '@/lib/actions/resume';
import { ResumeSkeleton } from '../resume/ResumeSkelton';
import { useResumeStore } from '@/hooks/useResumeStore';
import { saveResumeSections } from '@/lib/actions/saveResumeSections';
import { useHasUnsavedChanges } from '@/hooks/useHasUnsavedChanges';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { AlertCircle, Loader2, RotateCcw, Save } from 'lucide-react';

interface ResumeContainerProps {
  threadId: string;
}

const ResumeContainer: React.FC<ResumeContainerProps> = ({ threadId }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [threadData, setThreadData] = useState<ThreadData>({} as ThreadData);
  const {
    setResumeSections,
    setOriginalSections,
    resumeSections,
    resetSections,
  } = useResumeStore();

  const hasUnsavedChanges = useHasUnsavedChanges();

  const handleSave = async () => {
    setSaving(true);
    const result = await saveResumeSections(threadId, resumeSections);
    if (result.success) {
      toast.success('Changes saved!');
      setOriginalSections(resumeSections);
    } else {
      toast.error(result.error || 'Failed to save changes');
    }
    setSaving(false);
  };

  const handleDiscard = () => {
    resetSections();
    toast.info('Changes discarded');
  };

  console.log(hasUnsavedChanges);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getResumeSections(threadId);
      if (error) {
        toast.error(error);
      }
      if (data?.sections) {
        setResumeSections(data.sections);
        setOriginalSections(data.sections);
        setThreadData(data.threadData);
      }

      setLoading(false);
    };

    fetchData();
  }, [threadId, setResumeSections, setOriginalSections]);

  return (
    <div className="relative">
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              opacity: { duration: 0.2 },
            }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/60 rounded-2xl px-5 py-3 flex items-center gap-4 min-w-fit">
              {/* Status indicator */}
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 w-4 h-4 rounded-full bg-amber-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Unsaved changes
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      <span className="text-xs font-medium">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 mr-1.5" />
                      <span className="text-xs font-medium">Save</span>
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDiscard}
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  <span className="text-xs font-medium">Discard</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {loading ? (
        <ResumeSkeleton />
      ) : (
        <>
          <ResumeLayout
            threadId={threadId}
            resumeText={threadData.resumeText}
            threadData={threadData}
          />
          <ChatInterface resumeText={threadData.resumeText} />
        </>
      )}
    </div>
  );
};

export default ResumeContainer;
