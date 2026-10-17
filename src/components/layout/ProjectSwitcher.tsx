'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECT_ID } from '@/lib/constants';
import { currentProjectId, replaceProjectId } from '@/lib/routes';
import { cn } from '@/lib/utils';

export function ProjectSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useProjects();
  const current = currentProjectId(pathname) ?? data?.[0]?.id ?? DEFAULT_PROJECT_ID;

  if (!data?.length) {
    return <div className={cn('h-10 animate-pulse rounded-lg border border-line bg-white', className)} />;
  }

  return (
    <Select
      value={current}
      onValueChange={(nextId) => {
        if (nextId !== current) router.push(replaceProjectId(pathname, nextId));
      }}
    >
      <SelectTrigger className={cn('w-[220px]', className)} aria-label="Select project">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        {data.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
