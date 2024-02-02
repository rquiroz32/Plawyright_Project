import Head from 'next/head';
import { Alert, Box, CloseButton, Flex, Sx, TextInput, Title } from '@mantine/core';
import { FilterProject } from '@/components/FilterProject/FilterProject';
import { FilterSeverity } from '@/components/FilterSeverity/FilterSeverity';
import { FilterType } from '@/components/FilterType/FilterType';
import { FilterStatus } from '@/components/FilterStatus/FilterStatus';
import { ListReports } from '@/components/ListReports/ListReports';
import { useReports } from '@/hooks/useReports';

export default function Home() {
  const reports = useReports();

  return (
    <>
      <Head>
        <title>Immunefi - Reports</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main" maw="1400px" m="0 auto" p="2em 0">
        <Title order={1} mb="2rem">
          Reports
        </Title>

        <FilterStatus value={reports.filters.status} onChange={reports.setStatus} />

        <Flex gap="xs" m="1rem 0 2rem">
          <TextInput
            label="Report ID"
            placeholder="Search by ID"
            value={reports.filters.reportId}
            onChange={(ev) => reports.setReportID(ev.currentTarget.value)}
            rightSection={TextInputClear(reports.filters.reportId, () => reports.setReportID(''))}
            data-testid="filter-report"
          />
          <FilterProject
            label="Project"
            placeholder="Filter by Project"
            value={reports.filters.project}
            onChange={reports.setProjectID}
          />
          <FilterSeverity
            label="Severity"
            placeholder="Filter by Severity"
            value={reports.filters.severity}
            onChange={reports.setSeverity}
          />
          <FilterType
            label="Type"
            placeholder="Filter by Type"
            value={reports.filters.type}
            onChange={reports.setType}
          />
        </Flex>

        {reports.error ? (
          <Alert
            color="red"
            variant="filled"
            mb="2rem"
            sx={{ '.mantine-Alert-message': { fontWeight: 'bold' } }}
            data-testid="reports-error"
          >
            {reports.error}
          </Alert>
        ) : null}

        <ListReports reports={reports} />
      </Box>
    </>
  );
}

function TextInputClear(value: unknown, onClick: () => void) {
  const sx = !value ? { pointerEvents: 'none', opacity: 0 } : {};
  return <CloseButton onClick={onClick} sx={sx as Sx} />;
}
