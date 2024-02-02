import { useMemo, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { getReports } from '@/api';
import type { ReportsResponse, GetReportsFilters } from '@/api/types';

export type UseReports = ReturnType<typeof useReports>;

const asStringArr = (v?: string | string[]) => ([] as string[]).concat(v ?? '');

export function useReports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [meta, setMeta] = useState<ReportsResponse['meta']>({ page: 1, totalPages: 0 });
  const [reports = [], setReports] = useState<ReportsResponse['reports']>();

  const router = useRouter();

  const filters = useMemo(() => {
    let qry = router.query;
    // fix for next-router-mock returning 'query' as string
    if (typeof qry === 'string') qry = Object.fromEntries(new URLSearchParams(qry));

    return {
      status: asStringArr(qry.status)[0],
      reportId: asStringArr(qry.reportId)[0],
      hackerEmail: asStringArr(qry.hackerEmail)[0],
      project: asStringArr(qry.project)[0],
      severity: asStringArr(qry.severity)[0],
      type: asStringArr(qry.type)[0],
      orderBy: asStringArr(qry.orderBy)[0],
      orderDir: asStringArr(qry.orderDir)[0],
    } as GetReportsFilters;
  }, [router.query]);

  const loadReports = useMemo(
    () =>
      debounce((params: GetReportsFilters) => {
        setLoading(true);
        setError('');
        getReports(params)
          .then((res) => {
            setReports(res.reports);
            setMeta(res.meta);
          })
          .catch((err) => {
            setError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 250),
    []
  );

  useEffect(() => {
    loadReports({ ...filters, page: meta.page });
  }, [meta.page, filters, loadReports]);

  const setFilter = (filter: 'status' | 'reportId' | 'hackerEmail' | 'project' | 'severity' | 'type') => {
    return (value: string) => {
      const { pathname, query } = router;
      const params = new URLSearchParams(query as unknown as string);
      value ? params.set(filter, value) : params.delete(filter);
      router.replace({ pathname, query: params.toString() }, undefined, { shallow: true });
    };
  };

  const setSort = (col: GetReportsFilters['orderBy'] = 'id', dir: GetReportsFilters['orderDir'] = 'asc') => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query as unknown as string);
    params.set('orderBy', col);
    params.set('orderDir', dir);
    router.replace({ pathname, query: params.toString() }, undefined, { shallow: true });
  };

  return {
    loading,
    error,
    data: reports,
    page: meta.page,
    totalPages: meta.totalPages,
    filters,
    setPage: (page: number) => setMeta((prev) => ({ ...prev, page })),
    setSort,
    setStatus: setFilter('status'),
    setReportID: setFilter('reportId'),
    setHackerEmail: setFilter('hackerEmail'),
    setProjectID: setFilter('project'),
    setSeverity: setFilter('severity'),
    setType: setFilter('type'),
  };
}
