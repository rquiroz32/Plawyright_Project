import { Badge, DefaultMantineColor } from '@mantine/core';
import { ReportSeverity, ReportStatus, ReportType } from 'prisma/types';
import { ReportSeverityLabels, ReportStatusLabels, ReportTypeLabels } from '@/api/types';

type Props = {
  kind: 'severity' | 'status' | 'type';
  value: string;
};

const badgeProps: Record<
  Props['kind'],
  { variant: string; radius: string; color: (v: any) => string; label: (v: any) => string }
> = {
  severity: { variant: 'filled', radius: 'sm', color: severityColor, label: severityLabel },
  status: { variant: 'light', radius: 'sm', color: statusColor, label: statusLabel },
  type: { variant: 'dot', radius: 'sm', color: typeColor, label: typeLabel },
};

export const BadgeKind: React.FC<Props> = ({ kind, value }) => {
  const { variant, radius, color, label } = badgeProps[kind];

  return (
    <Badge color={color(value)} variant={variant} radius={radius}>
      {label(value)}
    </Badge>
  );
};

function severityColor(sev: ReportSeverity) {
  const colors: Record<ReportSeverity, DefaultMantineColor> = {
    critical: 'red.8',
    high: 'yellow.5',
    medium: 'blue.5',
    low: 'teal.4',
    none: 'gray.4',
  };

  return colors[sev] ?? 'dark';
}

function severityLabel(sev: ReportSeverity) {
  return ReportSeverityLabels[sev] ?? sev;
}

function statusColor(stat: ReportStatus) {
  const colors: Record<ReportStatus, DefaultMantineColor> = {
    confirmed: 'blue.8',
    closed: 'gray.6',
    escalated: 'red.7',
    paid: 'green.7',
    reported: 'yellow.6',
  };

  return colors[stat] ?? 'dark';
}

function statusLabel(stat: ReportStatus) {
  return ReportStatusLabels[stat] ?? stat;
}

function typeColor(typ: ReportType) {
  const colors: Record<ReportType, DefaultMantineColor> = {
    blockchain_dlt: 'red',
    smart_contract: 'green',
    websites_and_applications: 'blue',
  };

  return colors[typ] ?? 'dark';
}

function typeLabel(typ: ReportType) {
  return ReportTypeLabels[typ] ?? typ;
}
