'use client';

import { useState, useEffect } from 'react';

export interface VisitorStat {
  country: string;
  city: string;
  count: number;
}

export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/visit'); // Assuming this new endpoint exists
        console.log("Fetching visitor stats, response status:", response);
        if (!response.ok) throw new Error('Failed to fetch visitor stats');
        const data: VisitorStat[] = await response.json();
        setStats(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}