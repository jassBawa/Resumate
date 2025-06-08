import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, BarChart3, FileText, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function JobDescriptionSection() {
  const [selectedJob, setSelectedJob] = useState('');
  const [manualDescription, setManualDescription] = useState('');

  const exampleJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      level: 'Senior',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
      level: 'Mid-level',
      type: 'Full-time',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      skills: ['Figma', 'Adobe Creative', 'Prototyping', 'User Research'],
      level: 'Senior',
      type: 'Contract',
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      level: 'Senior',
      type: 'Full-time',
    },
  ];

  const analysisMetrics = [
    { label: 'Match Score', value: '85%', trend: 'up' },
    { label: 'Skill Match', value: '78%', trend: 'up' },
    { label: 'Experience Match', value: '92%', trend: 'up' },
    { label: 'Keyword Density', value: '65%', trend: 'down' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-3xl font-bold">Job Analysis</h2>
          <p className="text-muted-foreground mt-1">
            Analyze job descriptions and optimize your resume
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search Jobs
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <Tabs defaultValue="examples" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="examples">Job Examples</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Select Job Description</CardTitle>
                  <CardDescription>Choose from examples or add your own</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {exampleJobs.map(job => (
                      <Card
                        key={job.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedJob === job.id.toString() ? 'ring-primary ring-2' : ''
                        }`}
                        onClick={() => setSelectedJob(job.id.toString())}
                      >
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-muted-foreground text-sm">{job.company}</p>
                            <div className="flex gap-2">
                              <Badge variant="secondary">{job.level}</Badge>
                              <Badge variant="outline">{job.type}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {job.skills.slice(0, 3).map(skill => (
                                <span
                                  key={skill}
                                  className="bg-primary/10 text-primary rounded px-2 py-1 text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                              {job.skills.length > 3 && (
                                <span className="text-muted-foreground text-xs">
                                  +{job.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Manual Job Description</CardTitle>
                  <CardDescription>Paste or type a job description for analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" placeholder="e.g. Senior Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Company name" />
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
                    <Button className="w-full">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analyze Job Description
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Import from URL
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    Search LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Skill Matcher
                  </Button>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Analyses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="border-primary border-l-2 pl-3">
                      <div className="font-medium">Frontend Developer</div>
                      <div className="text-muted-foreground">Tech Startup</div>
                      <div className="text-muted-foreground text-xs">Match: 87%</div>
                    </div>
                    <div className="border-l-2 border-orange-400 pl-3">
                      <div className="font-medium">Full Stack Engineer</div>
                      <div className="text-muted-foreground">Enterprise Corp</div>
                      <div className="text-muted-foreground text-xs">Match: 72%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Resume Match Analysis</CardTitle>
                  <CardDescription>
                    How well your resume matches the job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {analysisMetrics.map(metric => (
                      <div key={metric.label} className="text-center">
                        <div className="mb-1 flex items-center justify-center gap-1">
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <TrendingUp
                            className={`h-4 w-4 ${
                              metric.trend === 'up' ? 'text-green-500' : 'text-orange-500'
                            }`}
                          />
                        </div>
                        <div className="text-muted-foreground text-sm">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Docker', 'Kubernetes', 'GraphQL', 'Python'].map(keyword => (
                          <Badge key={keyword} variant="destructive" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-semibold">Matching Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'JavaScript', 'Node.js', 'AWS'].map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Suggestions to improve your resume match</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3">
                      <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      <div>
                        <h4 className="font-medium">Add Docker experience</h4>
                        <p className="text-muted-foreground text-sm">
                          Consider adding Docker projects to your experience section
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                      <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <div>
                        <h4 className="font-medium">Highlight React expertise</h4>
                        <p className="text-muted-foreground text-sm">
                          Your React skills are well-matched. Consider emphasizing them more
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-orange-50 p-3">
                      <div className="mt-2 h-2 w-2 rounded-full bg-orange-500"></div>
                      <div>
                        <h4 className="font-medium">Include Python projects</h4>
                        <p className="text-muted-foreground text-sm">
                          Add Python experience to match the job requirements better
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Overall Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-primary mb-2 text-4xl font-bold">85%</div>
                  <div className="text-muted-foreground">Resume Match</div>
                  <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Action Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Update Skills
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Add Keywords
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Re-analyze
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
