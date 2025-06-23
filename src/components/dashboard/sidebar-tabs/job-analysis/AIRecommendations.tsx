export interface Recommendation {
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow';
  title: string;
  description: string;
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-900 dark:text-blue-100',
    dot: 'bg-blue-500 dark:bg-blue-400',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-900 dark:text-green-100',
    dot: 'bg-green-500 dark:bg-green-400',
    icon: 'text-green-600 dark:text-green-400',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-900 dark:text-orange-100',
    dot: 'bg-orange-500 dark:bg-orange-400',
    icon: 'text-orange-600 dark:text-orange-400',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-900 dark:text-purple-100',
    dot: 'bg-purple-500 dark:bg-purple-400',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-900 dark:text-red-100',
    dot: 'bg-red-500 dark:bg-red-400',
    icon: 'text-red-600 dark:text-red-400',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-900 dark:text-yellow-100',
    dot: 'bg-yellow-500 dark:bg-yellow-400',
    icon: 'text-yellow-600 dark:text-yellow-400',
  },
};

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, idx) => {
        const colors = colorClasses[rec.color];
        return (
          <div key={idx} className={`flex items-start gap-3 rounded-lg p-3 ${colors.bg}`}>
            <div className={`mt-2 h-2 w-2 rounded-full ${colors.dot}`}></div>
            <div>
              <h4 className={`font-medium ${colors.text}`}>{rec.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
