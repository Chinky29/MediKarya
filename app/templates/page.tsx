'use client';

import { useRouter } from 'next/navigation';
import { useCases } from '@/hooks/useCases';
import { CASE_TEMPLATES } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function TemplatesPage() {
  const { createCase } = useCases();
  const router = useRouter();

  const handleUseTemplate = (template: typeof CASE_TEMPLATES[0]) => {
    const newCase = createCase(template);
    router.push(`/cases/new?template=${newCase.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Case Templates</h1>
        <p className="text-gray-500 mt-1">Start with a pre-built template for common cases</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASE_TEMPLATES.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>
                <Badge variant="secondary">{template.specialty}</Badge>
                <Badge variant="outline" className="ml-2">{template.difficulty}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => handleUseTemplate(template)}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
