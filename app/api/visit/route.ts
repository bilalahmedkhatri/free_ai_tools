// import { NextResponse } from 'next/server';
// import * as fs from 'fs';
// import * as path from 'path';

// // Use the correct path for the counter file
// const counterFilePath = path.join(process.cwd(), '.counter.json');

// // Helper function to read the current count
// const readCount = (): number => {
//   try {
//     const data = fs.readFileSync(counterFilePath, 'utf-8');
//     const json = JSON.parse(data);
//     return json.count || 0;
//   } catch (error) {
//     // If file doesn't exist or is invalid, return 0
//     // console.error('Error reading counter file:', error);
//     return 0;
//   }
// };

// // Helper function to write the new count
// const writeCount = (newCount: number): void => {
//   try {
//     const data = JSON.stringify({ count: newCount }, null, 2);
//     fs.writeFileSync(counterFilePath, data, 'utf-8');
//   } catch (error) {
//     // console.error('Error writing counter file:', error);
//   }
// };

// export async function GET() {
//   // In a real production environment, you might want to remove this check
//   // or implement a more robust solution for concurrent writes.
//   /*
//   if (process.env.NODE_ENV === 'development') {
//     // console.log('Visitor count API called in development mode. Skipping file write.');
//     return NextResponse.json({ message: 'Visitor count incremented (dev mode skip)' }, { status: 200 });
//   }
//   */

//   try {
//     const currentCount = readCount();
//     const newCount = currentCount + 1;
//     writeCount(newCount);

//     return NextResponse.json({ message: 'Visitor count incremented', newCount }, { status: 200 });
//   } catch (error) {
//     // console.error('Failed to increment visitor count:', error);
//     return NextResponse.json({ error: 'Failed to increment visitor count' }, { status: 500 });
//   }
// }


// app/api/visit/route.ts
import { NextResponse, NextRequest } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const counterFilePath = path.join(process.cwd(), '.counter.json');

const readCounter = () => {
  try {
    const raw = fs.readFileSync(counterFilePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { count: 0, locations: {} };
  }
};

const writeCounter = (obj: any) => {
  fs.writeFileSync(counterFilePath, JSON.stringify(obj, null, 2), 'utf8');
};

const getClientIp = (req: NextRequest) => {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xr = req.headers.get('x-real-ip');
  if (xr) return xr;
  return undefined;
};

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req) || 'json'; // 'json' tells ipapi to use caller IP if you call ipapi.co/json
    // If you want to lookup a specific IP: `https://ipapi.co/${ip}/json/`
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();
    const country = geo.country_name || 'Unknown';
    const city = geo.city || 'Unknown';

    const counter = readCounter();
    counter.count = (counter.count || 0) + 1;
    counter.locations = counter.locations || {};
    counter.locations[country] = counter.locations[country] || {};
    counter.locations[country][city] = (counter.locations[country][city] || 0) + 1;

    writeCounter(counter);

    return NextResponse.json({ message: 'Visitor recorded', count: counter.count, country, city }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record visit' }, { status: 500 });
  }
}