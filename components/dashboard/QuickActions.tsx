import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Folder, FileText } from 'lucide-react';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/cases/new">
          <Button className="w-full h-24 flex-col space-y-2">
            <Plus className="h-8 w-8" />
            <span>New Case</span>
          </Button>
        </Link>
        <Link href="/templates">
          <Button variant="outline" className="w-full h-24 flex-col space-y-2">
            <Folder className="h-8 w-8" />
            <span>Browse Templates</span>
          </Button>
        </Link>
        <Link href="/cases">
          <Button variant="outline" className="w-full h-24 flex-col space-y-2">
            <FileText className="h-8 w-8" />
            <span>My Cases</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
