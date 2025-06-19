import { create } from 'zustand';

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

interface JobDetails {
  jobTitle: string;
  company: string;
  jobDescription: string;
  selectedJobId?: number;
}

interface AnalysisState {
  // Job details state
  jobDetails: JobDetails;
  setJobDetails: (details: Partial<JobDetails>) => void;

  // Analysis state
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;

  // Actions
  clearAnalysis: () => void;
  resetJobDetails: () => void;
}

const initialJobDetails: JobDetails = {
  jobTitle: '',
  company: '',
  jobDescription: '',
  selectedJobId: undefined,
};

export const useAnalysisStore = create<AnalysisState>(set => ({
  // Initial state
  jobDetails: initialJobDetails,
  analysisResult: null,
  isAnalyzing: false,

  // Job details actions
  setJobDetails: details =>
    set(state => ({
      jobDetails: { ...state.jobDetails, ...details },
    })),

  // Analysis actions
  setAnalysisResult: result => set({ analysisResult: result }),
  setIsAnalyzing: analyzing => set({ isAnalyzing: analyzing }),

  // Reset actions
  clearAnalysis: () =>
    set({
      analysisResult: null,
    }),

  resetJobDetails: () =>
    set({
      jobDetails: initialJobDetails,
    }),
}));
