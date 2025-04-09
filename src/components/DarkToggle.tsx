'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomDarkToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300 hover:scale-105"
      >
        <motion.div
          className="relative flex h-6 w-6 items-center justify-center rounded-full bg-yellow-300 dark:bg-indigo-600"
          layout
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-sm">
            {isDark ? '🌙' : '🌞'}
          </span>
        </motion.div>

        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    </div>
  );
}
