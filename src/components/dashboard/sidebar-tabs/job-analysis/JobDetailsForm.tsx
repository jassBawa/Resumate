import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface JobDetailsFormProps {
  jobTitle: string;
  setJobTitle: (title: string) => void;
  company: string;
  setCompany: (company: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function JobDetailsForm({
  jobTitle,
  setJobTitle,
  company,
  setCompany,
  jobDescription,
  setJobDescription,
  onAnalyze,
  isAnalyzing,
}: JobDetailsFormProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>
          Edit the job details below or select a template above to pre-fill
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g. Senior Software Engineer"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Company name"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            onClick={onAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
