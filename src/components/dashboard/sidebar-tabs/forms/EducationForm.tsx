import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/hooks/useResumeStore';
import { Edit, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  percentage?: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  education: Education | null;
  onSave: (education: Education) => void;
  index: number;
}

const EducationModal = ({ isOpen, onClose, education, onSave }: EducationModalProps) => {
  const [formData, setFormData] = useState<Education>(
    () =>
      education || {
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        cgpa: '',
        percentage: '',
      }
  );

  useEffect(() => {
    if (education) {
      setFormData(education);
    }
  }, [education]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    toast.success(`Education ${education ? 'updated' : 'added'} successfully`);
  };

  const handleClose = () => {
    setFormData({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      cgpa: '',
      percentage: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{education ? 'Edit Education' : 'Add Education'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              placeholder="University of Example"
              value={formData.institution}
              onChange={e => setFormData({ ...formData, institution: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              placeholder="Bachelor of Science in Computer Science"
              value={formData.degree}
              onChange={e => setFormData({ ...formData, degree: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                placeholder="August 2020"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                placeholder="May 2024"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA</Label>
              <Input
                id="cgpa"
                placeholder="3.8"
                value={formData.cgpa || ''}
                onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">Percentage</Label>
              <Input
                id="percentage"
                placeholder="85%"
                value={formData.percentage || ''}
                onChange={e => setFormData({ ...formData, percentage: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Education</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export function EducationForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [selectedEducation, setSelectedEducation] = useState<{
    index: number;
    education: Education;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultEducation: Education = {
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
  };

  const handleSaveEducation = (education: Education) => {
    const currentData = resumeSections.education?.data || [];
    if (selectedEducation) {
      const updatedData = [...currentData];
      updatedData[selectedEducation.index] = education;
      updateSection('education', {
        data: updatedData,
      });
    } else {
      updateSection('education', {
        data: [...currentData, education],
      });
    }
  };

  const handleDeleteEducation = (index: number) => {
    const currentData = resumeSections.education?.data || [];
    const updatedData = currentData.filter((_, i) => i !== index);
    updateSection('education', {
      data: updatedData,
    });
    toast.success('Education deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Education</h3>
        <div className="flex gap-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('AI optimization coming soon!')}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Optimize
          </Button> */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedEducation(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </div>

      {resumeSections.education?.data?.map((education, index) => (
        <Card key={index} className="border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{education.degree}</h4>
                  <p className="text-muted-foreground">{education.institution}</p>
                  <p className="text-muted-foreground text-sm">
                    {education.startDate} - {education.endDate}
                  </p>
                  {(education.cgpa || education.percentage) && (
                    <p className="text-muted-foreground text-sm">
                      {education.cgpa && `CGPA: ${education.cgpa}`}
                      {education.cgpa && education.percentage && ' | '}
                      {education.percentage && `Percentage: ${education.percentage}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedEducation({
                        index,
                        education: { ...defaultEducation, ...education },
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )) || (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-muted-foreground py-8 text-center">
              <GraduationCap className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No education added yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedEducation(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Education
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <EducationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEducation(null);
        }}
        education={selectedEducation?.education || null}
        onSave={handleSaveEducation}
        index={selectedEducation?.index || -1}
      />
    </div>
  );
}
