import { FileText, Hash, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusMessageProps {
  success: boolean;
  message: string;
  threadId?: string;
  fileName?: string;
}

export function StatusMessage({ success, message, threadId, fileName }: StatusMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mt-6 p-6 rounded-lg transition-all duration-300 ${
        success
          ? 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200'
          : 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200'
      }`}
    >
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 mr-2" />
        <p className="text-sm font-medium">{message}</p>
      </div>
      {success && (
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>
              User: <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">jass</span>
            </span>
          </div>
          <div className="flex items-center">
            <Hash className="h-4 w-4 mr-2" />
            <span>
              Thread ID:{' '}
              <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{threadId}</span>
            </span>
          </div>
          <div className="flex items-center">
            <Hash className="h-4 w-4 mr-2" />
            <span>
              File ID:{' '}
              <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{fileName}</span>
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {message === 'Using existing file'
                ? 'Found at'
                : 'Uploaded at'}
              :{' '}
              <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                {new Date().toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
} 