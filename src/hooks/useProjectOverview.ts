'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjectDetails, getProjectOverview } from '@/lib/api/projectService';

export function useProjectOverview(projectId: string, asOn: string) {
  return useQuery({
    queryKey: ['project', projectId, 'overview', asOn],
    queryFn: () => getProjectOverview(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
}

export function useProjectDetails(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId, 'details'],
    queryFn: () => getProjectDetails(projectId),
    staleTime: 60_000,
    retry: 1,
  });
}
