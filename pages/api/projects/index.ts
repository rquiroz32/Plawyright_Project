import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/prisma/client';
import { Projects, ErrorResponse, ProjectsResponse } from '@/api/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ProjectsResponse | ErrorResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const dbProjects = await prisma.project.findMany();

  const projects: Projects = dbProjects.map(({ id, name }) => ({ id, name }));

  res.status(200).json({ projects });
}
