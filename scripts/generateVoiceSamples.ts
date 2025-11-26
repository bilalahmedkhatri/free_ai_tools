import Replicate from 'replicate';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env.local
const envPath = join(__dirname, '../.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const kokoroVoices = require('../app/data/kokoroVoices.json');

const SAMPLE_TEXT = "Hello! This is a sample of my voice. I can help you create natural-sounding voiceovers for your projects.";

async function generateSample(voiceId: string, voiceName: string) {
  const apiKey = process.env.REPLICATE_API_TOKEN;
  
  if (!apiKey) {
    throw new Error('REPLICATE_API_TOKEN is not set');
  }

  const replicate = new Replicate({ auth: apiKey });
  
  console.log(`Generating sample for ${voiceName} (${voiceId})...`);
  
  try {
    const output = await replicate.run(
      "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13",
      {
        input: {
          text: SAMPLE_TEXT,
          voice: voiceId,
        }
      }
    ) as any;

    const audioUrl = output.url();
    console.log(`  Audio URL: ${audioUrl}`);
    
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const outputDir = join(__dirname, '../app/voice_samples');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = join(outputDir, `${voiceId}.wav`);
    writeFileSync(outputPath, buffer);
    
    console.log(`  ✓ Saved to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error generating sample for ${voiceId}:`, error);
    return false;
  }
}

async function main() {
  const allVoices = [
    ...kokoroVoices.americanEnglish,
    ...kokoroVoices.britishEnglish,
    ...kokoroVoices.french,
    ...kokoroVoices.hindi,
    ...kokoroVoices.italian,
    ...kokoroVoices.japanese,
    ...kokoroVoices.mandarinChinese,
  ];

  console.log(`\n🎙️  Generating ${allVoices.length} voice samples...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const voice of allVoices) {
    const success = await generateSample(voice.voice_id, voice.voice_name);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Wait 2 seconds between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\n✅ Generation complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
}

main().catch(console.error);
