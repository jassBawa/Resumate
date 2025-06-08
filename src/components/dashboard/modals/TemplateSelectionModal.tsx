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
      <DialogContent className="md:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>
        <div className="mt-4 grid h-[70vh] grid-cols-1 gap-3 overflow-y-auto p-4 md:h-auto md:grid-cols-4">
          {templates.map(template => (
            <Card
              key={template.id}
              className={`cursor-pointer gap-0 p-4 transition-all ${
                selectedTemplate === template.id ? 'ring-primary ring-2' : ''
              }`}
              onClick={() => handleSelect(template.id)}
            >
              <div className="bg-muted relative flex aspect-square h-auto w-full items-center justify-center rounded-lg">
                <Image
                  src={template.preview}
                  alt={template.name}
                  fill
                  className="object-fit absolute h-full w-full rounded-lg"
                />
              </div>
              <h3 className="mt-2 text-lg font-semibold">{template.name}</h3>
              <p className="text-muted-foreground text-sm">{template.description}</p>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-end">
          {resumeSections && (
            <Button className="" onClick={generatePdfDocument}>
              Download PDF
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
