'use client';

import { useQuery } from '@tanstack/react-query';
import { getAreaStatement } from '@/lib/api/projectService';

export function useAreaStatement(projectId: string, asOn: string) {
  return useQuery({
    queryKey: ['project', projectId, 'area', asOn],
    queryFn: () => getAreaStatement(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
}
