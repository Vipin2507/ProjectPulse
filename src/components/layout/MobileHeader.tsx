'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronLeft } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { EmptyState } from '@/components/common/EmptyState';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { mobileTitle, parentPath } from '@/lib/routes';

export function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const brandHome = pathname === '/projects';

  return (
    <>
      {brandHome ? (
        <header className="sticky top-0 z-30 flex items-center justify-between bg-page px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-base font-semibold">Buildesk CRM</span>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full"
            aria-label="Notifications"
            onClick={() => setOpen(true)}
          >
            <Bell className="h-5 w-5" />
          </button>
        </header>
      ) : (
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-line bg-white px-1 lg:hidden">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Go back"
            onClick={() => router.push(parentPath(pathname))}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 truncate text-center text-base font-semibold">{mobileTitle(pathname)}</h1>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Notifications"
            onClick={() => setOpen(true)}
          >
            <Bell className="h-5 w-5" />
          </button>
        </header>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <EmptyState icon={Bell} title="No new notifications" message="Updates for this project will show up here." />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
