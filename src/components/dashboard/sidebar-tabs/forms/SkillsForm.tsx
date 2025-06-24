import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/hooks/useResumeStore';
import { useState } from 'react';

export function SkillsForm() {
  const { resumeSections, updateSection } = useResumeStore();
  const [skillsInput, setSkillsInput] = useState('');

  const defaultSkills = {
    skills: [] as string[],
  };

  const getCurrentSkills = () => ({
    ...defaultSkills,
    ...resumeSections.skills?.data,
  });

  const processSkillsInput = (value: string) => {
    const currentSkills = getCurrentSkills();
    const newSkills = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    // Combine existing skills with new ones and remove duplicates
    const combinedSkills = [...new Set([...currentSkills.skills, ...newSkills])];

    updateSection('skills', {
      data: {
        ...currentSkills,
        skills: combinedSkills,
      },
    });

    // Clear the input after processing
    setSkillsInput('');
  };

  const handleSkillsChange = (value: string) => {
    setSkillsInput(value);
  };

  const handleSkillsBlur = () => {
    processSkillsInput(skillsInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = skillsInput;
      processSkillsInput(value);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = getCurrentSkills();
    const updatedSkills = currentSkills.skills.filter(skill => skill !== skillToRemove);
    updateSection('skills', {
      data: {
        ...currentSkills,
        skills: updatedSkills,
      },
    });
  };

  const getSkillColor = (skill: string) => {
    const colors = {
      skills: ['bg-blue-100 text-blue-800', 'bg-blue-200 text-blue-900'],
    };
    const index = skill.length % 2;
    return colors.skills[index];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Skills</h3>
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <Textarea
            id="skills"
            placeholder="Type your skill and press Enter or click outside to add them"
            className="min-h-[100px]"
            value={skillsInput}
            onChange={e => handleSkillsChange(e.target.value)}
            onBlur={() => handleSkillsBlur()}
            onKeyDown={e => handleKeyDown(e)}
          />
          <p className="text-muted-foreground text-sm">
            Type skills and press Enter or click outside to add them
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {getCurrentSkills().skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`${getSkillColor(skill)} cursor-pointer hover:opacity-80`}
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
