'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/api/projectService';
import type { ProjectStatus } from '@/types/project';

export function useProjects(params: { status?: ProjectStatus; search?: string } = {}) {
  return useQuery({
    queryKey: ['projects', params.status ?? 'all', params.search ?? ''],
    queryFn: () => getProjects(params),
    staleTime: 60_000,
    retry: 1,
  });
}
