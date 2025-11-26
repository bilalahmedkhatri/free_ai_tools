import { NextRequest, NextResponse } from 'next/server';
import { getAvailableReplicateVoices } from '@/app/lib/replicateService';

export async function GET(request: NextRequest) {
  try {
    const useReplicate = process.env.USE_REPLICATE === 'true';
    console.log('[Voice Samples] USE_REPLICATE:', useReplicate);

    if (useReplicate) {
      console.log('[Voice Samples] Using Replicate voices');
      const voices = getAvailableReplicateVoices();
      console.log('[Voice Samples] Loaded voices count:', voices.length);
      console.log('[Voice Samples] First voice:', JSON.stringify(voices[0], null, 2));
      
      return NextResponse.json(voices);
    }

    const apiUrl = process.env.VOICEOVER_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/voiceover/voiceover_samples`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache to get fresh data
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      return NextResponse.json(
        { error: error.detail || 'Failed to fetch voice samples' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Validate response format
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid response format from voice API' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching voice samples:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch voice samples. Please check if the API server is running.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
