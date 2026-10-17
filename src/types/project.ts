export type ProjectStatus = 'Active' | 'Planning' | 'Completed' | 'On Hold';
export type UnitType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK';
export type ParkingType = 'Car Parking' | 'Two Wheeler' | 'Visitor Parking';

export interface ProjectSummary {
  id: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
  city: string;
  totalUnits: number;
  totalParking: number;
  completionPercent: number;
  imageUrl: string | null;
}

export interface ProjectDetails extends ProjectSummary {
  totalWings: number;
  totalTowers: number;
  projectType: 'Residential' | 'Commercial' | 'Mixed Use';
  reraNumber: string;
  projectStart: string;
  expectedCompletion: string;
  about: string;
}

export interface FinancialSummary {
  totalSalesValue: number;
  totalReceived: number;
  outstanding: number;
  overdue: number;
  notYetDue: number;
}

export interface UnitInventoryRow {
  unitType: UnitType;
  total: number;
  sold: number;
  unsold: number;
  hold: number;
}

export interface ParkingInventoryRow {
  parkingType: ParkingType;
  total: number;
  sold: number;
  unsold: number;
}

export interface AreaStatementRow {
  unitType: UnitType;
  totalArea: number;
  soldArea: number;
  unsoldArea: number;
}

export interface CollectionTrendPoint {
  month: string;
  salesValueCumulative: number;
  receivedCumulative: number;
}

export interface InstallmentRow {
  installment: string;
  demanded: number;
  received: number;
  pending: number;
}

export interface OutstandingCustomerRow {
  customerId: string;
  customerName: string;
  unitNo: string;
  outstanding: number;
  overdue: number;
}

export interface OutstandingUnitRow {
  unitNo: string;
  unitType: UnitType;
  tower: string;
  outstanding: number;
  overdue: number;
}

export interface AgeingBucket {
  bucket: '0-30 days' | '31-60 days' | '61-90 days' | '90+ days';
  amount: number;
  customers: number;
}

export interface ConstructionStage {
  key:
    | 'land_approvals'
    | 'foundation'
    | 'structure'
    | 'brickwork'
    | 'plastering'
    | 'finishing'
    | 'possession';
  label: string;
  percent: number;
}

export interface ConstructionProgress {
  overallPercent: number;
  stages: ConstructionStage[];
}

export interface ProjectOverviewResponse {
  project: ProjectDetails;
  asOn: string;
  financials: FinancialSummary;
  unitInventory: UnitInventoryRow[];
  parkingInventory: ParkingInventoryRow[];
  areaStatement: AreaStatementRow[];
  construction: ConstructionProgress;
}
