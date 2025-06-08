import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WorkExperience } from './WorkExperienceForm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface WorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: WorkExperience | null;
  onSave: (experience: WorkExperience) => void;
  index: number;
}

const WorkExperienceModal = ({ isOpen, onClose, experience, onSave }: WorkExperienceModalProps) => {
  const [formData, setFormData] = useState<WorkExperience>(
    () =>
      experience || {
        title: '',
        company: '',
        duration: '',
        responsibilities: [],
      }
  );

  // Reset form data when experience changes
  useEffect(() => {
    if (experience) {
      setFormData(experience);
    }
  }, [experience]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedResponsibilities = formData.responsibilities.filter(line => line.trim());
    onSave({ ...formData, responsibilities: cleanedResponsibilities });
    onClose();
    toast.success(`Work experience ${experience ? 'updated' : 'added'} successfully`);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{experience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="Software Developer"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Tech Corp"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="April 2024 - Present"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea
              id="responsibilities"
              placeholder="Enter responsibilities, one per line"
              className="min-h-[150px]"
              value={formData.responsibilities.join('\n')}
              onChange={e => {
                const lines = e.target.value.split('\n');
                setFormData(prev => ({ ...prev, responsibilities: lines }));
              }}
            />
            <p className="text-muted-foreground text-sm">
              Press Enter to add a new line. Each line will become a separate bullet point.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default WorkExperienceModal;
