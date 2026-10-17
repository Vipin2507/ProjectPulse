'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorState({
  message = 'We could not load this data.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center shadow-card"
    >
      <AlertTriangle className="mb-3 h-8 w-8 text-danger" aria-hidden />
      <h2 className="text-base font-semibold">Something went wrong</h2>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{message}</p>
      {onRetry ? (
        <Button className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
