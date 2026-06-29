'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCases } from '@/hooks/useCases';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function CasesPage() {
  const { state } = useCases();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  const filteredCases = state.cases.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.specialty.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesSpecialty = filterSpecialty === 'all' || c.specialty === filterSpecialty;
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const specialties = Array.from(new Set(state.cases.map(c => c.specialty)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Cases</h1>
          <p className="text-gray-500 mt-1">Manage your medical case reports</p>
        </div>
        <Link href="/cases/new">
          <Button className="mt-4 sm:mt-0">
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search cases..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-40"
          >
            <option value="all">All Status</option>
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Published">Published</option>
          </Select>
          <Select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="w-full md:w-48"
          >
            <option value="all">All Specialties</option>
            {specialties.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map(caseItem => (
          <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{caseItem.title}</CardTitle>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{caseItem.specialty}</Badge>
                  <Badge variant="outline">{caseItem.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Updated {formatDate(caseItem.updatedAt)}
                  </div>
                  <StatusBadge status={caseItem.status} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No cases found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
