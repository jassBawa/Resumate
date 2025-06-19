import { TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  trend: 'up' | 'down';
}

interface AnalysisMetricsProps {
  metrics: Metric[];
}

export function AnalysisMetrics({ metrics }: AnalysisMetricsProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {metrics.map(metric => (
        <div key={metric.label} className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <span className="text-2xl font-bold">{metric.value}</span>
            <TrendingUp
              className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-orange-500'}`}
            />
          </div>
          <div className="text-muted-foreground text-sm">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
