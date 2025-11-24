import { NextRequest, NextResponse } from 'next/server';

// GET /api/voiceover/voiceover_samples - Get available voice samples/tones
export async function GET(request: NextRequest) {
  try {
    // Call the external voiceover API to get samples
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
    if (!data || !Array.isArray(data.voices)) {
      return NextResponse.json(
        { error: 'Invalid response format from voice API' },
        { status: 500 }
      );
    }

    // Return the data in the expected format
    return NextResponse.json({
      voices: data.voices.map((voice: any) => ({
        voice_id: voice.voice_id,
        voice_name: voice.voice_name,
        gender: voice.gender,
        accent: voice.accent,
        language: voice.language,
        description: voice.description,
        sample_url: voice.sample_url,
        provider: voice.provider,
        model_name: voice.model_name,
        is_active: voice.is_active,
      })),
    });

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
