import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-muted',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
