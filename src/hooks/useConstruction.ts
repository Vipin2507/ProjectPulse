'use client';

import { useQuery } from '@tanstack/react-query';
import { getConstructionProgress } from '@/lib/api/projectService';

export function useConstruction(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId, 'construction'],
    queryFn: () => getConstructionProgress(projectId),
    staleTime: 60_000,
    retry: 1,
  });
}
