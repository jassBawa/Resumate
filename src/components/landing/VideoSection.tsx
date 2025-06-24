'use client';

import { CheckCircle, Download, FileText, MessageSquare, Play, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const videoSections = [
  {
    id: 'ai-chatbot',
    icon: MessageSquare,
    title: 'Get Instant AI Feedback',
    subtitle: 'AI Chatbot Assistant',
    description:
      'Our AI chatbot provides real-time suggestions, answers questions, and helps you improve your resume content. Get professional advice anytime, anywhere.',
    features: [
      'Real-time content suggestions',
      'Grammar and style improvements',
      'Industry-specific advice',
    ],
    gradient: 'from-blue-100 to-purple-100',
    darkGradient: 'from-blue-900/20 to-purple-900/20',
    playIconColor: 'text-blue-600',
    badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    order: 'default',
    videoSrc: '/videos/AI-bot-chat.webm',
  },
  {
    id: 'job-analysis',
    icon: Target,
    title: 'Optimize for Any Job',
    subtitle: 'Smart Job Analysis',
    description:
      'Upload job descriptions and let our AI analyze requirements, extract keywords, and suggest improvements to make your resume stand out.',
    features: ['Keyword extraction and matching', 'Skills gap analysis', 'ATS optimization score'],
    gradient: 'from-emerald-100 to-teal-100',
    darkGradient: 'from-emerald-900/20 to-teal-900/20',
    playIconColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
    order: 'reversed',
    videoSrc: '/videos/Job-analysis.webm',
  },
  {
    id: 'manual-editing',
    icon: FileText,
    title: 'Full Control Over Your Content',
    subtitle: 'Intuitive Editor',
    description:
      'Our powerful editor gives you complete control. Add, edit, and format your content with ease. Real-time preview ensures your resume looks perfect.',
    features: ['Real-time preview', 'Professional formatting'],
    gradient: 'from-orange-100 to-red-100',
    darkGradient: 'from-orange-900/20 to-red-900/20',
    playIconColor: 'text-orange-600',
    badgeColor: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    order: 'default',
    videoSrc: '/videos/Resume-editor.webm',
  },
  {
    id: 'pdf-export',
    icon: Download,
    title: 'Export & Track Versions',
    subtitle: 'Export & Version Control',
    description:
      'Export professional PDFs and manage multiple versions of your resume. Keep track of changes and revert when needed.',
    features: ['High-quality PDF export', 'Version history tracking', 'Easy version comparison'],
    gradient: 'from-purple-100 to-pink-100',
    darkGradient: 'from-purple-900/20 to-pink-900/20',
    playIconColor: 'text-purple-600',
    badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    order: 'reversed',
    videoSrc: '/videos/Export-pdf-versioning.webm',
  },
];
export default function VideoSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            See ResuMate in Action
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Watch how our AI-powered features help you create the perfect resume.
          </p>
        </motion.div>

        {videoSections.map((section, index) => {
          return (
            <motion.div
              key={section.id}
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <motion.div
                  className={section.order === 'reversed' ? 'lg:order-2' : ''}
                  initial={{ opacity: 0, x: section.order === 'reversed' ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${section.badgeColor}`}
                    >
                      <section.icon className="h-4 w-4" />
                      {section.subtitle}
                    </div>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                    {section.description}
                  </p>
                  <ul className="space-y-3">
                    {section.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className={`relative ${section.order === 'reversed' ? 'lg:order-1' : ''}`}
                  initial={{ opacity: 0, x: section.order === 'reversed' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div
                    className={`flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} shadow-xl dark:${section.darkGradient} overflow-hidden`}
                  >
                    {section.videoSrc ? (
                      <video
                        className="h-full w-full rounded-2xl object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={section.videoSrc} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-lg">
                          <Play className={`ml-1 h-8 w-8 ${section.playIconColor}`} />
                        </div>
                        <p className="font-medium text-gray-600 dark:text-gray-400">
                          {section.subtitle} Demo Video
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
