import { format, parseISO } from 'date-fns';

export const CRORE = 10_000_000;
export const LAKH = 100_000;

export function formatCrore(rupees: number): string {
  return `₹ ${(rupees / CRORE).toFixed(2)} Cr`;
}

export function formatLakh(rupees: number): string {
  return `₹ ${(rupees / LAKH).toFixed(2)} L`;
}

export function formatIndianNumber(n: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));
}

export function formatInr(rupees: number): string {
  const abs = Math.abs(rupees);
  if (abs >= CRORE) return formatCrore(rupees);
  if (abs >= LAKH) return formatLakh(rupees);
  return `₹ ${formatIndianNumber(rupees)}`;
}

export function percent(part: number, whole: number, digits = 0): number {
  if (whole === 0) return 0;
  const factor = 10 ** digits;
  return Math.round((part / whole) * 100 * factor) / factor;
}

/** Integer percents that always sum to 100 (largest-remainder, integer-safe). */
export function percentParts(values: number[]): number[] {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return values.map(() => 0);
  const scaled = values.map((value) => value * 100);
  const base = scaled.map((value) => Math.floor(value / total));
  const leftover = 100 - base.reduce((sum, value) => sum + value, 0);
  const order = scaled
    .map((value, index) => ({ index, rem: value % total }))
    .sort((a, b) => b.rem - a.rem || b.index - a.index);
  const result = [...base];
  for (let i = 0; i < leftover; i += 1) {
    const pick = order[i];
    if (!pick) break;
    result[pick.index] = (result[pick.index] ?? 0) + 1;
  }
  return result;
}

export function formatMonthYear(iso: string): string {
  return format(parseISO(iso), 'MMM yyyy');
}

export function formatAsOn(date: string): string {
  return `As on ${format(parseISO(date), 'd MMM yyyy')}`;
}

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
