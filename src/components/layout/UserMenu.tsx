'use client';

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg px-1.5"
          aria-label="Open account menu"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            AD
          </span>
          <span className="hidden text-sm font-medium xl:inline">Admin</span>
          <ChevronDown className="h-4 w-4 text-ink-muted" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-3 py-2">
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-xs text-ink-muted">Buildesk CRM</p>
        </div>
        <DropdownMenuItem disabled>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
