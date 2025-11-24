import { NextRequest, NextResponse } from 'next/server';

// GET /api/voiceover/[id] - Get voiceover metadata/status
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

    // TODO: Fetch voiceover metadata from database/storage
    // In production, retrieve from your database
    
    // Mock response
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

// DELETE /api/voiceover/[id] - Delete voiceover
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

    // TODO: Delete audio file from storage
    // await deleteAudioFromStorage(voiceoverId);

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
