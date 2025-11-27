import { NextRequest, NextResponse } from 'next/server';
import { getAvailableReplicateVoices } from '@/app/lib/replicateService';

export async function GET(request: NextRequest) {
  try {
    // Fetch runtime config to check which API to use
    const configResponse = await fetch(`${request.nextUrl.origin}/api/voiceover/config`);
    const config = await configResponse.json();
    const useReplicate = config.useReplicate;
    
    // console.log('[Voice Samples] USE_REPLICATE:', useReplicate);

    if (useReplicate) {
      // console.log('[Voice Samples] Using Replicate voices');
      const voices = getAvailableReplicateVoices();
      // console.log('[Voice Samples] Loaded voices count:', voices.length);
      // console.log('[Voice Samples] First voice:', JSON.stringify(voices[0], null, 2));
      
      return NextResponse.json(voices);
    }

    // console.log('[Voice Samples] Using Default API voices');
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
    
    // Backend returns { voices: [...], total: number, language: string }
    // Extract the voices array
    if (data.voices && Array.isArray(data.voices)) {
      return NextResponse.json(data.voices);
    }
    
    // Fallback: if response is already an array
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }
    
    // Invalid format
    return NextResponse.json(
      { error: 'Invalid response format from voice API' },
      { status: 500 }
    );

  } catch (error) {
    // console.error('Error fetching voice samples:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch voice samples. Please check if the API server is running.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
