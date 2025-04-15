import React from 'react';
import { SectionData } from '@/hooks/useResumeUpload';
import { ExternalLink, Mail, Phone, MapPin, Link } from 'lucide-react';

const ResumeSection: React.FC<{ sectionKey: string; section: SectionData }> = ({
  sectionKey,
  section,
}) => {
  const { data } = section;

  switch (sectionKey) {
    case 'contactInfo':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.name && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">👤</span>
              <span className="text-lg font-medium">{data.name}</span>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${data.email}`} className="text-primary hover:underline">
                {data.email}
              </a>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${data.phone}`} className="text-primary hover:underline">
                {data.phone}
              </a>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{data.location}</span>
            </div>
          )}
          {data.portfolio && (
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4 text-muted-foreground" />
              <a href={data.portfolio} className="text-primary hover:underline" target="_blank">
                {data.portfolio}
              </a>
            </div>
          )}
          {data.profiles?.length > 0 && (
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {data.profiles.map((p: string, i: number) => (
                  <a key={i} href={p} target="_blank" className="text-primary hover:underline">
                    {p}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case 'summary':
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
        </div>
      );

    case 'skills':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(data).map(([key, value]: [string, any]) => {
            if (!Array.isArray(value)) return null;
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
            return (
              <div key={key} className="space-y-2">
                <h3 className="font-semibold text-primary">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {value.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );

    case 'workExperience':
      return (
        <div className="space-y-6">
          {data.map((job: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{job.title}</h4>
                  <p className="text-primary">{job.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{job.duration}</span>
              </div>
              {job.description && (
                <p className="text-muted-foreground text-sm">{job.description}</p>
              )}
              {job.achievements && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {job.achievements.map((achievement: string, idx: number) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );

    case 'education':
      return (
        <div className="space-y-6">
          {data?.map((edu: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{edu.degree}</h4>
                  <p className="text-primary">{edu.institution}</p>
                </div>
                <span className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</span>
              </div>
              {(edu.cgpa || edu.percentage) && (
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                  {edu.percentage && <span>Percentage: {edu.percentage}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-semibold text-lg">{project.name}</h4>
              <p className="text-muted-foreground text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.split(',').map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      );

    case 'certifications':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((cert: any, idx: number) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-semibold text-lg">{cert.name}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Date: {cert.date}</p>
                <p>Institution: {cert.issuer || cert.platform}</p>
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Verify Certification
                </a>
              )}
            </div>
          ))}
        </div>
      );

    default:
      return <p className="text-muted-foreground">No content available</p>;
  }
};

export default ResumeSection;
