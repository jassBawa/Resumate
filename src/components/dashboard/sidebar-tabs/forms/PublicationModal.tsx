import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Publication } from './PublicationsForm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface PublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  publication: Publication | null;
  onSave: (publication: Publication) => void;
  index: number;
}

const PublicationModal = ({ isOpen, onClose, publication, onSave }: PublicationModalProps) => {
  const [formData, setFormData] = useState<Publication>(
    () =>
      publication || {
        title: '',
        publication: '',
        date: '',
        url: '',
      }
  );

  useEffect(() => {
    if (publication) {
      setFormData(publication);
    }
  }, [publication]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    toast.success(`Publication ${publication ? 'updated' : 'added'} successfully`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{publication ? 'Edit Publication' : 'Add Publication'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Publication Title</Label>
            <Input
              id="title"
              placeholder="Machine Learning in Web Development"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publication">Journal/Conference/Platform</Label>
            <Input
              id="publication"
              placeholder="IEEE Computer Society"
              value={formData.publication}
              onChange={e => setFormData({ ...formData, publication: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Publication Date</Label>
            <Input
              id="date"
              placeholder="March 2024"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Publication URL (Optional)</Label>
            <Input
              id="url"
              placeholder="https://doi.org/10.1109/..."
              value={formData.url || ''}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Publication</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PublicationModal;
