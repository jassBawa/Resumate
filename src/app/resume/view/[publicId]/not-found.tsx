import Link from 'next/link';
import { FileX, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function ResumeNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="mx-auto max-w-md border-muted-foreground/20 shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-muted p-4">
            <FileX className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Resume Not Found
          </h1>
          <p className="text-muted-foreground">
            The resume you&apos;re looking for doesn&apos;t exist or is no
            longer shared.
          </p>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>This could be because:</p>
          <ul className="mt-2 space-y-1">
            <li>• The resume link is incorrect</li>
            <li>• The owner has made this resume private</li>
            <li>• The resume has been deleted</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="w-full" variant="default">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
