import { useMemo } from 'react';
import { Select } from '@mantine/core';
import { useProjects } from '@/hooks/useProjects';

type Props = {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
};

export const FilterProject: React.FC<Props> = ({ label, placeholder, value = '', onChange }) => {
  const { projects = [] } = useProjects();

  const data = useMemo(() => {
    return projects.map((p) => ({ label: p.name, value: `${p.id}` }));
  }, [projects]);

  return (
    <Select
      label={label}
      placeholder={placeholder}
      clearable
      data={data}
      value={value}
      onChange={onChange}
      wrapperProps={{ 'data-testid': 'filter-project' }}
    />
  );
};
