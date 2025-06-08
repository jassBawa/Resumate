import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Briefcase, Edit, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { toast } from 'sonner';
import WorkExperienceModal from './WorkExperienceModal';

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export function WorkExperienceForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [selectedExperience, setSelectedExperience] = useState<{
    index: number;
    experience: WorkExperience;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultExperience: WorkExperience = {
    title: '',
    company: '',
    duration: '',
    responsibilities: [],
  };

  const handleSaveExperience = (experience: WorkExperience) => {
    const currentData = resumeSections.workExperience?.data || [];
    if (selectedExperience) {
      const updatedData = [...currentData];
      updatedData[selectedExperience.index] = experience;
      updateSection('workExperience', {
        data: updatedData,
      });
    } else {
      updateSection('workExperience', {
        data: [...currentData, experience],
      });
    }
  };

  const handleDeleteExperience = (index: number) => {
    const currentData = resumeSections.workExperience?.data || [];
    const updatedData = currentData.filter((_, i) => i !== index);
    updateSection('workExperience', {
      data: updatedData,
    });
    toast.success('Experience deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('AI optimization coming soon!')}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Optimize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedExperience(null);
              setIsModalOpen(true);
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
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{experience.title}</h4>
                  <p className="text-muted-foreground">{experience.company}</p>
                  <p className="text-muted-foreground text-sm">{experience.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedExperience({
                        index,
                        experience: { ...defaultExperience, ...experience },
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="font-medium">Responsibilities:</h5>
                <ul className="list-inside list-disc space-y-1">
                  {(experience.responsibilities || []).map((responsibility, i) => (
                    <li key={i} className="text-muted-foreground text-sm">
                      {responsibility}
                    </li>
                  ))}
                </ul>
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
                  setSelectedExperience(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Experience
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <WorkExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExperience(null);
        }}
        experience={selectedExperience?.experience || null}
        onSave={handleSaveExperience}
        index={selectedExperience?.index || -1}
      />
    </div>
  );
}
