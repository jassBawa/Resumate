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
import { Project } from './ProjectsForm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (project: Project) => void;
  index: number;
}

const ProjectModal = ({ isOpen, onClose, project, onSave }: ProjectModalProps) => {
  const [formData, setFormData] = useState<Project>(
    () =>
      project || {
        name: '',
        description: '',
        url: '',
        technologies: [],
      }
  );
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
      setTechInput(project.technologies?.join(', ') || '');
    } else {
      setTechInput('');
    }
  }, [project]);

  const processTechnologies = () => {
    const techs = techInput
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech);
    setFormData(prev => ({ ...prev, technologies: techs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processTechnologies();
    onSave(formData);
    onClose();
    toast.success(`Project ${project ? 'updated' : 'added'} successfully`);
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', url: '', technologies: [] });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="My Awesome Project"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project and its key features..."
              className="min-h-[100px]"
              value={formData.description}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Project URL</Label>
            <Input
              id="url"
              placeholder="https://github.com/username/project"
              value={formData.url || ''}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used</Label>
            <Textarea
              id="technologies"
              placeholder="Enter technologies used, separated by commas"
              className="min-h-[100px]"
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onBlur={processTechnologies}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  processTechnologies();
                }
              }}
            />
            <p className="text-muted-foreground text-sm">
              Type technologies and press Enter or click outside to add them
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ProjectModal;
