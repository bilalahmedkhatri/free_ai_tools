import { NextRequest, NextResponse } from 'next/server';

// POST /api/voiceover/free_tool - Generate voiceover
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice_id, speed = 1, pitch = 1, volume = 0.8, tone = 'neutral' } = body;
    
    // Validation helper
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

    // Call external API
    const apiUrl = process.env.VOICEOVER_API_URL || 'http://localhost:8000';
    const endpoint = `${apiUrl}/api/voiceover/free_tool`;
    
    console.log('=== API Request ===');
    console.log('Endpoint:', endpoint);
    console.log('Body:', JSON.stringify({ text, voice_id, speed, pitch, volume, tone }, null, 2));
    console.log('==================');
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice_id, speed, pitch, volume, tone }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to generate voiceover';
      try {
        const error = await response.json();
        console.error('API Error Response:', error);
        errorMessage = error.detail || error.message || JSON.stringify(error);
      } catch {
        errorMessage = await response.text() || `API returned status ${response.status}`;
        console.error('API Error Text:', errorMessage);
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
    console.error('Error generating voiceover:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate voiceover. Please check if the API server is running.' },
      { status: error.status || 500 }
    );
  }
}

// Helper function to generate unique ID
function generateUniqueId(): string {
  return `vo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
