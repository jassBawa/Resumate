import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface OverallScoreCardProps {
  score: number;
}

export function OverallScoreCard({ score }: OverallScoreCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Overall Score</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-primary mb-2 text-4xl font-bold">{score}%</div>
        <div className="text-muted-foreground">Resume Match</div>
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${score}%` }}></div>
        </div>
      </CardContent>
    </Card>
  );
}
