'use client';

import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { AsOnDatePicker } from '@/components/layout/AsOnDatePicker';
import { ProjectSwitcher } from '@/components/layout/ProjectSwitcher';
import { UserMenu } from '@/components/layout/UserMenu';
import { Input } from '@/components/ui/input';
import { useUiStore } from '@/store/uiStore';

export function Topbar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const [query, setQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center gap-3 border-b border-line bg-white px-4 lg:flex">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-secondary hover:bg-page"
        aria-label="Toggle sidebar"
        aria-pressed={collapsed}
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search project, unit, customer..."
          aria-label="Search project, unit, customer"
          className="bg-page pl-9"
        />
      </div>
      <ProjectSwitcher />
      <AsOnDatePicker />
      <UserMenu />
    </header>
  );
}
