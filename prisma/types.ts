export enum ReportStatus {
  reported = 'reported',
  escalated = 'escalated',
  confirmed = 'confirmed',
  paid = 'paid',
  closed = 'closed'
}

export enum ReportSeverity {
  critical = 'critical',
  high = 'high',
  medium = 'medium',
  low = 'low',
  none = 'none',
}

export enum ReportType {
  websites_and_applications = 'websites_and_applications',
  smart_contract = 'smart_contract',
  blockchain_dlt = 'blockchain_dlt'
}
