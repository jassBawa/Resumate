import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

import { useResumeStore } from '@/hooks/useResumeStore';
import { Award, Edit, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import CertificationModal from './CertificationModal';

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export function CertificationsForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [selectedCertification, setSelectedCertification] = useState<{
    index: number;
    certification: Certification;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultCertification: Certification = {
    name: '',
    issuer: '',
    date: '',
    url: '',
  };

  const handleSaveCertification = (certification: Certification) => {
    const currentData = resumeSections.certifications?.data || [];
    if (selectedCertification) {
      const updatedData = [...currentData];
      updatedData[selectedCertification.index] = certification;
      updateSection('certifications', {
        data: updatedData,
      });
    } else {
      updateSection('certifications', {
        data: [...currentData, certification],
      });
    }
  };

  const handleDeleteCertification = (index: number) => {
    const currentData = resumeSections.certifications?.data || [];
    const updatedData = currentData.filter((_, i) => i !== index);
    updateSection('certifications', {
      data: updatedData,
    });
    toast.success('Certification deleted successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Certifications</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCertification(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>

      {resumeSections.certifications?.data?.map((certification, index) => (
        <Card key={index} className="border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{certification.name}</h4>
                  <p className="text-muted-foreground text-sm">{certification.issuer}</p>
                  <p className="text-muted-foreground text-sm">{certification.date}</p>
                  {certification.url && (
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCertification({
                        index,
                        certification: { ...defaultCertification, ...certification },
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCertification(index)}
                  >
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
              <Award className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No certifications added yet</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCertification(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Certification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <CertificationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCertification(null);
        }}
        certification={selectedCertification?.certification || null}
        onSave={handleSaveCertification}
        index={selectedCertification?.index || -1}
      />
    </div>
  );
}
