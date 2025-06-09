import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

import { useResumeStore } from '@/hooks/useResumeStore';
import { Edit, Globe, Plus, Sparkles, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ProjectModal from './ProjectModal';

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}

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
