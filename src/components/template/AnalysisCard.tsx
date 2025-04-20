import React from 'react';
import {
  Info,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Gauge,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisCardProps {
  analysis: {
    summary?: string;
    strengths?: string[];
    weaknesses?: string[];
    suggestions?: string[];
    ATS_Fit_Score?: number;
  };
}
const CardSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.div
    className="mb-4 last:mb-0"
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center gap-2 font-semibold text-primary mb-1">
      {icon}
      <span>{title}</span>
    </div>
    <div className="text-sm text-muted-foreground space-y-1">{children}</div>
  </motion.div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-inside pl-2">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  if (!analysis) return null;

  const {
    summary,
    strengths = [],
    weaknesses = [],
    suggestions = [],
    ATS_Fit_Score,
  } = analysis;

  return (
    <div className="w-full flex flex-col gap-1 bg-white dark:bg-zinc-900 border rounded-lg p-4 space-y-4 text-sm sticky h-fit">
      {summary && (
        <CardSection title="Summary" icon={<Info className="w-4 h-4 text-blue-500" />}>
          <p>{summary}</p>
        </CardSection>
      )}

      {strengths.length > 0 && (
        <CardSection title="Strengths" icon={<CheckCircle className="w-4 h-4 text-green-500" />}>
          <BulletList items={strengths} />
        </CardSection>
      )}

      {weaknesses.length > 0 && (
        <CardSection title="Weaknesses" icon={<AlertCircle className="w-4 h-4 text-red-500" />}>
          <BulletList items={weaknesses} />
        </CardSection>
      )}

      {suggestions.length > 0 && (
        <CardSection title="Suggestions" icon={<Lightbulb className="w-4 h-4 text-yellow-500" />}>
          <BulletList items={suggestions} />
        </CardSection>
      )}

      {typeof ATS_Fit_Score === 'number' && (
        <CardSection title="ATS Fit Score" icon={<Gauge className="w-4 h-4 text-purple-500" />}>
          <p className="font-bold text-lg">{ATS_Fit_Score}%</p>
        </CardSection>
      )}
    </div>
  );
};

export default AnalysisCard;
