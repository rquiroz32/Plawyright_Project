type Props = {
  value: string;
};

export const DateStacked: React.FC<Props> = ({ value }) => {
  const date = new Date(value);
  return (
    <>
      {date.toLocaleDateString()}
      <br />
      {date.toLocaleTimeString()}
    </>
  );
};
