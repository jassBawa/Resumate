'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, FileText, Target, MessageSquare, Download } from 'lucide-react';
import Link from 'next/link';
import DocImage from '@/assets/images/3d-pages-folder.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '@/lib/utils';

export default function HeroSection() {
  const floatingElements = [
    { icon: FileText, delay: 0, position: 'top-1/6 md:top-1/4 left-4 md:left-[20%]' },
    { icon: Target, delay: 1, position: 'top-1/6 md:top-1/4 right-36' },
    { icon: MessageSquare, delay: 2, position: 'bottom-[4%] md:bottom-1/4 left-36' },
    { icon: Download, delay: 3, position: 'bottom-[5%] md:bottom-1/4 right-16 md:right-56' },
  ];

  const handleFeaturesClick = () => {
    smoothScrollTo('features', 100);
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/20 to-blue-400/30 blur-3xl dark:from-blue-400/20 dark:to-purple-400/20"></div>
        <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400/30 via-pink-400/20 to-purple-400/30 blur-3xl dark:from-purple-400/20 dark:to-pink-400/20"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-400/20 via-teal-400/10 to-emerald-400/20 blur-3xl dark:from-emerald-400/10 dark:to-teal-400/10"></div>
      </div>

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-2/3 right-8 z-0 opacity-60 backdrop-blur-sm md:top-1/3 md:right-[10%] dark:opacity-50"
      >
        <Image src={DocImage} alt="Doc Image" className="h-36 w-auto object-contain md:h-60" />
      </motion.div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ y: 0, opacity: 0.4, filter: 'blur(6px)' }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.8, 0.4],
            filter: ['blur(6px)', 'blur(0px)', 'blur(6px)'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: element.delay,
          }}
          className={`absolute ${element.position} pointer-events-none z-0`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
            <element.icon className="h-7 w-7 text-gray-700 dark:text-white/80" />
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Builder
            </div>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Resume Wingman
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create professional resumes with AI assistance. Get job-specific recommendations, ATS
            optimization, and beautiful templates. Your career success starts here.
          </motion.p>

          <motion.div
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            >
              <Link href="/dashboard">
                Start Building Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleFeaturesClick}
              className="border-2 border-gray-300 bg-white/80 px-8 py-3 backdrop-blur-sm transition-all duration-300 hover:border-gray-400 hover:bg-white dark:border-gray-600 dark:bg-gray-800/80 dark:hover:border-gray-500 dark:hover:bg-gray-800"
            >
              See How It Works
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
