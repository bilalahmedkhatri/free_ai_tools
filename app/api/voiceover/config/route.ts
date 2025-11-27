import { NextResponse } from 'next/server';

// Runtime toggle state (persists only during server runtime)
let runtimeUseReplicate: boolean | null = null;

export async function GET() {
  const useReplicate = runtimeUseReplicate !== null 
    ? runtimeUseReplicate 
    : process.env.USE_REPLICATE === 'true';
  
  return NextResponse.json({
    useReplicate,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { useReplicate } = body;
    
    if (typeof useReplicate !== 'boolean') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    
    // Set runtime override
    runtimeUseReplicate = useReplicate;
    
    return NextResponse.json({
      useReplicate: runtimeUseReplicate,
      message: 'API mode updated successfully',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
