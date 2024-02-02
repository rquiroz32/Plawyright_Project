import { SegmentedControl } from '@mantine/core';
import { ReportStatus } from '../../prisma/types';
import { ReportStatusLabels } from '@/api/types';

const data = [{ label: 'All', value: '' }].concat(
  Object.values(ReportStatus).map((s) => {
    return { value: s, label: ReportStatusLabels[s] };
  })
);

type Props = {
  value?: string;
  onChange: (v: string) => void;
};

export const FilterStatus: React.FC<Props> = ({ value = '', onChange }) => {
  return <SegmentedControl data={data} value={value} onChange={onChange} data-testid="filter-status" />;
};
