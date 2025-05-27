export type Section = {
  data: any;
  analysis: any;
};

export interface ResumeSections {
  contactInfo?: {
    data: {
      name: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
    };
    analysis: SectionAnalysis;
  };
  summary?: {
    data: {
      summary: string;
    };
    analysis: SectionAnalysis;
  };
  skills?: {
    data: {
      hardSkills: string[];
      softSkills: string[];
    };
    analysis: SectionAnalysis;
  };
  workExperience?: {
    data: Array<{
      title: string;
      company: string;
      duration: string;
      description?: string;
      responsibilities?: string[];
    }>;
    analysis: SectionAnalysis;
  };
  education?: {
    data: Array<{
      institution: string;
      degree: string;
      startDate: string;
      endDate: string;
      cgpa?: string;
      percentage?: string;
    }>;
    analysis: SectionAnalysis;
  };
  certifications?: {
    data: Array<{
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }>;
    analysis: SectionAnalysis;
  };
  projects?: {
    data: Array<{
      name: string;
      description: string;
      url?: string;
      technologies?: string[];
    }>;
    analysis: SectionAnalysis;
  };
  awards?: {
    data: Array<{
      title: string;
      issuer: string;
      year: string;
    }>;
    analysis: SectionAnalysis;
  };
  publications?: {
    data: Array<{
      title: string;
      publication: string;
      date: string;
      url?: string;
    }>;
    analysis: SectionAnalysis;
  };
  languages?: {
    data: Array<{
      language: string;
      proficiency: string;
    }>;
    analysis: SectionAnalysis;
  };
  hobbies?: {
    data: string[];
    analysis: SectionAnalysis;
  };
  customSection?: {
    data: Array<{
      sectionTitle: string;
      entries: Array<{
        organization?: string;
        role?: string;
        description?: string;
      }>;
    }>;
    analysis: SectionAnalysis;
  };
}

export interface SectionAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  ATS_Fit_Score: number;
}

export interface ParsedResume {
  sections: ResumeSections;
}
