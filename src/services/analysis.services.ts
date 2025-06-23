'use server';
import { getAnalysisSystemPrompt } from '@/config/prompts';
import openai from '@/lib/openai';
import { ResumeSections } from '@/types';

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

export async function analyseResumeSections(
  sections: ResumeSections,
  jobContext: { jobDescription: string; company: string; role: string }
): Promise<AnalysisResult | { error: string }> {
  const { jobDescription, company, role } = jobContext;

  if (!jobDescription || !company || !role) {
    return { error: 'Job description, company, and role are required.' };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: getAnalysisSystemPrompt() },
        {
          role: 'user',
          content: JSON.stringify({
            parsedResume: sections,
            jobContext,
          }),
        },
      ],
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      return { error: 'No response from OpenAI' };
    }

    // Parse the JSON response directly
    const analysisResult = JSON.parse(content);

    // Basic validation
    if (!analysisResult) {
      return { error: 'Invalid analysis format received' };
    }

    return analysisResult;
  } catch (error) {
    console.error('Error during resume analysis:', error);
    return {
      error: error instanceof Error ? error.message : 'Failed to analyze resume',
    };
  }
}
