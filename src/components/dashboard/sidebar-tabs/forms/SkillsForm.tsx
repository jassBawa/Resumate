import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { toast } from 'sonner';
import { SectionAnalysis } from '@/types';
import { Badge } from '@/components/ui/badge';

export function SkillsForm() {
  const { resumeSections, updateSection } = useResumeStore();

  const defaultSkills = {
    hardSkills: [] as string[],
    softSkills: [] as string[],
  };

  const defaultAnalysis: SectionAnalysis = {
    summary: '',
    strengths: [],
    weaknesses: [],
    suggestions: [],
    ATS_Fit_Score: 0,
  };

  const getCurrentSkills = () => ({
    ...defaultSkills,
    ...resumeSections.skills?.data,
  });

  const handleSkillsChange = (type: 'hardSkills' | 'softSkills', value: string) => {
    const skills = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    updateSection('skills', {
      data: {
        ...getCurrentSkills(),
        [type]: skills,
      },
      analysis: resumeSections.skills?.analysis || defaultAnalysis,
    });
  };

  const handleRemoveSkill = (type: 'hardSkills' | 'softSkills', skillToRemove: string) => {
    const currentSkills = getCurrentSkills();
    const updatedSkills = currentSkills[type].filter(skill => skill !== skillToRemove);
    updateSection('skills', {
      data: {
        ...currentSkills,
        [type]: updatedSkills,
      },
      analysis: resumeSections.skills?.analysis || defaultAnalysis,
    });
  };

  const getSkillColor = (skill: string, type: 'hardSkills' | 'softSkills') => {
    const colors = {
      hardSkills: ['bg-blue-100 text-blue-800', 'bg-blue-200 text-blue-900'],
      softSkills: ['bg-green-100 text-green-800', 'bg-green-200 text-green-900'],
    };
    const index = skill.length % 2;
    return colors[type][index];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Skills</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('AI optimization coming soon!')}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Optimize
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Hard Skills</Label>
            <Textarea
              id="hardSkills"
              placeholder="Enter hard skills, separated by commas"
              className="min-h-[100px]"
              value={getCurrentSkills().hardSkills.join(', ')}
              onChange={e => {
                const skills = e.target.value
                  .split(',')
                  .map(skill => skill.trim())
                  .filter(skill => skill);
                handleSkillsChange('hardSkills', skills.join(', '));
              }}
            />
            <p className="text-muted-foreground text-sm">
              Type skills and separate them with commas
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {getCurrentSkills().hardSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${getSkillColor(skill, 'hardSkills')} cursor-pointer hover:opacity-80`}
                onClick={() => handleRemoveSkill('hardSkills', skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Soft Skills</Label>
            <Textarea
              id="softSkills"
              placeholder="Enter soft skills, separated by commas"
              className="min-h-[100px]"
              value={getCurrentSkills().softSkills.join(', ')}
              onChange={e => {
                const skills = e.target.value
                  .split(',')
                  .map(skill => skill.trim())
                  .filter(skill => skill);
                handleSkillsChange('softSkills', skills.join(', '));
              }}
            />
            <p className="text-muted-foreground text-sm">
              Type skills and separate them with commas
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {getCurrentSkills().softSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${getSkillColor(skill, 'softSkills')} cursor-pointer hover:opacity-80`}
                onClick={() => handleRemoveSkill('softSkills', skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
