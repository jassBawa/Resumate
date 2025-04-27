import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Thread {
  id: string
  title: string
  createdAt: string
}

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="h-5 w-5 text-primary" />
          {thread.title || "Untitled Thread"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {thread.title ? `Chat about ${thread.title}` : "Start a new conversation"}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
        </p>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/thread/${thread.id}`}>
            <span className="flex items-center gap-1">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
