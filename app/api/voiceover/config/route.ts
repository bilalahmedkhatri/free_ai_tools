import { NextResponse } from 'next/server';

export async function GET() {
  const useReplicate = process.env.USE_REPLICATE === 'true';
  
  return NextResponse.json({
    useReplicate,
  });
}
