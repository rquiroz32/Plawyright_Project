import * as yup from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { ReportStatus, ReportSeverity, ReportType } from '../../../prisma/types';

import { prisma } from '@/prisma/client';
import type { ReportsResponse, Reports, ErrorResponse } from '@/api/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReportsResponse | ErrorResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { qry, err } = await parseQuery(req.query);
  if (err || !qry) {
    return res.status(400).json({ error: `Invalid query: ${err?.message ?? 'failed to parse'}` });
  }

  const where: Prisma.ReportWhereInput = {};
  if (qry.status) where.status = qry.status as ReportStatus;
  if (qry.reportId) where.id = qry.reportId;
  if (qry.hackerEmail) where.user = { email: { startsWith: qry.hackerEmail, mode: 'insensitive' } };
  if (qry.project) where.projectId = qry.project;
  if (qry.severity) where.severity = qry.severity as ReportSeverity;
  if (qry.type) where.type = qry.type as ReportType;

  try {
    // Can't run in transaction to be able to compute page from totalPages
    const totalRows = await prisma.report.count({ where });

    const perPage = qry.perPage;
    const totalPages = Math.ceil(totalRows / perPage);
    const page = Math.min(qry.page, totalPages);

    const dbReports = await prisma.report.findMany({
      where,
      skip: perPage * Math.max(0, page - 1),
      take: perPage,
      orderBy: { [qry.orderBy]: qry.orderDir },
      include: {
        project: { select: { id: true, name: true } },
        user: { select: { id: true, email: true } },
      },
    });

    // Convert db reports to DTOs
    const reports: Reports = dbReports.map((r) => {
      const { userId, projectId, createdAt, ...rest } = r;
      return { ...rest, createdAt: createdAt.toISOString() };
    });

    res.status(200).json({ reports, meta: { page, totalPages } });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

const querySchema = yup.object({
  status: yup.string().oneOf(Object.values(ReportStatus)),
  reportId: yup.number().positive().integer(),
  hackerEmail: yup.string().trim(),
  project: yup.number().positive().integer(),
  severity: yup.string().oneOf(Object.values(ReportSeverity)),
  type: yup.string().oneOf(Object.values(ReportType)),
  perPage: yup.number().positive().integer().default(10),
  page: yup.number().positive().integer().default(1),
  orderBy: yup.string().oneOf(['id', 'createdAt']).default('id'),
  orderDir: yup.string().oneOf(['asc', 'desc']).default('asc'),
});

type QuerySchema = yup.InferType<typeof querySchema>;
async function parseQuery(input: unknown): Promise<{ qry?: QuerySchema; err?: Error }> {
  try {
    const qry = await querySchema.validate(input, { strict: false, abortEarly: true, stripUnknown: true });
    return { qry };
  } catch (err) {
    return { err: err as Error };
  }
}
