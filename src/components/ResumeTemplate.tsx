// components/ResumeLayout.tsx
import { ResumeSections } from '@/config/parseSections';
import { SectionData } from '@/hooks/useResumeUpload';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import React from 'react';

interface ResumeLayoutProps {
  sections: ResumeSections;
}

const HoverSuggestion: React.FC<{ analysis: any; tooltipId: string }> = ({
  analysis,
}) => {
  if (!analysis) return null;

  let tooltipContent = `${analysis.summary || ''}`;
  if (analysis.suggestions) {
    const suggestions = Array.isArray(analysis.suggestions)
      ? analysis.suggestions.join(' ')
      : analysis.suggestions;
    tooltipContent += `\nSuggestions: ${suggestions}`;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-4 h-4 text-muted-foreground ml-2 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs whitespace-pre-line">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ResumeLayout: React.FC<ResumeLayoutProps> = ({ sections }) => {
  const sectionOrder: { key: string; displayName: string }[] = [
    { key: 'contactInfo', displayName: 'Contact Information' },
    { key: 'summary', displayName: 'Summary' },
    { key: 'skills', displayName: 'Skills' },
    { key: 'workExperience', displayName: 'Work Experience' },
    { key: 'education', displayName: 'Education' },
    { key: 'projects', displayName: 'Projects' },
    { key: 'certifications', displayName: 'Certifications' },
  ];

  const renderSectionContent = (sectionKey: string, section: SectionData) => {
    const { data } = section;
    console.log(section);
    switch (sectionKey) {
      case 'contactInfo':
        return (
          <div className="space-y-1 text-muted-foreground">
            {data.name && (
              <p>
                <strong>Name:</strong> {data.name}
              </p>
            )}
            {data.email && (
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            )}
            {data.phone && (
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
            )}
            {data.location && (
              <p>
                <strong>Location:</strong> {data.location}
              </p>
            )}
            {data.portfolio && (
              <p>
                <strong>Portfolio:</strong>{' '}
                <a
                  href={data.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {data.portfolio}
                </a>
              </p>
            )}
            {data.profiles?.length > 0 && (
              <p>
                <strong>Profiles:</strong>{' '}
                {data.profiles.map((profile: string, idx: number) => (
                  <span key={idx}>
                    <a
                      href={profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {profile}
                    </a>
                    {idx < data.profiles.length - 1 && ', '}
                  </span>
                ))}
              </p>
            )}
          </div>
        );
      case 'summary':
        return <p className="text-muted-foreground">{data.summary}</p>;
      case 'skills':
        return (
          <div className="space-y-4 text-muted-foreground">
            {Object.entries(data).map(([key, value]: [string, any]) => {
              if (!Array.isArray(value)) return null;

              // Format the key to a readable label (e.g., "hardSkills" -> "Hard Skills")
              const label = key
                .replace(/([A-Z])/g, ' $1') // insert space before capital letters
                .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter

              return (
                <div key={key}>
                  <h3 className="font-semibold">{label}:</h3>
                  <ul className="list-disc list-inside ml-4">
                    {value.map((skill: string, idx: number) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      case 'workExperience':
        return (
          <div className="space-y-4 text-muted-foreground">
            {data.map((job: any, idx: number) => (
              <div key={idx}>
                <h4 className="font-semibold">
                  {job.position} at {job.company}
                </h4>
                <p>{job.duration}</p>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4 text-muted-foreground">
            {data?.map((edu: any, idx: number) => (
              <div key={idx}>
                <h4 className="font-semibold">
                  {edu.degree} - {edu.institution}
                </h4>
                <p>{edu.duration}</p>
                {edu.cgpa && (
                  <p>
                    <strong>CGPA:</strong> {edu.cgpa}
                  </p>
                )}
                {edu.percentage && (
                  <p>
                    <strong>Percentage:</strong> {edu.percentage}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4 text-muted-foreground">
            {data.map((project: any, idx: number) => (
              <div key={idx}>
                <h4 className="font-semibold">{project.title}</h4>
                <p>{project.description}</p>
                <p>
                  <strong>Technologies:</strong> {project.technologies}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-4 text-muted-foreground">
            {data?.map((cert: any, idx: number) => (
              <div key={idx}>
                <h4 className="font-semibold">{cert.name}</h4>
                <p>
                  <strong>Date:</strong> {cert.date}
                </p>
                <p>
                  <strong>Institution:</strong> {cert.issuer || cert.platform}
                </p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Verify Certification
                </a>
              </div>
            ))}
          </div>
        );
      default:
        return <p className="text-muted-foreground">No content available</p>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {sectionOrder.map(({ key, displayName }, idx) => {
        const section = sections[key];
        if (!section) return null;
        return (
          <Card key={key}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{displayName}</h2>
                <HoverSuggestion
                  analysis={section.analysis}
                  tooltipId={`${key}-tooltip`}
                />
              </div>
              {renderSectionContent(key, section)}
            </CardContent>
            {idx < sectionOrder.length - 1 && <Separator />}
          </Card>
        );
      })}
    </div>
  );
};

export default ResumeLayout;
