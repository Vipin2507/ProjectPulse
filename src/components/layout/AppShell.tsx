'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { ProjectSwitcher } from '@/components/layout/ProjectSwitcher';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { currentProjectId } from '@/lib/routes';
import { useUiStore } from '@/store/uiStore';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onProject = /^\/projects\/[^/]+/.test(pathname);
  const setLastProjectId = useUiStore((state) => state.setLastProjectId);

  useEffect(() => {
    const projectId = currentProjectId(pathname);
    if (projectId) setLastProjectId(projectId);
  }, [pathname, setLastProjectId]);

  return (
    <div className="min-h-screen bg-page lg:flex">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <MobileHeader />
        <main id="main" className="flex-1 px-4 py-4 pb-24 lg:px-5 lg:pb-6">
          {onProject ? <ProjectSwitcher className="mb-3 w-full lg:hidden" /> : null}
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
