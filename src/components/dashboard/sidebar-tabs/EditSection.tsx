import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Edit, Briefcase, GraduationCap, Award, Globe, BookOpen } from 'lucide-react';
import { ContactInfoForm } from './forms/ContactInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { PublicationsForm } from './forms/PublicationsForm';

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
    {
      id: 'publications',
      title: 'Publications',
      icon: BookOpen,
    },
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
      case 'certifications':
        return <CertificationsForm />;
      case 'publications':
        return <PublicationsForm />;
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
          <h2 className="text-foreground text-3xl font-bold tracking-tight">Edit Resume</h2>
          <p className="text-muted-foreground mt-1">
            Build your professional resume with AI assistance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="border shadow-lg dark:border-[#353945] dark:bg-[#23272f]">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">Resume Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resumeSections_list.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                    activeTab === section.id
                      ? 'scale-[1.03] border border-neutral-200 font-semibold dark:border-neutral-600 dark:bg-[#232c3b]'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#232c3b]'
                  } `}
                  style={{ outline: 'none' }}
                >
                  <section.icon
                    className={`h-5 w-5 flex-shrink-0 text-blue-400 dark:text-blue-300`}
                  />
                  <span>{section.title}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="border shadow-lg dark:border-[#353945] dark:bg-[#23272f]">
            <CardContent className="pt-6">{renderActiveForm()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
