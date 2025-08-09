import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Features',
      links: [
        { label: 'AI Chatbot' },
        { label: 'Job Analysis' },
        { label: 'Manual Editing' },
        { label: 'PDF Export' },
      ],
    },
    {
      title: 'Company',
      links: [{ label: 'Contact', href: '/contact' }],
    },
  ] as const;

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ResuMate</span>
            </div>
            <p className="text-gray-400">
              Your AI-powered resume wingman. Create professional resumes that get you hired.
            </p>
          </div>

          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map(link => (
                  <li key={link.label}>
                    {section.title === 'Features' || !('href' in link) ? (
                      <span className="cursor-default opacity-90 select-none">{link.label}</span>
                    ) : (
                      <Link href={link.href!} className="hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ResuMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
