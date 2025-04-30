import ClassicResume from '@/assets/classic-resume-placeholder.png';
import MinimalResume from '@/assets/minimal-resume-placeholder.png';
import ModernResume from '@/assets/modern-resume-placeholder.png';
import CreativeResume from '@/assets/creative-resume-placeholder.png';

import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
// import CreativeResume from '@/assets/creative-resume-placeholder.png';
import { ResumeSections } from '@/config/parseSections';
import { pdf } from '@react-pdf/renderer';
import FileSaver from 'file-saver';
import { ResumePDF } from '../template/ResumePDF';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: ResumeSections;
}

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

export function TemplateSelectionModal({
  isOpen,
  onClose,
  sections,
}: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>('modern');

  const handleSelect = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
  };

  const generatePdfDocument = async () => {
    try {
      const blob = await pdf(
        <ResumePDF sections={sections} template={selectedTemplate} />
      ).toBlob();
      FileSaver.saveAs(
        blob,
        `${selectedTemplate}-${sections.contactInfo?.data.name}-resume.pdf`
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm mx-auto md:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>
        <div className="overflow-scroll h-[70vh] md:h-auto grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 p-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`p-4 gap-0 cursor-pointer transition-all ${
                selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSelect(template.id)}
            >
              <div className="aspect-square relative h-auto w-full bg-muted rounded-lg flex items-center justify-center">
                <Image
                  src={template.preview}
                  alt={template.name}
                  fill
                  className="w-full h-full absolute object-fit rounded-lg"
                />
              </div>
              <h3 className="mt-2 text-lg font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-end">
          {sections && (
            <Button className="" onClick={generatePdfDocument}>
              Download PDF
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
