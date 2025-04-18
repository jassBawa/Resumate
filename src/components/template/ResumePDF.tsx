import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { ResumeSections } from '@/config/parseSections';
import {
  MinimalTemplate,
  ClassicTemplate,
  CreativeTemplate,
  ModernTemplate,
} from './pdf-templates';

interface ResumePDFProps {
  sections: ResumeSections;
  template: 'modern' | 'classic' | 'minimal' | 'creative';
}

export function ResumePDF({ sections, template }: ResumePDFProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate sections={sections} />;
      case 'classic':
        return <ClassicTemplate sections={sections} />;
      case 'minimal':
        return <MinimalTemplate sections={sections} />;
      case 'creative':
        return <CreativeTemplate sections={sections} />;
      default:
        return <CreativeTemplate sections={sections} />;
    }
  };

  return (
    <Document>
      <Page size="A4" wrap={false}>
        {renderTemplate()}
      </Page>
    </Document>
  );
}

export default ResumePDF;
