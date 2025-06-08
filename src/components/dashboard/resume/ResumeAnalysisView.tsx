import React, { useState } from 'react';
import { Search, Loader2, Briefcase, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleJobDescriptions = [
  {
    id: 'frontend',
    title: 'Senior Frontend Developer',
    description: `We are looking for a Senior Frontend Developer with 5+ years of experience in React.js and TypeScript. The ideal candidate should have:\n• Strong experience with modern JavaScript frameworks (React, Vue, or Angular)\n• Proficiency in HTML5, CSS3, and responsive design\n• Experience with state management (Redux, Context API)\n• Knowledge of testing frameworks (Jest, React Testing Library)\n• Understanding of CI/CD pipelines and Git workflows\n• Experience with performance optimization and web vitals\n• Strong problem-solving skills and attention to detail`,
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: `Looking for a Backend Developer to join our team. Requirements:\n• 3+ years of experience with Node.js/Python/Java\n• Strong understanding of RESTful APIs and GraphQL\n• Experience with SQL and NoSQL databases\n• Knowledge of microservices architecture\n• Familiarity with cloud platforms (AWS/GCP/Azure)\n• Understanding of security best practices\n• Experience with Docker and Kubernetes is a plus`,
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: `Full Stack Developer position available. Must have:\n• 4+ years of experience in both frontend and backend development\n• Proficiency in JavaScript/TypeScript and at least one backend language\n• Experience with React.js and Node.js\n• Knowledge of database design and optimization\n• Understanding of cloud services and deployment\n• Experience with agile methodologies\n• Strong communication and team collaboration skills`,
  },
];

interface AnalysisResult {
  matchScore: number;
  strengths: string[];
  improvements: string[];
  missingSkills: string[];
}

const tabs = [
  {
    id: 'jd',
    label: 'Job Description',
    icon: <Briefcase className="w-4 h-4 mr-1" />,
  },
  {
    id: 'results',
    label: 'Analysis Results',
    icon: <FileText className="w-4 h-4 mr-1" />,
  },
];

export const ResumeAnalysisView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jd' | 'results'>('jd');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedSample, setSelectedSample] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const handleSampleSelect = (sampleId: string) => {
    const sample = sampleJobDescriptions.find((s) => s.id === sampleId);
    if (sample) {
      setJobDescription(sample.description);
      setSelectedSample(sampleId);
    }
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    try {
      // TODO: Implement the server action call here
      // const result = await analyzeResume(jobDescription);
      // setAnalysisResult(result);
      // Dummy result for now
      setTimeout(() => {
        setAnalysisResult({
          matchScore: 85,
          strengths: [
            'Strong experience with React.js',
            'Good understanding of TypeScript',
            'Solid background in responsive design',
          ],
          improvements: [
            'Could add more details about testing experience',
            'Consider highlighting cloud platform experience',
          ],
          missingSkills: ['GraphQL', 'Docker'],
        });
        setIsAnalyzing(false);
        setActiveTab('results');
      }, 1200);
    } catch (error) {
      setIsAnalyzing(false);
      console.error('Analysis failed:', error);
    }
  };

  // Animation variants
  const tabContentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <div className="w-full px-2 p-4 lg:p-6 space-y-8">
      <div className=" space-y-1">
        <h1 className="text-2xl font-bold">Resume Analysis</h1>
        <p className="text-muted-foreground">
          Compare your resume against job descriptions to get personalized
          insights
        </p>
      </div>

      {/* Tabs */}
      <div className="relative flex border-b border-muted mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'jd' | 'results')}
            className={`relative px-6 py-2 flex items-center font-medium transition-colors focus:outline-none ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={{ zIndex: 1 }}
            disabled={tab.id === 'results' && !analysisResult}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute left-0 right-0 -bottom-[1.5px] h-[3px] bg-primary rounded-full"
                style={{ zIndex: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'jd' && (
            <motion.div
              key="jd"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="bg-card rounded-xl border p-6 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="w-5 h-5" />
                  <h2>Job Description</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {sampleJobDescriptions.map((sample) => (
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.03 }}
                        key={sample.id}
                        onClick={() => handleSampleSelect(sample.id)}
                        className={`p-3 text-left border rounded-lg transition-all ${
                          selectedSample === sample.id
                            ? 'border-primary bg-primary/5 scale-[1.02]'
                            : 'hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <h3 className="font-medium">{sample.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {sample.description.split('\n')[0]}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  <div className="relative">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => {
                        setJobDescription(e.target.value);
                        setSelectedSample('');
                      }}
                      placeholder="Paste the job description here or select a sample above..."
                      className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px] resize-none"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={handleSubmit}
                    disabled={isAnalyzing || !jobDescription.trim()}
                    className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Analyze Resume
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'results' && (
            <motion.div
              key="results"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {analysisResult ? (
                <div className="bg-card rounded-xl border p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <FileText className="w-5 h-5" />
                      <h2>Analysis Results</h2>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {analysisResult.matchScore}%
                    </div>
                  </div>
                  <div className="grid gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg"
                    >
                      <h3 className="font-medium mb-3 text-green-700 dark:text-green-400">
                        Strengths
                      </h3>
                      <ul className="space-y-2">
                        {analysisResult.strengths.map((strength, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-green-700 dark:text-green-400"
                          >
                            <span className="mt-1">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg"
                    >
                      <h3 className="font-medium mb-3 text-yellow-700 dark:text-yellow-400">
                        Areas to Improve
                      </h3>
                      <ul className="space-y-2">
                        {analysisResult.improvements.map(
                          (improvement, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-yellow-700 dark:text-yellow-400"
                            >
                              <span className="mt-1">⚡</span>
                              <span>{improvement}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg"
                    >
                      <h3 className="font-medium mb-3 text-red-700 dark:text-red-400">
                        Missing Skills
                      </h3>
                      <ul className="space-y-2">
                        {analysisResult.missingSkills.map((skill, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-red-700 dark:text-red-400"
                          >
                            <span className="mt-1">×</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-xl border p-6 flex items-center justify-center min-h-[300px]">
                  <div className="text-center text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Analysis results will appear here</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
