import { Download, FileText, MessageSquare, Target } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chatbot',
      description: 'Get instant feedback and suggestions from our AI assistant',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: Target,
      title: 'Job Analysis',
      description: 'Analyze job descriptions and optimize your resume accordingly',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: FileText,
      title: 'Manual Editing',
      description: 'Full control over your content with our intuitive editor',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Export professional PDFs ready for job applications',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section id="features" className="bg-white/50 py-20 dark:bg-[#23272f]/50">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            From AI-powered analysis to professional templates, we've got you covered.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/60 p-6 text-center shadow-lg backdrop-blur-sm dark:bg-[#23272f]/60"
            >
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient}`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
