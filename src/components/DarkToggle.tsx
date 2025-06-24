'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CustomDarkToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 transition-all duration-300 dark:border-gray-700',
        className
      )}
    >
      <motion.div
        className="relative flex h-6 w-6 items-center justify-center rounded-full bg-yellow-300 dark:bg-indigo-600"
        layout
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <span className="text-sm">{isDark ? '🌙' : '🌞'}</span>
      </motion.div>

      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
