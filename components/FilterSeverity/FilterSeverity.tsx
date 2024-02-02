import { Select, SelectProps } from '@mantine/core';
import { ReportSeverity } from '../../prisma/types';
import { ReportSeverityLabels } from '@/api/types';

const data: SelectProps['data'] = Object.values(ReportSeverity).map((t) => {
  return { value: t, label: ReportSeverityLabels[t] };
});

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
};

export const FilterSeverity: React.FC<Props> = ({ label, placeholder, value = '', onChange }) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      clearable
      data={data}
      value={value}
      onChange={onChange}
      wrapperProps={{ 'data-testid': 'filter-severity' }}
    />
  );
};
