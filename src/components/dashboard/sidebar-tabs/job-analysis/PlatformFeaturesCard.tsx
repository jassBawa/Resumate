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
          <div className="flex items-center gap-2 rounded bg-blue-50 p-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span>AI-powered job matching</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-green-50 p-2">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span>Smart resume optimization</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-purple-50 p-2">
            <FileText className="h-4 w-4 text-purple-600" />
            <span>Auto cover letter generation</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-orange-50 p-2">
            <Target className="h-4 w-4 text-orange-600" />
            <span>Keyword optimization</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
