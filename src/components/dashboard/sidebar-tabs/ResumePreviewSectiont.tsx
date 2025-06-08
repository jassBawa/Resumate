import ParsedResumeTemplate from '@/components/template/ParsedResumeTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Settings, Share } from 'lucide-react';

export function PreviewSection() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-3xl font-bold">Resume Preview</h2>
          <p className="text-muted-foreground mt-1">See how your resume looks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Template
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="border p-0 shadow-sm">
            <CardContent className="">
              <ParsedResumeTemplate />
            </CardContent>
          </Card>
        </div>

        <div className="">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                PDF Download
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Word Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="mr-2 h-4 w-4" />
                Share Link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
