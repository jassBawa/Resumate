import { motion } from 'framer-motion';
import { Crown, Sparkles, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DialogTitle } from '@/components/ui/dialog';

interface SubscriptionModalHeaderProps {
  getBadgeText: () => string;
  getTitle: () => string;
  getDescription: () => string;
}

export function SubscriptionModalHeader({
  getBadgeText,
  getTitle,
  getDescription,
}: SubscriptionModalHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4 text-white">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <DialogTitle className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Crown className="h-4 w-4" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-xs text-white backdrop-blur-sm">
              {getBadgeText()}
            </Badge>
          </DialogTitle>
          <h2 className="mb-2 text-lg leading-tight font-bold sm:text-xl">{getTitle()}</h2>
          <p className="text-sm text-blue-100">{getDescription()}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-1.5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-3 w-3" />
            </div>
            <span className="text-xs">AI-powered resume optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <Zap className="h-3 w-3" />
            </div>
            <span className="text-xs">Unlimited conversations & templates</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-white/10 blur-lg" />
      <div className="absolute -bottom-2 -left-2 h-8 w-8 rounded-full bg-white/10 blur-md" />
    </div>
  );
}
