import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Globe, Edit, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { toast } from 'sonner';

interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (project: Project) => void;
  index: number;
}

const ProjectModal = ({ isOpen, onClose, project, onSave, index }: ProjectModalProps) => {
  const [formData, setFormData] = useState<Project>(
    () =>
      project || {
        name: '',
        description: '',
        url: '',
        technologies: [],
      }
  );

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    toast.success(`Project ${project ? 'updated' : 'added'} successfully`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onChange={e => setFormData({ ...formData, description: e.target.value })}
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
              value={formData.technologies?.join(', ') || ''}
              onChange={e => {
                const techs = e.target.value
                  .split(',')
                  .map(tech => tech.trim())
                  .filter(tech => tech);
                setFormData(prev => ({ ...prev, technologies: techs }));
              }}
            />
            <p className="text-muted-foreground text-sm">
              Type technologies and separate them with commas
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

export function ProjectsForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [selectedProject, setSelectedProject] = useState<{
    index: number;
    project: Project;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultProject: Project = {
    name: '',
    description: '',
    url: '',
    technologies: [],
  };

  const handleSaveProject = (project: Project) => {
    const currentData = resumeSections.projects?.data || [];
    if (selectedProject) {
      const updatedData = [...currentData];
      updatedData[selectedProject.index] = project;
      updateSection('projects', {
        data: updatedData,
      });
    } else {
      updateSection('projects', {
        data: [...currentData, project],
      });
    }
  };

  const handleDeleteProject = (index: number) => {
    const currentData = resumeSections.projects?.data || [];
    const updatedData = currentData.filter((_, i) => i !== index);
    updateSection('projects', {
      data: updatedData,
    });
    toast.success('Project deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
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
              setSelectedProject(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      {resumeSections.projects?.data?.map((project, index) => (
        <Card key={index} className="border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{project.name}</h4>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedProject({
                        index,
                        project: { ...defaultProject, ...project },
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )) || (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-muted-foreground py-8 text-center">
              <Globe className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No projects added yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedProject(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject?.project || null}
        onSave={handleSaveProject}
        index={selectedProject?.index || -1}
      />
    </div>
  );
}
