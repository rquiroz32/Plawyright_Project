import { ReportSeverity, ReportStatus, ReportType } from 'prisma/types';

export type ErrorResponse = { error: string };

export type ProjectsResponse = { projects: Projects };
export type Projects = { id: number; name: string }[];

export type OrderCol = 'id' | 'createdAt';
export type OrderDir = 'asc' | 'desc';

export type GetReportsFilters = {
  status: string;
  reportId: string;
  hackerEmail: string;
  project: string;
  severity: string;
  type: string;
  page?: number;
  perPage?: number;
  orderBy: OrderCol;
  orderDir: OrderDir;
};

export type ReportsResponse = {
  reports: Reports;
  meta: { page: number; totalPages: number };
};

export type Reports = Report[];

export type Report = {
  id: number;
  title: string;
  status: ReportStatus;
  type: ReportType;
  severity: ReportSeverity;
  createdAt: string;
  project: { id: number; name: string };
  user: { id: number; email: string };
};

export const ReportTypeLabels: Record<ReportType, string> = {
  blockchain_dlt: 'Blockchain / DLT',
  smart_contract: 'Smart Contract',
  websites_and_applications: 'Websites / WebApps',
};

export const ReportSeverityLabels: Record<ReportSeverity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  none: 'None',
};

export const ReportStatusLabels: Record<ReportStatus, string> = {
  reported: 'Reported',
  escalated: 'Escalated',
  confirmed: 'Confirmed',
  paid: 'Paid',
  closed: 'Closed',
};
