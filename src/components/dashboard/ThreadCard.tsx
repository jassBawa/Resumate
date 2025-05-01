import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Thread {
  id: string;
  title: string;
  createdAt: string;
}

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] duration-200 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="line-clamp-1">
              {thread.title || 'Untitled Thread'}
            </span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 bg-muted/50 p-3 rounded-lg">
          {thread.title
            ? `Chat about ${thread.title}`
            : 'Start a new conversation'}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            Last updated{' '}
            {formatDistanceToNow(new Date(thread.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-primary/10"
        >
          <Link href={`/thread/${thread.id}`}>
            <span className="flex items-center gap-1">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
