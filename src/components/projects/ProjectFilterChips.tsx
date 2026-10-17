'use client';

import { PROJECT_FILTERS, type ProjectFilter } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function ProjectFilterChips({
  value,
  onChange,
}: {
  value: ProjectFilter;
  onChange: (value: ProjectFilter) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter projects">
      {PROJECT_FILTERS.map((filter) => {
        const active = value === filter;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter)}
            className={cn(
              'h-9 shrink-0 rounded-full px-4 text-sm font-medium',
              active ? 'bg-brand text-white' : 'bg-white text-ink-secondary border border-line',
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
