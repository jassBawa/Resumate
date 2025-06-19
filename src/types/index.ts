export interface ResumeSections {
  contactInfo?: {
    data: {
      name: string;
      email: string;
      phone: string;
      location: string;
      linkedin?: string;
    };
  };
  summary?: {
    data: {
      summary: string;
    };
  };
  skills?: {
    data: {
      hardSkills: string[];
      softSkills: string[];
    };
  };
  workExperience?: {
    data: Array<{
      title: string;
      company: string;
      duration: string;
      description?: string;
      responsibilities?: string[];
    }>;
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
  };
  certifications?: {
    data: Array<{
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }>;
  };
  projects?: {
    data: Array<{
      name: string;
      description: string;
      url?: string;
      technologies?: string[];
    }>;
  };
  awards?: {
    data: Array<{
      title: string;
      issuer: string;
      year: string;
    }>;
  };
  publications?: {
    data: Array<{
      title: string;
      publication: string;
      date: string;
      url?: string;
    }>;
  };
  languages?: {
    data: Array<{
      language: string;
      proficiency: string;
    }>;
  };
  hobbies?: {
    data: string[];
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
  };
}

export interface JDAnalysis {
  overallScore: number;
  skillMatchScore: number;
  experienceMatch: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommnedations: string[];
  missingKeywords: string[];
  ATS_Fit_Score: number;
}
