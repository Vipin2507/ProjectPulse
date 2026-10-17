'use client';

import { useQuery } from '@tanstack/react-query';
import { getParkingInventory } from '@/lib/api/projectService';

export function useParkingInventory(projectId: string, asOn: string) {
  return useQuery({
    queryKey: ['project', projectId, 'parking', asOn],
    queryFn: () => getParkingInventory(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
}
