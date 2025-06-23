'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, FileText, Shield, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const featureCards = [
  {
    icon: Target,
    title: 'Job Matching',
    description: 'Our AI analyzes job descriptions and matches your skills for better applications',
    color: 'from-blue-500 to-purple-600',
  },
  {
    icon: FileText,
    title: 'Smart Templates',
    description: 'Choose from professional templates designed for different industries',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Track how your resume performs and get insights for improvements',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Shield,
    title: 'ATS Optimized',
    description: 'Ensure your resume passes through Applicant Tracking Systems',
    color: 'from-indigo-500 to-blue-600',
  },
];

const bestPractices = [
  'Use action verbs to start bullet points',
  'Quantify achievements with numbers',
  'Tailor content for each job application',
  'Keep it concise - 1-2 pages maximum',
  'Use relevant keywords from job descriptions',
  'Proofread for grammar and spelling',
];

const LoadingAnimation = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const tips = [
    '💡 Pro tip: Use the job description to identify key skills and keywords',
    '🎯 Focus on achievements rather than just responsibilities',
    '📊 Quantify your impact with specific numbers and percentages',
    '🔍 Customize your resume for each position you apply to',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <>
      <div className="min-h-screen flex-1 bg-gradient-to-br from-[#f6f8fa] via-white to-[#f0f4f8] p-6 dark:from-[#181a20] dark:via-[#1a1d26] dark:to-[#15171e]">
        <div className="mx-auto max-w-6xl">
          {/* Static Extraction Message */}
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 shadow-xl ring-2 ring-blue-200/50 backdrop-blur-sm dark:from-blue-900/30 dark:to-purple-900/30 dark:ring-blue-500/20">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-lg" />
                <span className="h-3 w-3 animate-pulse rounded-full bg-purple-500 shadow-lg [animation-delay:0.2s]" />
                <span className="h-3 w-3 animate-pulse rounded-full bg-pink-500 shadow-lg [animation-delay:0.4s]" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ⏳{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  First time
                </span>{' '}
                it takes a moment to extract your resume content...
              </span>
            </div>
          </motion.div>

          {/* Premium Layout Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center lg:text-left">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ResuMate
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Your AI-powered resume wingman. Let's create something amazing together.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {featureCards.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-[#23272f]/60"
                  >
                    <div
                      className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${feature.color} p-3 text-white shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Tips & Best Practices */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Rotating Tips */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pro Tips</h3>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTip}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg font-medium text-gray-800 dark:text-gray-200"
                  >
                    {tips[currentTip]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Best Practices */}
              <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/60">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Best Practices</h3>
                </div>
                <div className="space-y-3">
                  {bestPractices.map((practice, index) => (
                    <motion.div
                      key={practice}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{practice}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Start Guide */}
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 dark:from-emerald-900/20 dark:to-teal-900/20">
                <div className="mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quick Start</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      1
                    </span>
                    <span>Upload your existing resume or start fresh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      2
                    </span>
                    <span>Choose a professional template</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      3
                    </span>
                    <span>Add job description for AI optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      4
                    </span>
                    <span>Export and apply with confidence</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
