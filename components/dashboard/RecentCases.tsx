import Link from 'next/link';
import { MedicalCase } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RecentCasesProps {
  cases: MedicalCase[];
}

export function RecentCases({ cases }: RecentCasesProps) {
  const recent = [...cases]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recent.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/cases/${caseItem.id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium">{caseItem.title}</p>
                <p className="text-sm text-gray-500">
                  {caseItem.specialty} • {formatDate(caseItem.updatedAt)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{caseItem.difficulty}</Badge>
                <StatusBadge status={caseItem.status} />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
