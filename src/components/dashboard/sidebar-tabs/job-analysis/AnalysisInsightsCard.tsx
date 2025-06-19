import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Users, Target } from 'lucide-react';

export function AnalysisInsightsCard() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Analysis Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-blue-500" />
          <span>Analysis completed in 2.3s</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-green-500" />
          <span>Top 15% match in similar roles</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target className="h-4 w-4 text-purple-500" />
          <span>3 key improvements identified</span>
        </div>
      </CardContent>
    </Card>
  );
}
