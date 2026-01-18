import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

const visitorLogPath = path.join(process.cwd(), '.visitor-log.json');
const counterFilePath = path.join(process.cwd(), '.counter.json');

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Handles POST requests to log a new visitor.
 * It increments the total visitor count and logs the visitor's location.
 */
// export async function POST(request: NextRequest) {
export async function POST(request: NextRequest) {
  try {

    console.log("Received visitor log request.");
    // 1. Increment total visitor count
    const counter = await readJsonFile(counterFilePath, { count: 0 });
    counter.count += 1;
    await fs.writeFile(counterFilePath, JSON.stringify(counter));

    // 2. Get location from IP
    console.log("Logging visitor from request:", request);
    const ip = request.ip || request.headers.get('x-forwarded-for'); // Fallback for local dev
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      const location = {
        country: geoData.country_name || 'Unknown',
        city: geoData.city || 'Unknown',
        timestamp: new Date().toISOString(),
      };

      const visitorLog = await readJsonFile(visitorLogPath, []);
      visitorLog.push(location);
      await fs.writeFile(visitorLogPath, JSON.stringify(visitorLog, null, 2));
    }

    return NextResponse.json({ success: true, count: counter.count });
  } catch (error) {
    console.error('Error logging visitor:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}