// lib/parseResume.ts
import { XMLParser } from 'fast-xml-parser';

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
      achievements?: string[];
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

/**
 * Extracts resume sections from the XML response.
 *
 * The backend returns an XML where each section (contactInfo, summary, etc.)
 * contains a JSON string with keys "data" and "analysis".
 *
 * Example XML:
 * <parsedResume>
 *   <contactInfo>
 *     { "data": { ... }, "analysis": { ... } }
 *   </contactInfo>
 *   <summary>
 *     { "data": { ... }, "analysis": { ... } }
 *   </summary>
 *   ...
 * </parsedResume>
 *
 * This function returns an object with the structure:
 * {
 *   sections: {
 *     contactInfo: { data: { ... }, analysis: { ... } },
 *     summary: { data: { ... }, analysis: { ... } },
 *     ...
 *   }
 * }
 *
 * @param xmlString - The XML response as a string.
 * @returns A ParsedResume object with sections.
 */
export function extractResumeSections(xmlString: string): ParsedResume {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  });
  
  const parsedXML = parser.parse(xmlString);
  const resumeNode = parsedXML.parsedResume;
  const sections: ResumeSections = {};
  
  for (const section in resumeNode) {
    if (resumeNode.hasOwnProperty(section)) {
      const rawSectionContent = resumeNode[section];
      
      let parsedSection: Section;
      if (typeof rawSectionContent === 'string') {
        try {
          parsedSection = JSON.parse(rawSectionContent);
        } catch (error) {
          console.error(`Error parsing JSON for section "${section}":`, error);
          parsedSection = { data: null, analysis: null };
        }
      } else {
        parsedSection = rawSectionContent;
      }

      // Ensure education data is always an array
      if (section === 'education' && parsedSection.data && !Array.isArray(parsedSection.data)) {
        parsedSection.data = [parsedSection.data];
      }
      
      sections[section as keyof ResumeSections] = parsedSection;
    }
  }
  
  return { sections };
}
