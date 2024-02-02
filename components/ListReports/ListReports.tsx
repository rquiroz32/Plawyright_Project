import { Box, Table, Loader, Badge, Pagination, Flex, Center, Space } from '@mantine/core';
import type { UseReports } from '@/hooks/useReports';
import { BadgeKind } from '../BadgeKind/BadgeKind';
import { DateStacked } from '../DateStacked/DateStacked';
import { SortBtn } from '../SortBtn/SortBtn';

type Props = {
  reports: UseReports;
};

export const ListReports: React.FC<Props> = ({ reports }) => {
  const sortCurrent = { col: reports.filters.orderBy, dir: reports.filters.orderDir };

  return (
    <Box>
      <Table
        striped
        verticalSpacing="lg"
        sx={(theme) => ({
          'borderRadius': '.3rem',
          'boxShadow': `0 0 3px ${theme.colors.gray[5]}`,
          'overflow': 'hidden',
          'thead tr th': { padding: '.5rem .625rem', backgroundColor: theme.colors.gray[2] },
        })}
      >
        <thead>
          <tr>
            <th>
              <Flex align="center" gap="xs">
                <Box>ID</Box>
                <SortBtn col="id" current={sortCurrent} onClick={reports.setSort} />
              </Flex>
            </th>
            <th>
              <Flex align="center" gap="xs">
                <Box>Date</Box>
                <SortBtn col="createdAt" current={sortCurrent} onClick={reports.setSort} />
              </Flex>
            </th>
            <th>Project</th>
            <th>Hacker</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody style={{ position: 'relative' }}>
          <tr style={{ background: 'transparent' }}>
            <td colSpan={20} style={{ padding: 0 }}>
              {reports.loading ? (
                <>
                  <Loading />
                  {reports.data.length === 0 ? <Space h="md" /> : null}
                </>
              ) : reports.data.length === 0 ? (
                <Box
                  sx={(theme) => ({
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: theme.colors.gray[6],
                    padding: '1.5rem 1rem',
                  })}
                >
                  No results found
                </Box>
              ) : null}
            </td>
          </tr>

          {reports.data.map((r) => {
            return (
              <tr key={r.id} data-testid={`report-row-${r.id}`}>
                <td width="80px">
                  <Badge variant="outline" color="dark.3" radius="sm">
                    #{r.id}
                  </Badge>
                </td>
                <td width="120px" style={{ fontSize: '.8rem', lineHeight: '1.1' }}>
                  <DateStacked value={r.createdAt} />
                </td>
                <td>
                  <strong>{r.project.name}</strong>
                </td>
                <td>
                  <span>{r.user.email.toLocaleLowerCase()}</span>
                </td>
                <td>
                  <BadgeKind kind="type" value={r.type} />
                </td>
                <td>
                  <BadgeKind kind="severity" value={r.severity} />
                </td>
                <td>
                  <BadgeKind kind="status" value={r.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Center mt="2rem">
        <Pagination value={reports.page} onChange={reports.setPage} total={reports.totalPages} />
      </Center>
    </Box>
  );
};

function Loading() {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '.1em 1em',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        transform: 'translate(0, -50%)',
        backgroundColor: theme.colors.yellow[1],
        fontSize: '.9rem',
      })}
    >
      <Loader size="xs" mr="1em" /> Loading...
    </Box>
  );
}
