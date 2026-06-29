import { Badge } from '@/components/ui/badge';
import { MedicalCase } from '@/types';

interface StatusBadgeProps {
  status: MedicalCase['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variantMap: Record<MedicalCase['status'], 'default' | 'secondary' | 'warning' | 'success'> = {
    Draft: 'secondary',
    'In Progress': 'info',
    Review: 'warning',
    Published: 'success',
  };

  return <Badge variant={variantMap[status]}>{status}</Badge>;
}
