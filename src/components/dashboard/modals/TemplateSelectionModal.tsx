import ClassicResume from '@/assets/classic-resume-placeholder.png';
import CreativeResume from '@/assets/creative-resume-placeholder.png';
import MinimalResume from '@/assets/minimal-resume-placeholder.png';
import ModernResume from '@/assets/modern-resume-placeholder.png';

import ResumePDF from '@/components/template/ResumePDF';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useResumeStore } from '@/hooks/useResumeStore';
import { pdf } from '@react-pdf/renderer';
import FileSaver from 'file-saver';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

type TemplateId = 'modern' | 'classic' | 'minimal' | 'creative';

interface Template {
  id: TemplateId;
  name: string;
  description: string;
  preview: StaticImageData;
}
const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a focus on typography',
    preview: ModernResume,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with a professional look',
    preview: ClassicResume,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern design with creative elements',
    preview: CreativeResume,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design with focus on content',
    preview: MinimalResume,
  },
];

interface TemplateSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateSelectionModal({ isOpen, onClose }: TemplateSectionProps) {
  const { resumeSections } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern');

  const handleSelect = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
  };

  const generatePdfDocument = async () => {
    try {
      const blob = await pdf(
        <ResumePDF sections={resumeSections} template={selectedTemplate} />
      ).toBlob();
      FileSaver.saveAs(
        blob,
        `${selectedTemplate}-${resumeSections.contactInfo?.data.name}-resume.pdf`
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 200);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-5xl rounded-3xl border-0 bg-white p-0 shadow-2xl dark:bg-gray-900">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-center text-xl font-semibold text-gray-900 dark:text-white">
              Select a Template
            </DialogTitle>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Choose a resume template to preview and download as PDF
            </p>
          </DialogHeader>
          <div className="mt-2 grid h-[60vh] grid-cols-1 gap-4 overflow-y-auto md:h-auto md:grid-cols-4">
            {templates.map(template => (
              <Card
                key={template.id}
                className={`group cursor-pointer gap-0 rounded-2xl border p-4 shadow-md transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50/80 to-blue-100/60 ring-2 ring-blue-400/40 dark:border-blue-400 dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-blue-800/30 dark:ring-2 dark:ring-blue-400/40'
                    : 'hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-500'
                } `}
                onClick={() => handleSelect(template.id)}
              >
                <div className="bg-muted relative flex aspect-square h-auto w-full items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="absolute h-full w-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-center text-lg font-semibold text-gray-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-muted-foreground text-center text-sm dark:text-gray-400">
                  {template.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-end gap-2">
            <Button variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            {resumeSections && (
              <Button
                className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={generatePdfDocument}
              >
                Download PDF
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
