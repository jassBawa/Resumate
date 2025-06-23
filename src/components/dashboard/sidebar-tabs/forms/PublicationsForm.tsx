import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

import { useResumeStore } from '@/hooks/useResumeStore';
import { BookOpen, Edit, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import PublicationModal from './PublicationModal';

export interface Publication {
  title: string;
  publication: string;
  date: string;
  url?: string;
}

export function PublicationsForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [selectedPublication, setSelectedPublication] = useState<{
    index: number;
    publication: Publication;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultPublication: Publication = {
    title: '',
    publication: '',
    date: '',
    url: '',
  };

  const handleSavePublication = (publication: Publication) => {
    const currentData = resumeSections.publications?.data || [];
    if (selectedPublication) {
      const updatedData = [...currentData];
      updatedData[selectedPublication.index] = publication;
      updateSection('publications', {
        data: updatedData,
      });
    } else {
      updateSection('publications', {
        data: [...currentData, publication],
      });
    }
  };

  const handleDeletePublication = (index: number) => {
    const currentData = resumeSections.publications?.data || [];
    const updatedData = currentData.filter((_, i) => i !== index);
    updateSection('publications', {
      data: updatedData,
    });
    toast.success('Publication deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Publications</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedPublication(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Publication
          </Button>
        </div>
      </div>

      {resumeSections.publications?.data?.map((publication, index) => (
        <Card key={index} className="border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{publication.title}</h4>
                  <p className="text-muted-foreground text-sm">{publication.publication}</p>
                  <p className="text-muted-foreground text-sm">{publication.date}</p>
                  {publication.url && (
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Publication
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedPublication({
                        index,
                        publication: { ...defaultPublication, ...publication },
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePublication(index)}>
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
              <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No publications added yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedPublication(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Publication
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <PublicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPublication(null);
        }}
        publication={selectedPublication?.publication || null}
        onSave={handleSavePublication}
        index={selectedPublication?.index || -1}
      />
    </div>
  );
}
