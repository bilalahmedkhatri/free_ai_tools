import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const audioUrl = searchParams.get('url');

    if (!audioUrl) {
      return NextResponse.json(
        { error: 'Audio URL is required' },
        { status: 400 }
      );
    }

    // Validate URL to prevent SSRF attacks - only allow Replicate URLs
    const allowedDomains = ['replicate.delivery', 'pbxt.replicate.delivery'];
    let urlObj: URL;
    try {
      urlObj = new URL(audioUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    if (!allowedDomains.some(domain => urlObj.hostname.endsWith(domain))) {
      return NextResponse.json(
        { error: 'URL not allowed - only Replicate URLs are permitted' },
        { status: 403 }
      );
    }

    const response = await fetch(audioUrl);

    if (!response.ok) {
      // console.error('Failed to fetch audio:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Failed to fetch audio: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the audio buffer
    const audioBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'audio/mpeg';

    // Return the audio with proper headers
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    // console.error('Error proxying audio:', error);
    return NextResponse.json(
      { error: 'Failed to proxy audio file' },
      { status: 500 }
    );
  }
}
