'use client';

import { useAuthor } from '@/context/AuthorContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { useCases } from '@/hooks/useCases';
import { RecentCases } from '@/components/dashboard/RecentCases';

export default function ProfilePage() {
  const { author } = useAuthor();
  const { state } = useCases();

  const totalCases = state.cases.length;
  const publishedCases = state.cases.filter(c => c.status === 'Published').length;
  const draftCases = state.cases.filter(c => c.status === 'Draft').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your profile and view your stats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                {author.name.charAt(0)}
              </div>
              <div>
                <CardTitle>{author.name}</CardTitle>
                <p className="text-gray-500">{author.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Specialty:</span> {author.specialty}
            </div>
            <div>
              <span className="font-medium">Institution:</span> {author.institution}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard title="Total Cases" value={totalCases} icon={FileText} />
            <StatsCard title="Published" value={publishedCases} icon={CheckCircle} color="text-success" />
            <StatsCard title="Drafts" value={draftCases} icon={Clock} color="text-gray-500" />
          </div>

          <RecentCases cases={state.cases} />
        </div>
      </div>
    </div>
  );
}
