import React from 'react';
import { EditSectionCard } from './EditSectionCard';

export const ResumeEditView: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold">Edit Resume Sections</h1>
      <p className="text-muted-foreground mt-1">
        Click on a section to start editing.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EditSectionCard
          title="Personal Information"
          description="Manage your contact details and summary."
        />
        <EditSectionCard
          title="Work Experience"
          description="Detail your professional history."
        />
        <EditSectionCard
          title="Education"
          description="List your academic background."
        />
        <EditSectionCard
          title="Skills"
          description="Showcase your technical and soft skills."
        />
        <EditSectionCard
          title="Projects"
          description="Highlight your personal or professional projects."
        />
      </div>
    </div>
  );
};
