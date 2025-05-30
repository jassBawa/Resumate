import { MessageSquarePlus } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-4">
        <MessageSquarePlus className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Create your first AI powered resume. Your chats will appear here.
      </p>
    </div>
  );
}
