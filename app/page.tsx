'use client';

import { useCases } from '@/hooks/useCases';
import { useAuthor } from '@/context/AuthorContext';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentCases } from '@/components/dashboard/RecentCases';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { FileText, CheckCircle, Clock, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { state } = useCases();
  const { author } = useAuthor();

  const totalCases = state.cases.length;
  const publishedCases = state.cases.filter(c => c.status === 'Published').length;
  const draftCases = state.cases.filter(c => c.status === 'Draft').length;
  const reviewCases = state.cases.filter(c => c.status === 'Review').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {author.name}!</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your cases.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Cases"
          value={totalCases}
          icon={FileText}
        />
        <StatsCard
          title="Published"
          value={publishedCases}
          icon={CheckCircle}
          color="text-success"
        />
        <StatsCard
          title="In Review"
          value={reviewCases}
          icon={Eye}
          color="text-warning"
        />
        <StatsCard
          title="Drafts"
          value={draftCases}
          icon={Clock}
          color="text-gray-500"
        />
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCases cases={state.cases} />

        <Card>
          <CardHeader>
            <CardTitle>Tip of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Always include relevant investigations to support your diagnosis. This helps other learners understand
              your clinical reasoning process better!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
