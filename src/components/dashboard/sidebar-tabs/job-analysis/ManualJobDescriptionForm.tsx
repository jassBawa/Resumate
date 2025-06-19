import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

interface ManualJobDescriptionFormProps {
  manualDescription: string;
  setManualDescription: (desc: string) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  company: string;
  setCompany: (company: string) => void;
  onAnalyze: (jobContext: { jobDescription: string; company: string; role: string }) => void;
  isAnalyzing: boolean;
}

export function ManualJobDescriptionForm({
  manualDescription,
  setManualDescription,
  jobTitle,
  setJobTitle,
  company,
  setCompany,
  onAnalyze,
  isAnalyzing,
}: ManualJobDescriptionFormProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Manual Job Description</CardTitle>
        <CardDescription>Paste or type a job description for analysis</CardDescription>
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
              value={manualDescription}
              onChange={e => setManualDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <Button
            className="w-full"
            onClick={() =>
              onAnalyze({
                jobDescription: manualDescription,
                company,
                role: jobTitle,
              })
            }
            disabled={isAnalyzing}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Job Description'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
