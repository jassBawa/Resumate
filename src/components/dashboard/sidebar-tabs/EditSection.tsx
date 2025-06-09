import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Edit, Briefcase, GraduationCap, Award, Globe } from 'lucide-react';
import { ContactInfoForm } from './forms/ContactInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';

export function EditSection() {
  const [activeTab, setActiveTab] = useState('contactInfo');

  const resumeSections_list = [
    {
      id: 'contactInfo',
      title: 'Contact Info',
      icon: User,
    },
    { id: 'summary', title: 'Summary', icon: Edit },
    {
      id: 'workExperience',
      title: 'Work Experience',
      icon: Briefcase,
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
    },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'projects', title: 'Projects', icon: Globe },
    {
      id: 'certifications',
      title: 'Certifications',
      icon: Award,
    },
    { id: 'awards', title: 'Awards', icon: Award },
  ];

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'contactInfo':
        return <ContactInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'workExperience':
        return <WorkExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return (
          <div className="text-muted-foreground py-8 text-center">
            Select a section to start editing
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-3xl font-bold">Edit Resume</h2>
          <p className="text-muted-foreground mt-1">
            Build your professional resume with AI assistance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Resume Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeSections_list.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    activeTab === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <div>
                    <p className="font-medium">{section.title}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="border shadow-sm">
            <CardContent className="pt-6">{renderActiveForm()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
