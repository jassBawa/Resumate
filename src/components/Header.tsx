import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  description: string;
  currentUser: string;
}

export function Header({ title, description, currentUser }: HeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <Sparkles className="h-8 w-8 text-purple-500 dark:text-purple-400" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          {title}
        </h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
        Current user: <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{currentUser}</span>
      </p>
    </motion.div>
  );
} 