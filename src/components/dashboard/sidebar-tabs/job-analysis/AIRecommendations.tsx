interface Recommendation {
  color: string; // e.g. 'blue', 'green', 'orange'
  title: string;
  description: string;
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, idx) => (
        <div key={idx} className={`flex items-start gap-3 rounded-lg bg-${rec.color}-50 p-3`}>
          <div className={`mt-2 h-2 w-2 rounded-full bg-${rec.color}-500`}></div>
          <div>
            <h4 className="font-medium">{rec.title}</h4>
            <p className="text-muted-foreground text-sm">{rec.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
