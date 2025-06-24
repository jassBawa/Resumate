import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/hooks/useResumeStore';

export function SummaryForm() {
  const { resumeSections, updateSection } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Professional Summary</h3>
        <div className="flex gap-2">
          {/* <Button variant="outline" size="sm" onClick={() => toast.info('AI editing coming soon!')}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Edit
          </Button> */}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          placeholder="Write a compelling summary of your professional background..."
          value={resumeSections.summary?.data?.summary || ''}
          onChange={e =>
            updateSection('summary', {
              data: { summary: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
}
