import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const counterFilePath = path.join(process.cwd(), '.counter.json');

// Helper function to read the current count
const readCount = (): number => {
  try {
    const data = fs.readFileSync(counterFilePath, 'utf-8');
    const json = JSON.parse(data);
    return json.count || 0;
  } catch (error) {
    // If file doesn't exist or is invalid, return 0
    // console.error('Error reading counter file:', error);
    return 0;
  }
};

export async function GET() {
  try {
    const currentCount = readCount();
    return NextResponse.json({ count: currentCount }, { status: 200 });
  } catch (error) {
    // console.error('Failed to read visitor count:', error);
    return NextResponse.json({ error: 'Failed to read visitor count' }, { status: 500 });
  }
}
