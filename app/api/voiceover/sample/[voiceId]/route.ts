import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ voiceId: string }> }
) {
  try {
    const { voiceId } = await params;
    
    const samplePath = join(process.cwd(), 'app', 'voice_samples', `${voiceId}.wav`);
    
    if (!existsSync(samplePath)) {
      return NextResponse.json(
        { error: `Sample not found for voice: ${voiceId}` },
        { status: 404 }
      );
    }
    
    const audioBuffer = readFileSync(samplePath);
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving voice sample:', error);
    return NextResponse.json(
      { error: 'Failed to load voice sample' },
      { status: 500 }
    );
  }
}
