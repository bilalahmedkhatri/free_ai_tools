import Replicate from 'replicate';

export interface ReplicateVoiceParams {
  text: string;
  voice: string;
  speed?: number;
  pitch?: number;
  volume?: number;
}

export interface ReplicateVoiceResult {
  audioUrl: string;
  audioBuffer: ArrayBuffer;
}

export interface KokoroVoice {
  voice_id: string;
  voice_name: string;
  gender: string;
  accent: string;
  language: string;
  quality: string;
  training: string;
  featured?: boolean;
  description: string;
}

const KOKORO_MODEL = "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13";

export async function generateWithReplicate(params: ReplicateVoiceParams): Promise<ReplicateVoiceResult> {
  const apiKey = process.env.REPLICATE_API_TOKEN;
  
  if (!apiKey) {
    throw new Error('REPLICATE_API_TOKEN environment variable is not set');
  }

  const replicate = new Replicate({ auth: apiKey });

  // Kokoro-82M only supports: text, voice, and speed
  // Pitch and volume are not supported by the model
  const input: any = {
    text: params.text,
    voice: params.voice,
  };
  
  // Add speed if different from default
  if (params.speed !== undefined && params.speed !== 1) {
    input.speed = params.speed;
  }

  // console.log('Replicate input:', input);

  const output = await replicate.run(KOKORO_MODEL, { input }) as any;

  const audioUrl = output.url();
  
  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(`Failed to download audio from Replicate: ${response.statusText}`);
  }

  const audioBuffer = await response.arrayBuffer();

  return {
    audioUrl,
    audioBuffer,
  };
}

export function getAvailableReplicateVoices() {
  let kokoroVoicesData;
  try {
    kokoroVoicesData = require('../data/kokoroVoices.json');
  } catch (error) {
    // console.error('Failed to load kokoroVoices.json:', error);
    // Return empty arrays if file is missing or corrupted
    kokoroVoicesData = {
      americanEnglish: [],
      britishEnglish: [],
      french: [],
      hindi: [],
      italian: [],
    };
  }
  
  // Only include voices that have generated samples
  // Missing: hf_beta, all Japanese (jf_alpha, jf_gongitsune, jf_nezumi, jf_tebukuro, jm_kumo),
  // all Chinese (zf_xiaobei, zf_xiaoni, zf_xiaoxiao, zf_xiaoyi, zm_yunjian, zm_yunxi, zm_yunxia, zm_yunyang)
  const availableSamples = [
    'af_alloy', 'af_aoede', 'af_bella', 'af_jessica', 'af_kore', 'af_nicole', 
    'af_nova', 'af_river', 'af_sarah', 'af_sky', 'am_adam', 'am_echo', 
    'am_eric', 'am_fenrir', 'am_liam', 'am_michael', 'am_onyx', 'am_puck',
    'bf_alice', 'bf_emma', 'bf_isabella', 'bf_lily', 'bm_daniel', 'bm_fable',
    'bm_george', 'bm_lewis', 'ff_siwis', 'hf_alpha', 'hm_omega', 'hm_psi',
    'if_sara', 'im_nicola'
  ];
  
  const allVoices: KokoroVoice[] = [
    ...kokoroVoicesData.americanEnglish,
    ...kokoroVoicesData.britishEnglish,
    ...kokoroVoicesData.french,
    ...kokoroVoicesData.hindi,
    ...kokoroVoicesData.italian,
    // Excluding Japanese and Mandarin Chinese - samples not available
  ];

  return allVoices
    .filter(voice => availableSamples.includes(voice.voice_id))
    .map(voice => ({
      voice_id: voice.voice_id,
      voice_name: `${voice.voice_name} (${voice.accent} ${voice.gender})`,
      gender: voice.gender.toLowerCase(),
      accent: voice.accent,
      language: voice.language,
      sample_url: `/api/voiceover/sample/${voice.voice_id}`,
      description: voice.description,
      quality: voice.quality,
      featured: voice.featured || false,
    }));
}
