import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3, Sparkles, FileText, Target } from 'lucide-react';

export function PlatformFeaturesCard() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Platform Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 rounded bg-blue-50 p-2 dark:bg-blue-900/20">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-900 dark:text-blue-100">AI-powered job matching</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-green-50 p-2 dark:bg-green-900/20">
            <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-green-900 dark:text-green-100">Smart resume optimization</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-purple-50 p-2 dark:bg-purple-900/20">
            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-900 dark:text-purple-100">
              Auto cover letter generation
            </span>
          </div>
          <div className="flex items-center gap-2 rounded bg-orange-50 p-2 dark:bg-orange-900/20">
            <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-orange-900 dark:text-orange-100">Keyword optimization</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
