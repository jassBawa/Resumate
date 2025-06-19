import { Badge } from '@/components/ui/badge';

interface MissingKeywordsProps {
  keywords: string[];
}

export function MissingKeywords({ keywords }: MissingKeywordsProps) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">Missing Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map(keyword => (
          <Badge key={keyword} variant="destructive" className="text-xs">
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}
