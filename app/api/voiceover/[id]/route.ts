import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: voiceoverId } = await params;

    if (!voiceoverId) {
      return NextResponse.json(
        { error: 'Voiceover ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      voiceover_id: voiceoverId,
      status: 'completed', // or 'processing', 'failed'
      download_url: `/api/voiceover/${voiceoverId}/download`,
      metadata: {
        text_length: 0,
        voice_id: 'unknown',
        speed: 1,
        pitch: 1,
        volume: 0.8,
        created_at: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Error fetching voiceover:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voiceover' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: voiceoverId } = await params;

    if (!voiceoverId) {
      return NextResponse.json(
        { error: 'Voiceover ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Voiceover deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting voiceover:', error);
    return NextResponse.json(
      { error: 'Failed to delete voiceover' },
      { status: 500 }
    );
  }
}
