import { CRORE, LAKH } from '@/lib/format';
import type {
  AgeingBucket,
  OutstandingCustomerRow,
  OutstandingUnitRow,
  UnitType,
} from '@/types/project';
import { withMock } from './delay';
import { financialsFor } from './overview';
import { requireProject } from './projects';
import { scaleMoney, scaleParts } from './scale';

const CUSTOMERS: Array<[string, string, string, number, number]> = [
  ['cust-1', 'Rahul Sharma', 'A-101', 40, 20],
  ['cust-2', 'Priya Mehta', 'B-201', 30, 10],
  ['cust-3', 'Amit Gupta', 'C-305', 25, 0],
  ['cust-4', 'Kavita Singh', 'D-102', 30, 15],
  ['cust-5', 'Vikram Malhotra', 'B-120', 25, 0],
  ['cust-6', 'Neha Kapoor', 'A-204', 18, 8],
  ['cust-7', 'Suresh Iyer', 'C-110', 22, 12],
  ['cust-8', 'Anjali Desai', 'B-305', 15, 5],
  ['cust-9', 'Rohit Verma', 'D-210', 20, 0],
  ['cust-10', 'Meera Nair', 'A-118', 12, 6],
  ['cust-11', 'Arjun Reddy', 'C-402', 28, 10],
  ['cust-12', 'Pooja Shah', 'B-015', 16, 4],
  ['cust-13', 'Karan Joshi', 'D-308', 14, 7],
  ['cust-14', 'Divya Rao', 'A-220', 19, 9],
  ['cust-15', 'Sanjay Pillai', 'C-201', 11, 3],
];

const UNIT_TYPES: Record<string, UnitType> = {
  A: '3 BHK',
  B: '2 BHK',
  C: '3 BHK',
  D: '4 BHK',
};

const AGEING: Array<[AgeingBucket['bucket'], number, number]> = [
  ['0-30 days', 22, 18],
  ['31-60 days', 20, 14],
  ['61-90 days', 18, 11],
  ['90+ days', 15, 9],
];

function customersFor(units: number): OutstandingCustomerRow[] {
  return CUSTOMERS.map(([customerId, customerName, unitNo, outstandingL, overdueL]) => ({
    customerId,
    customerName,
    unitNo,
    outstanding: scaleMoney(outstandingL * LAKH, units),
    overdue: scaleMoney(overdueL * LAKH, units),
  }));
}

function unitsForOutstanding(units: number): OutstandingUnitRow[] {
  return customersFor(units).map((row) => {
    const tower = row.unitNo.split('-')[0] ?? 'A';
    return {
      unitNo: row.unitNo,
      unitType: UNIT_TYPES[tower] ?? '2 BHK',
      tower,
      outstanding: row.outstanding,
      overdue: row.overdue,
    };
  });
}

function ageingFor(projectId: string): AgeingBucket[] {
  const project = requireProject(projectId);
  const overdue = financialsFor(project).overdue;
  const amounts = scaleParts(
    AGEING.map(([, crore]) => crore * CRORE),
    overdue,
  );
  return AGEING.map(([bucket, , customers], index) => ({
    bucket,
    amount: amounts[index] ?? 0,
    customers: Math.max(1, Math.round((customers * project.totalUnits) / 500)),
  }));
}

export function getOutstandingTopCustomers(
  projectId: string,
  asOn: string,
  limit: number,
): Promise<OutstandingCustomerRow[]> {
  void asOn;
  return withMock(() => customersFor(requireProject(projectId).totalUnits).slice(0, limit));
}

export function getOutstandingUnitWise(
  projectId: string,
  asOn: string,
): Promise<OutstandingUnitRow[]> {
  void asOn;
  return withMock(() => unitsForOutstanding(requireProject(projectId).totalUnits));
}

export function getOutstandingAgeing(projectId: string, asOn: string): Promise<AgeingBucket[]> {
  void asOn;
  return withMock(() => ageingFor(projectId));
}
