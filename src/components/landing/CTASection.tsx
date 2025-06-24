import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">Ready to Build Your Dream Resume?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
          Join thousands of professionals who have landed their dream jobs with ResuMate.
        </p>
        <Button size="lg" asChild className="bg-white px-8 py-3 text-blue-600 hover:bg-gray-100">
          <Link href="/dashboard">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
