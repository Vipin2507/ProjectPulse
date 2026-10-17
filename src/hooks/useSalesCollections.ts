'use client';

import { useQuery } from '@tanstack/react-query';
import { getCollectionTrend, getInstallmentWise } from '@/lib/api/projectService';

export function useSalesCollections(projectId: string, asOn: string) {
  const trend = useQuery({
    queryKey: ['project', projectId, 'collections', 'trend', asOn],
    queryFn: () => getCollectionTrend(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
  const installments = useQuery({
    queryKey: ['project', projectId, 'collections', 'installments', asOn],
    queryFn: () => getInstallmentWise(projectId, asOn),
    staleTime: 60_000,
    retry: 1,
  });
  return { trend, installments };
}
