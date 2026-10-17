'use client';

import { useQuery } from '@tanstack/react-query';
import { getUnitInventory } from '@/lib/api/projectService';

export function useUnitInventory(projectId: string, asOn: string) {
  return useQuery({
    queryKey: ['project', projectId, 'units', asOn],
    queryFn: () => getUnitInventory(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
}
