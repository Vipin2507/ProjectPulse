'use client';

import { useState } from 'react';
import { format, parseISO, startOfToday } from 'date-fns';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatAsOn } from '@/lib/format';
import { useUiStore } from '@/store/uiStore';

export function AsOnDatePicker() {
  const asOnDate = useUiStore((state) => state.asOnDate);
  const setAsOnDate = useUiStore((state) => state.setAsOnDate);
  const selected = parseISO(asOnDate);
  const [month, setMonth] = useState(selected);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink"
          aria-label="Choose as-on date"
        >
          <CalendarDays className="h-4 w-4 text-ink-muted" aria-hidden />
          {formatAsOn(asOnDate)}
          <ChevronDown className="h-4 w-4 text-ink-muted" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={selected}
          month={month}
          onMonthChange={setMonth}
          captionLayout="dropdown-buttons"
          fromYear={2018}
          toYear={startOfToday().getFullYear()}
          disabled={{ after: startOfToday() }}
          onSelect={(date) => {
            if (!date) return;
            setAsOnDate(format(date, 'yyyy-MM-dd'));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
