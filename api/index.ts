import { ProjectsResponse, GetReportsFilters, ReportsResponse, ErrorResponse } from './types';

export async function getProjects(): Promise<ProjectsResponse> {
  const url = new URL('/api/projects', window.location.href);

  try {
    const res = await fetch(url);
    const body = await res.json();
    if (!res.ok) throw Error((body as ErrorResponse).error);
    return body;
  } catch (err) {
    throw err;
  }
}

export async function getReports({
  status,
  reportId,
  hackerEmail,
  project,
  severity,
  type,
  page = 1,
  perPage = 10,
  orderBy,
  orderDir,
}: GetReportsFilters): Promise<ReportsResponse> {
  const url = new URL('/api/reports', window.location.href);

  if (status) url.searchParams.set('status', status);
  if (reportId) url.searchParams.set('reportId', reportId);
  if (hackerEmail) url.searchParams.set('hackerEmail', hackerEmail);
  if (project) url.searchParams.set('project', project);
  if (severity) url.searchParams.set('severity', severity);
  if (type) url.searchParams.set('type', type);
  if (orderBy) url.searchParams.set('orderBy', orderBy);
  if (orderDir) url.searchParams.set('orderDir', orderDir);

  url.searchParams.set('page', `${Math.max(1, page)}`);
  url.searchParams.set('perPage', `${Math.max(10, perPage)}`);

  try {
    const res = await fetch(url);
    const body = await res.json();
    if (!res.ok) throw Error((body as ErrorResponse).error);
    return body;
  } catch (err) {
    throw err;
  }
}
