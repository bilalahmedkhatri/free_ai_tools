'use client';

import { useState, useEffect } from 'react';

export const useVisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/count');
        const data = await response.json();
        if (response.ok) {
          setCount(data.count);
        } else {
          // console.error('Failed to fetch visitor count:', data.error);
          setCount(null);
        }
      } catch (error) {
        // console.error('Error fetching visitor count:', error);
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, isLoading };
};
