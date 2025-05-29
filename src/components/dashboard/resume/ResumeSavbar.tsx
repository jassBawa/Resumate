'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, Save, RotateCcw } from 'lucide-react';

interface SaveBarProps {
  onSave: () => void;
  onDiscard: () => void;
  saving: boolean;
}

export const SaveBar: React.FC<SaveBarProps> = ({
  onSave,
  onDiscard,
  saving,
}) => (
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
    className="fixed z-50 transform -translate-x-1/2 top-4 left-1/2"
  >
    <div className="flex items-center gap-4 px-5 py-3 border shadow-lg bg-white/95 backdrop-blur-md border-slate-200/60 rounded-2xl min-w-fit">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full bg-amber-500/20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="text-sm font-medium text-slate-700">
          Unsaved changes
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onSave}
          disabled={saving}
          size="sm"
          className="text-white bg-slate-900 hover:bg-slate-800"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          <span className="text-xs font-medium">Save</span>
        </Button>

        <Button
          onClick={onDiscard}
          variant="ghost"
          size="sm"
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          <span className="text-xs font-medium">Discard</span>
        </Button>
      </div>
    </div>
  </motion.div>
);
