import { useState, useEffect, useCallback } from 'react';
import { getVoiceSamples, VoiceSample } from '../lib/voiceoverApi';

export function useVoiceSamples() {
  const [voices, setVoices] = useState<VoiceSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVoices = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
      setLoading(true);
      setError(null);
      
      // console.log('[useVoiceSamples] Fetching voices...');
      
      const samples = await getVoiceSamples();
      clearTimeout(timeoutId);
      
      // console.log('[useVoiceSamples] Received voices:', samples.length);
      // console.log('[useVoiceSamples] First voice:', samples[0]);
      
      setVoices(samples);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timeout - please try again');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load voices';
        setError(errorMessage);
      }
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
