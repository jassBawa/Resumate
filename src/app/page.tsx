import { AnimatedNavbar } from '@/components/ui/navbar';
import {
  CTASection,
  FeaturesSection,
  Footer,
  HeroSection,
  VideoSection,
} from '@/components/landing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ResuMate - AI-Powered Resume Builder | Create Professional Resumes',
  description:
    'Build professional resumes with AI assistance. Get job-specific recommendations, ATS optimization, and beautiful templates. Your career success starts here with ResuMate.',
  keywords: [
    'resume builder',
    'AI resume',
    'professional resume',
    'ATS optimization',
    'career',
    'job application',
    'resume templates',
  ],
  openGraph: {
    title: 'ResuMate - AI-Powered Resume Builder',
    description: 'Create professional resumes with AI assistance and beautiful templates',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-[#181a20] dark:via-[#1a1d26] dark:to-[#15171e]">
      <AnimatedNavbar />
      <HeroSection />
      <FeaturesSection />
      <VideoSection />
      <CTASection />
      <Footer />
    </div>
  );
}
