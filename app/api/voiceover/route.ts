import { NextRequest, NextResponse } from 'next/server';
import { generateWithReplicate } from '@/app/lib/replicateService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice_id, speed = 1, pitch = 1, volume = 0.8, tone = 'neutral' } = body;
    
    const validate = (condition: boolean, message: string, status = 400) => {
      if (condition) {
        throw { message, status };
      }
    };

    validate(!text || typeof text !== 'string', 'Text is required and must be a string');
    validate(!voice_id || typeof voice_id !== 'string', 'Voice ID is required and must be a string');
    validate(speed < 0.5 || speed > 2, 'Speed must be between 0.5 and 2');
    validate(pitch < 0 || pitch > 2, 'Pitch must be between 0 and 2');
    validate(volume < 0 || volume > 1, 'Volume must be between 0 and 1');

    // Check runtime config with fallback
    let useReplicate = false;
    try {
      const configResponse = await fetch(new URL('/api/voiceover/config', request.url).toString());
      if (configResponse.ok) {
        const config = await configResponse.json();
        useReplicate = config.useReplicate;
      }
    } catch (error) {
      // console.error('Failed to fetch config, using default API:', error);
      // Fallback to default API (useReplicate = false)
    }

    if (useReplicate) {
      // console.log('=== Using Replicate Kokoro-82M ===');
      // console.log('Voice:', voice_id);
      // console.log('Text length:', text.length);
      // console.log('Parameters: speed=' + speed + ', pitch=' + pitch + ', volume=' + volume);
      
      if (pitch !== 1 || volume !== 1) {
        // console.warn('⚠️  Kokoro-82M only supports speed parameter. Pitch and volume will be ignored.');
      }
      
      const result = await generateWithReplicate({
        text,
        voice: voice_id,
        speed, // Only speed is supported by Kokoro-82M
        pitch, // Ignored by model
        volume, // Ignored by model
      });

      const id = generateId();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      return NextResponse.json({
        id,
        audio_url: result.audioUrl,
        voice_name: voice_id,
        duration_seconds: 0,
        file_size: result.audioBuffer.byteLength,
        expires_at: expiresAt,
        remaining_uses: 999,
        reset_at: null,
      });
    }

    const apiUrl = process.env.VOICEOVER_API_URL || 'http://localhost:8000';
    const endpoint = `${apiUrl}/api/voiceover/free_tool`;
    
    // console.log('=== Using Custom API ===');
    // console.log('Endpoint:', endpoint);
    // console.log('Body:', JSON.stringify({ text, voice_id, speed, pitch, volume, tone }, null, 2));
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice_id, speed, pitch, volume, tone }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to generate voiceover';
      try {
        const error = await response.json();
        // console.error('API Error Response:', error);
        errorMessage = error.detail || error.message || JSON.stringify(error);
      } catch {
        errorMessage = await response.text() || `API returned status ${response.status}`;
        // console.error('API Error Text:', errorMessage);
      }
      
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    
    return NextResponse.json({
      id: data.id,
      audio_url: data.audio_url,
      voice_name: data.voice_name,
      duration_seconds: data.duration_seconds,
      file_size: data.file_size,
      expires_at: data.expires_at,
      remaining_uses: data.remaining_uses,
      reset_at: data.reset_at,
    });

  } catch (error: any) {
    // console.error('Error generating voiceover:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate voiceover. Please check if the API server is running.' },
      { status: error.status || 500 }
    );
  }
}

function generateId(): string {
  return `vo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
