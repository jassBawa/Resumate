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
  // Create an XMLParser instance
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  });
  
  // Convert XML string into an object
  const parsedXML = parser.parse(xmlString);
  
  // Assume the root node is <parsedResume>
  const resumeNode = parsedXML.parsedResume;
  
  // Define an object to hold the sections
  const sections: ResumeSections = {};
  
  // Iterate over each key inside the root node
  for (const section in resumeNode) {
    if (resumeNode.hasOwnProperty(section)) {
      const rawSectionContent = resumeNode[section];
      
      // In our XML, each section's content is a JSON string.
      // Check if it's a string and try parsing it. Otherwise, assume it's already an object.
      let parsedSection: Section;
      if (typeof rawSectionContent === 'string') {
        try {
          parsedSection = JSON.parse(rawSectionContent);
        } catch (error) {
          console.error(`Error parsing JSON for section "${section}":`, error);
          parsedSection = { data: null, analysis: null };
        }
      } else {
        // If for some reason it is already an object, we assign it directly.
        parsedSection = rawSectionContent;
      }
      
      sections[section] = parsedSection;
    }
  }
  
  return { sections };
}
