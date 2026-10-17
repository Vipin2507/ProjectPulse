'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '@/lib/utils';

export type CalendarProps = DayPickerProps;

export function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col',
        month: 'space-y-3',
        caption: 'relative flex items-center justify-center pt-1',
        caption_label: 'text-sm font-semibold',
        caption_dropdowns: 'flex items-center gap-2',
        dropdown: 'rounded-md border border-line bg-white px-2 py-1 text-sm',
        dropdown_month: 'text-sm',
        dropdown_year: 'text-sm',
        vhidden: 'sr-only',
        nav: 'flex items-center',
        nav_button:
          'inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-ink-secondary',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'w-9 text-[0.75rem] font-medium text-ink-muted',
        row: 'mt-1 flex w-full',
        cell: 'relative h-9 w-9 p-0 text-center text-sm',
        day: 'inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-brand-soft',
        day_selected: 'bg-brand text-white hover:bg-brand',
        day_today: 'font-semibold text-brand',
        day_outside: 'text-ink-muted opacity-40',
        day_disabled: 'text-ink-muted opacity-30',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
