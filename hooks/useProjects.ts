import { useEffect, useState } from 'react';
import type { ProjectsResponse } from '@/api/types';
import { getProjects } from '../api';

export function useProjects() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<ProjectsResponse['projects']>();

  useEffect(() => {
    setLoading(true);
    setError('');
    getProjects()
      .then((res) => {
        setProjects(res.projects);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, error, projects };
}
