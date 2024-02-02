import { Select, SelectProps } from '@mantine/core';
import { ReportType } from '../../prisma/types';
import { ReportTypeLabels } from '@/api/types';

const data: SelectProps['data'] = Object.values(ReportType).map((t) => {
  return { value: t, label: ReportTypeLabels[t] };
});

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
};

export const FilterType: React.FC<Props> = ({ label, placeholder, value = '', onChange }) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      clearable
      data={data}
      value={value}
      onChange={onChange}
      wrapperProps={{ 'data-testid': 'filter-type' }}
    />
  );
};
