import { ParsedResume } from '@/config/parseSections';
import ParsedResumeTemplate from '../template/ParsedResumeTemplate';

interface ShareableResumeProps {
  sections: ParsedResume['sections'];
}

function ShareableResume({ sections }: ShareableResumeProps) {
  return (
    <div>
      <ParsedResumeTemplate showAnalysis={true} sections={sections} />
    </div>
  );
}

export default ShareableResume;
