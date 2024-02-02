import { ActionIcon } from '@mantine/core';
import type { OrderCol, OrderDir } from '@/api/types';

type Props = {
  col: OrderCol;
  current: { col: OrderCol; dir: OrderDir };
  onClick: (col: OrderCol, dir: OrderDir) => void;
};

export const SortBtn: React.FC<Props> = ({ col, current, onClick }) => {
  const isSet = current.col === col;

  const nextDir = !isSet ? 'asc' : current.dir === 'asc' ? 'desc' : 'asc';

  const [iconAsc, iconDsc] = ['↓', '↑'];
  const icon = !isSet ? '⇅' : current.dir === 'asc' ? iconAsc : iconDsc;

  const color = !isSet ? 'gray.5' : 'blue.7';

  return (
    <ActionIcon color={color} onClick={() => onClick(col, nextDir)}>
      {icon}
    </ActionIcon>
  );
};
