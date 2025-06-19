import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalysisStore } from '@/hooks/useAnalysisStore';
import { useResumeStore } from '@/hooks/useResumeStore';
import { analyseResumeSections } from '@/services/analysis.services';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CoverLetterSection } from './CoverLetterSection';
import { AnalysisResultDisplay } from './job-analysis/AnalysisResultDisplay';
import { JobDetailsForm } from './job-analysis/JobDetailsForm';
import { JobExamples } from './job-analysis/JobExamples';
import { PlatformFeaturesCard } from './job-analysis/PlatformFeaturesCard';

export function JobDescriptionSection() {
  const { resumeSections } = useResumeStore();
  const {
    jobDetails,
    analysisResult,
    isAnalyzing,
    setJobDetails,
    setAnalysisResult,
    setIsAnalyzing,
    clearAnalysis,
    resetJobDetails,
  } = useAnalysisStore();

  // Tab state
  const [activeTab, setActiveTab] = useState('setup');

  const exampleJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      skills: ['React', 'TypeScript', 'CSS'],
      level: 'Senior',
      type: 'Full-time',
      description:
        'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using React.js and ensuring great user experience.\n\nRequirements:\n- 5+ years experience with React.js\n- Strong TypeScript skills\n- Experience with modern CSS frameworks\n- Knowledge of state management (Redux/Zustand)\n- Experience with testing frameworks',
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      skills: ['Node.js', 'React', 'PostgreSQL'],
      level: 'Mid-level',
      type: 'Full-time',
      description:
        "Join our fast-growing startup as a Full Stack Engineer. You'll work on both frontend and backend systems.\n\nRequirements:\n- 3+ years full-stack development\n- Node.js and React experience\n- Database design skills\n- AWS/cloud experience\n- Agile development experience",
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      skills: ['Figma', 'Adobe Creative', 'Prototyping'],
      level: 'Senior',
      type: 'Contract',
      description:
        "We're seeking a creative UX/UI Designer to lead design initiatives.\n\nRequirements:\n- 4+ years design experience\n- Expert in Figma and Adobe Creative Suite\n- User research experience\n- Prototyping skills\n- Portfolio showcasing mobile and web designs",
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions',
      skills: ['Docker', 'Kubernetes', 'AWS'],
      level: 'Senior',
      type: 'Full-time',
      description:
        'Looking for a DevOps Engineer to manage our cloud infrastructure.\n\nRequirements:\n- 4+ years DevOps experience\n- Docker and Kubernetes expertise\n- AWS certification preferred\n- CI/CD pipeline experience\n- Infrastructure as Code (Terraform)',
    },
  ];

  const handleJobSelect = (job: (typeof exampleJobs)[0]) => {
    setJobDetails({
      selectedJobId: job.id,
      jobDescription: job.description,
      jobTitle: job.title,
      company: job.company,
    });
    clearAnalysis();
  };

  const handleAnalyze = async () => {
    const { jobDescription, company, jobTitle } = jobDetails;

    if (!jobDescription || !company || !jobTitle) {
      toast.error('Please provide job description, company name, and job title.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyseResumeSections(resumeSections, {
        jobDescription,
        company,
        role: jobTitle,
      });

      if ('error' in result) {
        toast.error(result.error);
      } else {
        setAnalysisResult(result);
        setActiveTab('analysis'); // Auto-switch to analysis tab
        toast.success('Analysis complete!');
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    clearAnalysis();
    resetJobDetails();
    setActiveTab('setup');
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-3xl font-bold">Job Analysis</h2>
          <p className="text-muted-foreground mt-1">
            Select a job template or enter your own job details for AI analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleNewAnalysis}>
            <Plus className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Job Setup</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analysisResult}>
            Analysis
          </TabsTrigger>
          <TabsTrigger value="cover-letter" disabled={!analysisResult}>
            Cover Letter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <JobExamples
                exampleJobs={exampleJobs}
                selectedJob={exampleJobs.find(job => job.id === jobDetails.selectedJobId) || null}
                onJobSelect={handleJobSelect}
              />
              <JobDetailsForm
                jobTitle={jobDetails.jobTitle}
                setJobTitle={title => setJobDetails({ jobTitle: title })}
                company={jobDetails.company}
                setCompany={company => setJobDetails({ company })}
                jobDescription={jobDetails.jobDescription}
                setJobDescription={description => setJobDetails({ jobDescription: description })}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>
            <div className="space-y-4">
              <PlatformFeaturesCard />
              {analysisResult && (
                <Card className="border-green-200 bg-green-50 shadow-sm">
                  <div className="p-4">
                    <h3 className="font-semibold text-green-800">Analysis Complete!</h3>
                    <p className="mt-1 text-sm text-green-700">
                      Switch to the Analysis tab to view detailed results.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {analysisResult ? (
            <AnalysisResultDisplay analysisResult={analysisResult} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Run an analysis first to see detailed results here.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cover-letter" className="space-y-6">
          {analysisResult ? (
            <CoverLetterSection coverLetter={analysisResult.coverLetter} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Complete an analysis to generate a personalized cover letter.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
