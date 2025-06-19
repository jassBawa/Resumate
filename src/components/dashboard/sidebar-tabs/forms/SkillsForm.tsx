import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/hooks/useResumeStore';
import { useState } from 'react';

export function SkillsForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [hardSkillsInput, setHardSkillsInput] = useState('');
  const [softSkillsInput, setSoftSkillsInput] = useState('');

  const defaultSkills = {
    hardSkills: [] as string[],
    softSkills: [] as string[],
  };

  const getCurrentSkills = () => ({
    ...defaultSkills,
    ...resumeSections.skills?.data,
  });

  const processSkillsInput = (type: 'hardSkills' | 'softSkills', value: string) => {
    const currentSkills = getCurrentSkills();
    const newSkills = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    // Combine existing skills with new ones and remove duplicates
    const combinedSkills = [...new Set([...currentSkills[type], ...newSkills])];

    updateSection('skills', {
      data: {
        ...currentSkills,
        [type]: combinedSkills,
      },
    });

    // Clear the input after processing
    if (type === 'hardSkills') {
      setHardSkillsInput('');
    } else {
      setSoftSkillsInput('');
    }
  };

  const handleSkillsChange = (type: 'hardSkills' | 'softSkills', value: string) => {
    if (type === 'hardSkills') {
      setHardSkillsInput(value);
    } else {
      setSoftSkillsInput(value);
    }
  };

  const handleSkillsBlur = (type: 'hardSkills' | 'softSkills') => {
    const value = type === 'hardSkills' ? hardSkillsInput : softSkillsInput;
    processSkillsInput(type, value);
  };

  const handleKeyDown = (
    type: 'hardSkills' | 'softSkills',
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = type === 'hardSkills' ? hardSkillsInput : softSkillsInput;
      processSkillsInput(type, value);
    }
  };

  const handleRemoveSkill = (type: 'hardSkills' | 'softSkills', skillToRemove: string) => {
    const currentSkills = getCurrentSkills();
    const updatedSkills = currentSkills[type].filter(skill => skill !== skillToRemove);
    updateSection('skills', {
      data: {
        ...currentSkills,
        [type]: updatedSkills,
      },
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
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('AI optimization coming soon!')}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Optimize
          </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Hard Skills</Label>
            <Textarea
              id="hardSkills"
              placeholder="Type hard skills and press Enter or click outside to add them"
              className="min-h-[100px]"
              value={hardSkillsInput}
              onChange={e => handleSkillsChange('hardSkills', e.target.value)}
              onBlur={() => handleSkillsBlur('hardSkills')}
              onKeyDown={e => handleKeyDown('hardSkills', e)}
            />
            <p className="text-muted-foreground text-sm">
              Type skills and press Enter or click outside to add them
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
              placeholder="Type soft skills and press Enter or click outside to add them"
              className="min-h-[100px]"
              value={softSkillsInput}
              onChange={e => handleSkillsChange('softSkills', e.target.value)}
              onBlur={() => handleSkillsBlur('softSkills')}
              onKeyDown={e => handleKeyDown('softSkills', e)}
            />
            <p className="text-muted-foreground text-sm">
              Type skills and press Enter or click outside to add them
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
