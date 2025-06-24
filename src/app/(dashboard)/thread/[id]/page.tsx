import ResumeDropZone from '@/components/resume/ResumeDropzone';
import { getThreadById } from '@/lib/actions/threads';
import DashboardLayout from './DashboardLayout';
import { notFound } from 'next/navigation';
import {
  FileText,
  Sparkles,
  Target,
  MessageSquare,
  Download,
  Shield,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Builder - ResuMate | Build Your Perfect Resume',
  description:
    'Create and enhance your resume with AI assistance. Upload your existing resume or start from scratch with professional templates and real-time AI suggestions.',
  robots: 'noindex, nofollow', // Resume builder should not be indexed
};

async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = await params;
  const { data: threadData, error: threadError, status } = await getThreadById(threadId);

  // Handle 404 errors and non-existent threads
  if (status === 404 || !threadData) {
    notFound();
  }

  // Handle other errors (optional: you could show an error page instead)
  if (threadError) {
    throw new Error(`Failed to load thread: ${threadError}`);
  }

  const isResumeUploaded = threadData.fileId !== null && threadData.fileId !== '';

  return (
    <>
      {!isResumeUploaded ? (
        <div className="min-h-screen flex-1 bg-gradient-to-br from-[#f6f8fa] via-white to-[#f0f4f8] dark:from-[#181a20] dark:via-[#1a1d26] dark:to-[#15171e]">
          {/* Header Section */}
          <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-[#353945] dark:bg-[#23272f]/80">
            <div className="container mx-auto px-6 py-8">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  New Resume Project
                </div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                  Let's Build Your Perfect Resume
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                  Upload your existing resume and let our AI help you enhance it, or start from
                  scratch with our professional templates.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Upload Section */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    Upload Your Resume
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start by uploading your existing resume. We'll analyze it and help you improve
                    it.
                  </p>
                </div>
                <ResumeDropZone threadId={threadId} />
              </div>

              {/* Features & Benefits */}
              <div className="space-y-8">
                <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/60">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    What You'll Get
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          ATS Optimization
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Ensure your resume passes through Applicant Tracking Systems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                        <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">AI Assistant</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Get real-time suggestions and improvements from our AI
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Professional Export
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Download polished PDFs ready for job applications
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Quick Tips
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span>Use clear, action-oriented language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span>Include quantifiable achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span>Keep it concise and relevant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span>Tailor content to job requirements</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/60">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                      <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Secure & Private
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your resume data is encrypted and secure. We never share your information with
                    third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-16 text-center">
              <div className="mx-auto max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                  Join thousands of professionals who have successfully used ResuMate to advance
                  their careers.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>AI-Powered Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span>Professional Templates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>Instant Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DashboardLayout threadId={threadId} />
      )}
    </>
  );
}

export default ThreadPage;
