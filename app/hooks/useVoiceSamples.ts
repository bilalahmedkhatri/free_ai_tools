import { useState, useEffect, useCallback } from 'react';
import { getVoiceSamples, VoiceSample } from '../lib/voiceoverApi';

export function useVoiceSamples() {
  const [voices, setVoices] = useState<VoiceSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent blocking - increased to 10s
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const samples = await Promise.race([
        getVoiceSamples(),
        timeoutPromise
      ]);
      
      setVoices(samples);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load voices';
      setError(errorMessage);
      console.error('Error loading voice samples:', err);
      // Set empty array on error so the page still works
      setVoices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVoices();
  }, [fetchVoices]);

  return { voices, loading, error };
}
