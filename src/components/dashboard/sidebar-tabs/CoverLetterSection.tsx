import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Copy, FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CoverLetterSectionProps {
  coverLetter: string;
}

export function CoverLetterSection({ coverLetter }: CoverLetterSectionProps) {
  const [editedLetter, setEditedLetter] = useState(coverLetter);

  const handleCopy = () => {
    toast.success('Copied to clipboard');
    navigator.clipboard.writeText(editedLetter);
    // You might want to show a toast notification here
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="border shadow-sm">
          <CardContent>
            <Textarea
              value={editedLetter}
              onChange={e => setEditedLetter(e.target.value)}
              className="min-h-[400px] text-sm leading-relaxed"
              placeholder="Your personalized cover letter will appear here..."
            />
            <div className="mt-2 ml-auto flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Cover Letter Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 rounded bg-blue-50 p-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Personalized to job requirements</span>
              </div>
              <div className="flex items-center gap-2 rounded bg-green-50 p-2">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span>Highlights your key strengths</span>
              </div>
              <div className="flex items-center gap-2 rounded bg-purple-50 p-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>Professional format</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Letter Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Word Count:</span>
              <Badge variant="secondary">{editedLetter.split(' ').length}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Character Count:</span>
              <Badge variant="secondary">{editedLetter.length}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Reading Time:</span>
              <Badge variant="secondary">
                ~{Math.ceil(editedLetter.split(' ').length / 200)} min
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
