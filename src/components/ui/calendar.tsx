'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '@/lib/utils';

export type CalendarProps = DayPickerProps;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col space-y-4',
        month: 'space-y-4',
        caption: 'relative flex items-center justify-center px-8 pt-1',
        caption_label:
          'inline-flex items-center gap-1 rounded-sm text-sm font-medium peer-focus-visible:ring-2 peer-focus-visible:ring-brand',
        caption_dropdowns: 'flex items-center justify-center gap-2',
        dropdown_month:
          'relative inline-flex items-center rounded-md border border-line bg-white px-2 py-1',
        dropdown_year:
          'relative inline-flex items-center rounded-md border border-line bg-white px-2 py-1',
        dropdown:
          'peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0',
        dropdown_icon: 'ml-0.5 h-3.5 w-3.5 shrink-0 opacity-60',
        vhidden: 'sr-only',
        nav: 'absolute inset-x-0 top-1 flex items-center justify-between',
        nav_button:
          'inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-white p-0 text-ink-secondary opacity-70 hover:opacity-100',
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'w-9 rounded-md text-[0.8rem] font-normal text-ink-muted',
        row: 'mt-2 flex w-full',
        cell: 'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
        day: 'inline-flex h-9 w-9 items-center justify-center rounded-md p-0 font-normal hover:bg-brand-soft aria-selected:opacity-100',
        day_selected:
          'bg-brand text-white hover:bg-brand hover:text-white focus:bg-brand focus:text-white',
        day_today: 'bg-track font-semibold text-ink',
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
