import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface EditSectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export function EditSectionCard({
  className,
  title,
  description,
  ...props
}: EditSectionCardProps) {
  return (
    <div
      className={cn(
        'group rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50 cursor-pointer flex justify-between items-center',
        className
      )}
      {...props}
    >
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </div>
  );
}
