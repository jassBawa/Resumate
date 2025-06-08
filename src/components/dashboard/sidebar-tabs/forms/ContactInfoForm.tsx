import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { toast } from 'sonner';

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
}

export function ContactInfoForm() {
  const { resumeSections, updateSection } = useResumeStore();

  const defaultContactInfo: ContactInfo = {
    name: '',
    email: '',
    phone: '',
    location: '',
  };

  const getCurrentContactInfo = (): ContactInfo => ({
    ...defaultContactInfo,
    ...resumeSections.contactInfo?.data,
  });

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info('AI editing coming soon!')}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Edit
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Jane Doe"
          value={getCurrentContactInfo().name}
          onChange={e =>
            updateSection('contactInfo', {
              data: { ...getCurrentContactInfo(), name: e.target.value },
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="email"
              placeholder="jane@example.com"
              className="pl-9"
              value={getCurrentContactInfo().email}
              onChange={e =>
                updateSection('contactInfo', {
                  data: { ...getCurrentContactInfo(), email: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="phone"
              placeholder="+1-234-567-8900"
              className="pl-9"
              value={getCurrentContactInfo().phone}
              onChange={e =>
                updateSection('contactInfo', {
                  data: { ...getCurrentContactInfo(), phone: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            id="location"
            placeholder="New York, NY"
            className="pl-9"
            value={getCurrentContactInfo().location}
            onChange={e =>
              updateSection('contactInfo', {
                data: { ...getCurrentContactInfo(), location: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <div className="relative">
          <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/janedoe"
            className="pl-9"
            value={getCurrentContactInfo().linkedin || ''}
            onChange={e =>
              updateSection('contactInfo', {
                data: { ...getCurrentContactInfo(), linkedin: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
