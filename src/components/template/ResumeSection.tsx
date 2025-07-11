interface ResumeSectionProps {
  type: string;
  data: any;
}

export default function ResumeSection({ type, data }: ResumeSectionProps) {
  switch (type) {
    case 'contactInfo':
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium">{data.name}</p>
              <p className="text-muted-foreground text-sm">{data.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{data.phone}</p>
              <p className="text-muted-foreground text-sm">{data.location}</p>
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
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
          <p className="text-muted-foreground">{data.summary}</p>
        </div>
      );

    case 'skills':
      return (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-muted rounded-full px-3 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      );

    case 'workExperience':
      return (
        <div className="space-y-4">
          {data.map((job: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">{job.company}</p>
                </div>
                <p className="text-muted-foreground text-sm">{job.duration}</p>
              </div>

              {job.description && (
                <p className="text-muted-foreground text-sm">{job.description}</p>
              )}

              {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                <ul className="text-muted-foreground list-inside list-disc text-sm">
                  {job.responsibilities.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {Array.isArray(job.achievements) && job.achievements.length > 0 && (
                <ul className="text-muted-foreground list-inside list-disc text-sm">
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
        <div className="space-y-4">
          {data.map((edu: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-muted-foreground text-sm">{edu.institution}</p>
                </div>
                <p className="text-muted-foreground text-sm">{edu.duration}</p>
              </div>
              {(edu.cgpa || edu.percentage) && (
                <p className="text-muted-foreground text-sm">
                  {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-4">
          {data.map((project: any, index: number) => (
            <div key={index} className="space-y-2">
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span key={idx} className="bg-muted rounded-full px-2 py-1 text-xs">
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
                  className="text-primary text-sm hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      );

    case 'certifications':
      return (
        <div className="space-y-4">
          {data.map((cert: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                </div>
                <p className="text-muted-foreground text-sm">{cert.date}</p>
              </div>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      );

    case 'publications':
      return (
        <div className="space-y-4">
          {data.map((pub: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{pub.title}</h3>
                  <p className="text-muted-foreground text-sm">{pub.publication}</p>
                </div>
                <p className="text-muted-foreground text-sm">{pub.date}</p>
              </div>
              {pub.url && (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  View Publication
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
