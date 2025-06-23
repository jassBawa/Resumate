import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Certification } from './CertificationsForm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: Certification | null;
  onSave: (certification: Certification) => void;
  index: number;
}

const CertificationModal = ({
  isOpen,
  onClose,
  certification,
  onSave,
}: CertificationModalProps) => {
  const [formData, setFormData] = useState<Certification>(
    () =>
      certification || {
        name: '',
        issuer: '',
        date: '',
        url: '',
      }
  );

  useEffect(() => {
    if (certification) {
      setFormData(certification);
    }
  }, [certification]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    toast.success(`Certification ${certification ? 'updated' : 'added'} successfully`);
  };

  const handleClose = () => {
    setFormData({ name: '', issuer: '', date: '', url: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{certification ? 'Edit Certification' : 'Add Certification'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Certification Name</Label>
            <Input
              id="name"
              placeholder="AWS Certified Developer"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              placeholder="Amazon Web Services"
              value={formData.issuer}
              onChange={e => setFormData({ ...formData, issuer: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date Issued</Label>
            <Input
              id="date"
              placeholder="January 2024"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Certificate URL (Optional)</Label>
            <Input
              id="url"
              placeholder="https://www.credly.com/badges/..."
              value={formData.url || ''}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Certification</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificationModal;
