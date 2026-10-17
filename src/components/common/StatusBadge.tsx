import { Badge } from '@/components/ui/badge';
import type { ProjectStatus } from '@/types/project';

const TONE: Record<ProjectStatus, 'success' | 'warning' | 'brand' | 'neutral'> = {
  Active: 'success',
  Planning: 'warning',
  Completed: 'brand',
  'On Hold': 'neutral',
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge tone={TONE[status]}>{status}</Badge>;
}
