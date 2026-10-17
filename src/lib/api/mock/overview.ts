import { CRORE } from '@/lib/format';
import type {
  AreaStatementRow,
  FinancialSummary,
  ParkingInventoryRow,
  ParkingType,
  ProjectDetails,
  ProjectOverviewResponse,
  UnitInventoryRow,
  UnitType,
} from '@/types/project';
import { withMock } from './delay';
import { requireProject } from './projects';
import { scaleParts } from './scale';
import { constructionFor } from './construction';

const BASE_UNITS: UnitInventoryRow[] = [
  { unitType: '1 BHK', total: 50, sold: 30, unsold: 15, hold: 5 },
  { unitType: '2 BHK', total: 250, sold: 180, unsold: 50, hold: 20 },
  { unitType: '3 BHK', total: 150, sold: 90, unsold: 45, hold: 15 },
  { unitType: '4 BHK', total: 50, sold: 20, unsold: 30, hold: 0 },
];

const BASE_PARKING: ParkingInventoryRow[] = [
  { parkingType: 'Car Parking', total: 500, sold: 350, unsold: 150 },
  { parkingType: 'Two Wheeler', total: 80, sold: 50, unsold: 30 },
  { parkingType: 'Visitor Parking', total: 20, sold: 20, unsold: 0 },
];

export function financialsFor(project: ProjectDetails): FinancialSummary {
  const ratio = (amount: number) => Math.round((amount * project.totalUnits) / 500);
  const totalSalesValue = ratio(500 * CRORE);
  const totalReceived = ratio(320 * CRORE);
  const overdue = ratio(75 * CRORE);
  const outstanding = totalSalesValue - totalReceived;
  const notYetDue = outstanding - overdue;
  return { totalSalesValue, totalReceived, outstanding, overdue, notYetDue };
}

export function unitsFor(project: ProjectDetails): UnitInventoryRow[] {
  const totals = scaleParts(
    BASE_UNITS.map((row) => row.total),
    project.totalUnits,
  );
  return BASE_UNITS.map((row, index) => {
    const total = totals[index] ?? 0;
    const sold = Math.min(total, Math.round((row.sold / row.total) * total));
    const hold = Math.min(total - sold, Math.round((row.hold / row.total) * total));
    return {
      unitType: row.unitType as UnitType,
      total,
      sold,
      hold,
      unsold: total - sold - hold,
    };
  });
}

export function parkingFor(project: ProjectDetails): ParkingInventoryRow[] {
  const totals = scaleParts(
    BASE_PARKING.map((row) => row.total),
    project.totalParking,
  );
  return BASE_PARKING.map((row, index) => {
    const total = totals[index] ?? 0;
    const sold = Math.min(total, Math.round((row.sold / row.total) * total));
    return {
      parkingType: row.parkingType as ParkingType,
      total,
      sold,
      unsold: total - sold,
    };
  });
}

export function areaFor(project: ProjectDetails): AreaStatementRow[] {
  return unitsFor(project).map((row) => ({
    unitType: row.unitType,
    totalArea: row.total * 1000,
    soldArea: row.sold * 1000,
    unsoldArea: (row.unsold + row.hold) * 1000,
  }));
}

export function getProjectOverview(projectId: string, asOn: string): Promise<ProjectOverviewResponse> {
  return withMock(() => {
    const project = requireProject(projectId);
    return {
      project,
      asOn,
      financials: financialsFor(project),
      unitInventory: unitsFor(project),
      parkingInventory: parkingFor(project),
      areaStatement: areaFor(project),
      construction: constructionFor(project),
    };
  });
}

export function getUnitInventory(projectId: string, asOn: string): Promise<UnitInventoryRow[]> {
  void asOn;
  return withMock(() => unitsFor(requireProject(projectId)));
}

export function getParkingInventory(
  projectId: string,
  asOn: string,
): Promise<ParkingInventoryRow[]> {
  void asOn;
  return withMock(() => parkingFor(requireProject(projectId)));
}

export function getAreaStatement(projectId: string, asOn: string): Promise<AreaStatementRow[]> {
  void asOn;
  return withMock(() => areaFor(requireProject(projectId)));
}
