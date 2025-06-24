import { Badge } from '@/components/ui/badge';

interface MatchingSkillsProps {
  skills: string[];
}

export function MatchingSkills({ skills }: MatchingSkillsProps) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">Matching Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
