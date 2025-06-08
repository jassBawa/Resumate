import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Plus,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Edit,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
import { useResumeStore } from '@/hooks/useResumeStore';

export function EditSection() {
  const [activeTab, setActiveTab] = useState('contactInfo');
  const { resumeSections, updateSection } = useResumeStore();

  const resumeSections_list = [
    {
      id: 'contactInfo',
      title: 'Contact Info',
      icon: User,
      description: 'Personal contact information',
    },
    { id: 'summary', title: 'Summary', icon: Edit, description: 'Professional summary' },
    {
      id: 'workExperience',
      title: 'Work Experience',
      icon: Briefcase,
      description: 'Employment history',
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      description: 'Academic background',
    },
    { id: 'skills', title: 'Skills', icon: Award, description: 'Technical & soft skills' },
    { id: 'projects', title: 'Projects', icon: Globe, description: 'Notable projects' },
    {
      id: 'certifications',
      title: 'Certifications',
      icon: Award,
      description: 'Professional certifications',
    },
    { id: 'awards', title: 'Awards', icon: Award, description: 'Recognition & awards' },
  ];

  const handleAIEdit = (section: string) => {
    console.log(`AI editing for ${section} section`);
    // This will trigger the chat widget with context about the section
  };

  const renderContactInfoForm = () => (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAIEdit('contactInfo')}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Edit
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Jane Doe"
          value={resumeSections.contactInfo?.data?.name || ''}
          onChange={e =>
            updateSection('contactInfo', {
              data: { ...resumeSections.contactInfo?.data, name: e.target.value },
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="email"
              placeholder="jane@example.com"
              className="pl-9"
              value={resumeSections.contactInfo?.data?.email || ''}
              onChange={e =>
                updateSection('contactInfo', {
                  data: { ...resumeSections.contactInfo?.data, email: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="phone"
              placeholder="+1-234-567-8900"
              className="pl-9"
              value={resumeSections.contactInfo?.data?.phone || ''}
              onChange={e =>
                updateSection('contactInfo', {
                  data: { ...resumeSections.contactInfo?.data, phone: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            id="location"
            placeholder="New York, NY"
            className="pl-9"
            value={resumeSections.contactInfo?.data?.location || ''}
            onChange={e =>
              updateSection('contactInfo', {
                data: { ...resumeSections.contactInfo?.data, location: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <div className="relative">
          <Linkedin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/janedoe"
            className="pl-9"
            value={resumeSections.contactInfo?.data?.linkedin || ''}
            onChange={e =>
              updateSection('contactInfo', {
                data: { ...resumeSections.contactInfo?.data, linkedin: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="x">X (Twitter)</Label>
        <div className="relative">
          <Twitter className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            id="x"
            placeholder="x.com/username"
            className="pl-9"
            value={resumeSections.contactInfo?.data?.x || ''}
            onChange={e =>
              updateSection('contactInfo', {
                data: { ...resumeSections.contactInfo?.data, x: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderSummaryForm = () => (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Professional Summary</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAIEdit('summary')}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Enhance
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          placeholder="Brief description of your professional background..."
          className="min-h-[150px]"
          value={resumeSections.summary?.data?.summary || ''}
          onChange={e =>
            updateSection('summary', {
              data: { summary: e.target.value },
            })
          }
        />
      </div>
    </div>
  );

  const renderWorkExperienceForm = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAIEdit('workExperience')}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Optimize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const currentData = resumeSections.workExperience?.data || [];
              updateSection('workExperience', {
                data: [
                  ...currentData,
                  { title: '', company: '', duration: '', responsibilities: [] },
                ],
              });
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      </div>

      {resumeSections.workExperience?.data?.map((experience, index) => (
        <Card key={index} className="border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                  <Input
                    id={`jobTitle-${index}`}
                    placeholder="Software Developer"
                    value={experience.title || ''}
                    onChange={e => {
                      const updatedData = [...(resumeSections.workExperience?.data || [])];
                      updatedData[index] = { ...experience, title: e.target.value };
                      updateSection('workExperience', { data: updatedData });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    placeholder="Tech Corp"
                    value={experience.company || ''}
                    onChange={e => {
                      const updatedData = [...(resumeSections.workExperience?.data || [])];
                      updatedData[index] = { ...experience, company: e.target.value };
                      updateSection('workExperience', { data: updatedData });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`duration-${index}`}>Duration</Label>
                <Input
                  id={`duration-${index}`}
                  placeholder="April 2024 - Present"
                  value={experience.duration || ''}
                  onChange={e => {
                    const updatedData = [...(resumeSections.workExperience?.data || [])];
                    updatedData[index] = { ...experience, duration: e.target.value };
                    updateSection('workExperience', { data: updatedData });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`responsibilities-${index}`}>Responsibilities</Label>
                <Textarea
                  id={`responsibilities-${index}`}
                  placeholder="Enter responsibilities, one per line"
                  className="min-h-[100px]"
                  value={experience.responsibilities?.join('\n') || ''}
                  onChange={e => {
                    const updatedData = [...(resumeSections.workExperience?.data || [])];
                    updatedData[index] = {
                      ...experience,
                      responsibilities: e.target.value.split('\n').filter(r => r.trim()),
                    };
                    updateSection('workExperience', { data: updatedData });
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )) || (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-muted-foreground py-8 text-center">
              <Briefcase className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No work experience added yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  updateSection('workExperience', {
                    data: [{ title: '', company: '', duration: '', responsibilities: [] }],
                  });
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Experience
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'contactInfo':
        return renderContactInfoForm();
      case 'summary':
        return renderSummaryForm();
      case 'workExperience':
        return renderWorkExperienceForm();
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
                <Button
                  key={section.id}
                  variant={activeTab === section.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(section.id)}
                >
                  <section.icon className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">{section.title}</div>
                    <div className="text-muted-foreground text-xs">{section.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>{resumeSections_list.find(s => s.id === activeTab)?.title}</CardTitle>
              <CardDescription>
                {resumeSections_list.find(s => s.id === activeTab)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>{renderActiveForm()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
