import { SectionAnalysis } from '@/types';

interface ResumeSectionProps {
  type: string;
  data: any;
  analysis: SectionAnalysis | null;
  displayName: string;
  icon: string;
}

export default function ResumeSection({
  type,
  data,
  displayName,
  icon,
}: ResumeSectionProps) {
  switch (type) {
    case 'contactInfo':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-xl font-semibold">{displayName}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium">{data.name}</p>
              <p className="text-sm text-muted-foreground">{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{data.phone}</p>
              <p className="text-sm text-muted-foreground">{data.location}</p>
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      );

    case 'summary':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-xl font-semibold">{displayName}</h2>
          </div>
          <p className="text-muted-foreground">{data.summary}</p>
        </div>
      );

    case 'skills':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-xl font-semibold">{displayName}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.hardSkills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      );

    case 'workExperience':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-xl font-semibold">{displayName}</h2>
          </div>
          {data.map((job: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <p className="text-sm text-muted-foreground">{job.duration}</p>
              </div>

              {job.description && (
                <p className="text-sm text-muted-foreground">
                  {job.description}
                </p>
              )}

              {Array.isArray(job.responsibilities) &&
                job.responsibilities.length > 0 && (
                  <ul className="text-sm list-disc list-inside text-muted-foreground">
                    {job.responsibilities.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

              {Array.isArray(job.achievements) &&
                job.achievements.length > 0 && (
                  <ul className="text-sm list-disc list-inside text-muted-foreground">
                    {job.achievements.map(
                      (achievement: string, idx: number) => (
                        <li key={idx}>{achievement}</li>
                      )
                    )}
                  </ul>
                )}
            </div>
          ))}
        </div>
      );
    case 'education':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-xl font-semibold">{displayName}</h2>
          </div>
          {data.map((edu: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
              </div>
              {(edu.cgpa || edu.percentage) && (
                <p className="text-sm text-muted-foreground">
                  {edu.cgpa
                    ? `CGPA: ${edu.cgpa}`
                    : `Percentage: ${edu.percentage}`}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h2 className="text-xl font-semibold">{displayName}</h2>
          </div>
          {data.map((project: any, index: number) => (
            <div key={index} className="space-y-2">
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
