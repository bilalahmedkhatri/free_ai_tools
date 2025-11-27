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
      
      // console.log('[useVoiceSamples] Fetching voices...');
      
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const samples = await Promise.race([
        getVoiceSamples(),
        timeoutPromise
      ]);
      
      // console.log('[useVoiceSamples] Received voices:', samples.length);
      // console.log('[useVoiceSamples] First voice:', samples[0]);
      
      setVoices(samples);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load voices';
      setError(errorMessage);
      // console.error('[useVoiceSamples] Error loading voice samples:', err);
      setVoices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVoices();
  }, [fetchVoices]);

  return { voices, loading, error, refetch: fetchVoices };
}
