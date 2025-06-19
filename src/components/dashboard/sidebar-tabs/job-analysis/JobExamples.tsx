import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Job {
  id: number;
  title: string;
  company: string;
  skills: string[];
  level: string;
  type: string;
  description: string;
}

interface JobExamplesProps {
  exampleJobs: Job[];
  selectedJob: Job | null;
  onJobSelect: (job: Job) => void;
}

export function JobExamples({ exampleJobs, selectedJob, onJobSelect }: JobExamplesProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Job Templates</CardTitle>
        <CardDescription>Choose a template to pre-fill the job details form</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {exampleJobs.map(job => (
          <Card
            key={job.id}
            className={`cursor-pointer p-3 transition-all hover:shadow-md ${
              selectedJob && selectedJob.id === job.id ? 'ring-primary ring-2' : ''
            }`}
            onClick={() => onJobSelect(job)}
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">{job.title}</h3>
              <p className="text-muted-foreground text-xs">{job.company}</p>
              <div className="flex gap-1">
                <Badge variant="secondary" className="px-1 py-0 text-xs">
                  {job.level}
                </Badge>
                <Badge variant="outline" className="px-1 py-0 text-xs">
                  {job.type}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 2).map(skill => (
                  <span
                    key={skill}
                    className="bg-primary/10 text-primary rounded px-1 py-0.5 text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 2 && (
                  <span className="text-muted-foreground text-xs">+{job.skills.length - 2}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
