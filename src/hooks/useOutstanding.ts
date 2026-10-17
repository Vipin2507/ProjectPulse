'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getOutstandingAgeing,
  getOutstandingTopCustomers,
  getOutstandingUnitWise,
} from '@/lib/api/projectService';

export function useOutstanding(projectId: string, asOn: string, limit: number) {
  const customers = useQuery({
    queryKey: ['project', projectId, 'outstanding', 'customers', asOn, limit],
    queryFn: () => getOutstandingTopCustomers(projectId, asOn, limit),
    staleTime: 60_000,
    retry: 1,
    placeholderData: keepPreviousData,
  });
  const units = useQuery({
    queryKey: ['project', projectId, 'outstanding', 'units', asOn],
    queryFn: () => getOutstandingUnitWise(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
  const ageing = useQuery({
    queryKey: ['project', projectId, 'outstanding', 'ageing', asOn],
    queryFn: () => getOutstandingAgeing(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
  return { customers, units, ageing };
}
