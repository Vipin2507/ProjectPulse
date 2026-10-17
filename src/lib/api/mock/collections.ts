import { CRORE } from '@/lib/format';
import type { CollectionTrendPoint, InstallmentRow } from '@/types/project';
import { withMock } from './delay';
import { requireProject } from './projects';
import { scaleMoney } from './scale';

const TREND: Array<[string, number, number]> = [
  ['Jan', 22, 10],
  ['Feb', 38, 18],
  ['Mar', 55, 26],
  ['Apr', 72, 33],
  ['May', 88, 40],
  ['Jun', 105, 48],
];

const INSTALLMENTS: Array<[string, number, number]> = [
  ['Booking', 50, 48],
  ['Agreement', 75, 70],
  ['Plinth', 60, 55],
  ['Slab 1', 55, 40],
  ['Slab 2', 50, 35],
  ['Slab 3', 45, 28],
  ['Brickwork', 40, 22],
  ['Finishing', 35, 14],
  ['Possession', 30, 8],
];

export function trendFor(units: number): CollectionTrendPoint[] {
  return TREND.map(([month, salesCr, receivedCr]) => ({
    month,
    salesValueCumulative: scaleMoney(salesCr * CRORE, units),
    receivedCumulative: scaleMoney(receivedCr * CRORE, units),
  }));
}

export function installmentsFor(units: number): InstallmentRow[] {
  return INSTALLMENTS.map(([installment, demandedCr, receivedCr]) => {
    const demanded = scaleMoney(demandedCr * CRORE, units);
    const received = Math.min(demanded, scaleMoney(receivedCr * CRORE, units));
    return { installment, demanded, received, pending: demanded - received };
  });
}

export function getCollectionTrend(
  projectId: string,
  asOn: string,
): Promise<CollectionTrendPoint[]> {
  void asOn;
  return withMock(() => trendFor(requireProject(projectId).totalUnits));
}

export function getInstallmentWise(projectId: string, asOn: string): Promise<InstallmentRow[]> {
  void asOn;
  return withMock(() => installmentsFor(requireProject(projectId).totalUnits));
}
