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
        {exampleJobs.map(job => {
          const isSelected = selectedJob && selectedJob.id === job.id;
          return (
            <Card
              key={job.id}
              className={`cursor-pointer border p-3 shadow-sm transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-gradient-to-br from-blue-400/10 to-blue-400/25 ring-2 ring-blue-400/40 dark:border-blue-400 dark:bg-gradient-to-br dark:from-blue-900/60 dark:to-blue-800/40 dark:ring-2 dark:ring-blue-400/40'
                  : 'hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-500'
              } `}
              onClick={() => onJobSelect(job)}
            >
              <div className="space-y-2">
                <h3
                  className={`text-sm font-semibold ${isSelected ? 'text-blue-900 dark:text-blue-200' : 'dark:text-white'}`}
                >
                  {job.title}
                </h3>
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
          );
        })}
      </CardContent>
    </Card>
  );
}
