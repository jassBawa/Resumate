import React from 'react';
import { SectionData } from '@/hooks/useResumeUpload';

const ResumeSection: React.FC<{ sectionKey: string; section: SectionData }> = ({
  sectionKey,
  section,
}) => {
  const { data } = section;

  switch (sectionKey) {
    case 'contactInfo':
      return (
        <div className="space-y-1 text-muted-foreground">
          {data.name && <p><strong>Name:</strong> {data.name}</p>}
          {data.email && <p><strong>Email:</strong> {data.email}</p>}
          {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
          {data.location && <p><strong>Location:</strong> {data.location}</p>}
          {data.portfolio && (
            <p>
              <strong>Portfolio:</strong>{' '}
              <a href={data.portfolio} className="text-primary underline" target="_blank">
                {data.portfolio}
              </a>
            </p>
          )}
          {data.profiles?.length > 0 && (
            <p>
              <strong>Profiles:</strong>{' '}
              {data.profiles.map((p: string, i: number) => (
                <span key={i}>
                  <a href={p} target="_blank" className="text-primary underline">
                    {p}
                  </a>
                  {i < data.profiles.length - 1 && ', '}
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
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
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
              <h4 className="font-semibold">{job.title} at {job.company}</h4>
              <p>{job.duration}</p>
            </div>
          ))}
        </div>
      );

    case 'education':
      return (
        <div className="space-y-4 text-muted-foreground">
          {data.map((edu: any, idx: number) => (
            <div key={idx}>
              <h4 className="font-semibold">{edu.degree} - {edu.institution}</h4>
              <p>{edu.duration}</p>
              {edu.cgpa && <p><strong>CGPA:</strong> {edu.cgpa}</p>}
              {edu.percentage && <p><strong>Percentage:</strong> {edu.percentage}</p>}
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
              <p><strong>Technologies:</strong> {project.technologies}</p>
              <a href={project.link} target="_blank" className="text-primary underline">
                View Project
              </a>
            </div>
          ))}
        </div>
      );

    case 'certifications':
      return (
        <div className="space-y-4 text-muted-foreground">
          {data.map((cert: any, idx: number) => (
            <div key={idx}>
              <h4 className="font-semibold">{cert.name}</h4>
              <p><strong>Date:</strong> {cert.date}</p>
              <p><strong>Institution:</strong> {cert.issuer || cert.platform}</p>
              <a href={cert.link} target="_blank" className="text-primary underline">
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

export default ResumeSection;
