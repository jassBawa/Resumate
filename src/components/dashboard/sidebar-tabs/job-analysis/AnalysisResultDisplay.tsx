import { Card } from '@/components/ui/card';
import { AnalysisMetrics } from './AnalysisMetrics';
import { MissingKeywords } from './MissingKeywords';
import { MatchingSkills } from './MatchingSkills';
import { AIRecommendations } from './AIRecommendations';
import { OverallScoreCard } from './OverallScoreCard';
import { AnalysisInsightsCard } from './AnalysisInsightsCard';

interface AnalysisResult {
  sectionAnalysis: Record<
    string,
    {
      matchScore: number;
      matchingSkills: string[];
      missingKeywords: string[];
      skillMatchPercent: number;
      areasOfImprovement: string;
    }
  >;
  combinedAnalysis: string;
  coverLetter: string;
}

interface AnalysisResultDisplayProps {
  analysisResult: AnalysisResult;
}

export function AnalysisResultDisplay({ analysisResult }: AnalysisResultDisplayProps) {
  // Extract data from analysis result
  const getAnalysisMetrics = () => {
    const sections = Object.values(analysisResult.sectionAnalysis);
    const avgMatchScore = sections.reduce((sum, s) => sum + s.matchScore, 0) / sections.length;
    const avgSkillMatch =
      sections.reduce((sum, s) => sum + s.skillMatchPercent, 0) / sections.length;

    return [
      { label: 'Match Score', value: `${Math.round(avgMatchScore)}%`, trend: 'up' as const },
      { label: 'Skill Match', value: `${Math.round(avgSkillMatch)}%`, trend: 'up' as const },
      { label: 'Sections Analyzed', value: `${sections.length}`, trend: 'up' as const },
    ];
  };

  const getAllMissingKeywords = () => {
    return Object.values(analysisResult.sectionAnalysis)
      .flatMap(s => s.missingKeywords)
      .filter((keyword, index, arr) => arr.indexOf(keyword) === index);
  };

  const getAllMatchingSkills = () => {
    return Object.values(analysisResult.sectionAnalysis)
      .flatMap(s => s.matchingSkills)
      .filter((skill, index, arr) => arr.indexOf(skill) === index);
  };

  const getAIRecommendations = () => {
    const colors = ['blue', 'green', 'orange', 'purple'] as const;
    return Object.values(analysisResult.sectionAnalysis).map((section, idx) => ({
      color: colors[idx % colors.length],
      title: `Improve ${Object.keys(analysisResult.sectionAnalysis)[idx]}`,
      description: section.areasOfImprovement,
    }));
  };

  const getOverallScore = () => {
    const sections = Object.values(analysisResult.sectionAnalysis);
    return Math.round(sections.reduce((sum, s) => sum + s.matchScore, 0) / sections.length);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="border shadow-sm">
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Resume Match Analysis</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered analysis of your resume against the job requirements
              </p>
            </div>
            <AnalysisMetrics metrics={getAnalysisMetrics()} />
            <div className="space-y-4">
              <MissingKeywords keywords={getAllMissingKeywords()} />
              <MatchingSkills skills={getAllMatchingSkills()} />
            </div>
          </div>
        </Card>
        <Card className="border shadow-sm">
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">AI Recommendations</h3>
              <p className="text-muted-foreground text-sm">
                Personalized suggestions to improve your resume match
              </p>
            </div>
            <AIRecommendations recommendations={getAIRecommendations()} />
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <OverallScoreCard score={getOverallScore()} />
        <AnalysisInsightsCard />
      </div>
    </div>
  );
}
