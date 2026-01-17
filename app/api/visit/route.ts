import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// Use the correct path for the counter file
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

// Helper function to write the new count
const writeCount = (newCount: number): void => {
  try {
    const data = JSON.stringify({ count: newCount }, null, 2);
    fs.writeFileSync(counterFilePath, data, 'utf-8');
  } catch (error) {
    // console.error('Error writing counter file:', error);
  }
};

export async function GET() {
  // In a real production environment, you might want to remove this check
  // or implement a more robust solution for concurrent writes.
  /*
  if (process.env.NODE_ENV === 'development') {
    // console.log('Visitor count API called in development mode. Skipping file write.');
    return NextResponse.json({ message: 'Visitor count incremented (dev mode skip)' }, { status: 200 });
  }
  */

  try {
    const currentCount = readCount();
    const newCount = currentCount + 1;
    writeCount(newCount);

    return NextResponse.json({ message: 'Visitor count incremented', newCount }, { status: 200 });
  } catch (error) {
    // console.error('Failed to increment visitor count:', error);
    return NextResponse.json({ error: 'Failed to increment visitor count' }, { status: 500 });
  }
}
