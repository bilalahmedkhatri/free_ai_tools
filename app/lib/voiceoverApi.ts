// API client for voiceover generation
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface VoiceoverRequest {
  text: string;
  voice_id: string;
  speed?: number;
  pitch?: number;
  volume?: number;
  tone?: string;
}

export interface VoiceoverResponse {
  id: string;
  audio_url: string;
  voice_name: string;
  duration_seconds: number;
  file_size: number;
  expires_at: string;
  remaining_uses: number;
  reset_at: string | null;
}

export interface VoiceSample {
  voice_id: string;
  voice_name: string;
  gender: string;
  accent: string;
  language: string;
  description: string;
  sample_url: string;
  // provider: string;
  // model_name: string;
  // is_active: boolean;
}

export interface VoiceSamplesResponse {
  voices: VoiceSample[];
}

export interface VoiceoverMetadata {
  voiceover_id: string;
  status: 'processing' | 'completed' | 'failed';
  download_url: string;
  metadata: {
    text_length: number;
    voice_id: string;
    speed: number;
    pitch: number;
    volume: number;
    created_at: string;
  };
}

/**
 * Generate a new voiceover using the free tool API
 */
export async function generateVoiceover(
  request: VoiceoverRequest
): Promise<VoiceoverResponse> {
  const response = await fetch(`${API_BASE_URL}/api/voiceover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: request.text,
      voice_id: request.voice_id,
      speed: request.speed ?? 1,
      pitch: request.pitch ?? 1,
      volume: request.volume ?? 0.8,
      tone: request.tone ?? 'neutral',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate voiceover');
  }

  return response.json();
}

/**
 * Get available voice samples/tones
 */
export async function getVoiceSamples(): Promise<VoiceSample[]> {
  const response = await fetch(`${API_BASE_URL}/api/voiceover/voiceover_samples`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch voice samples');
  }

  const data: VoiceSamplesResponse = await response.json();
  return data.voices;
}

/**
 * Get voiceover metadata/status
 */
export async function getVoiceover(
  voiceoverId: string
): Promise<VoiceoverMetadata> {
  const response = await fetch(`${API_BASE_URL}/api/voiceover/${voiceoverId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch voiceover');
  }

  return response.json();
}

/**
 * Download voiceover audio file
 */
export async function downloadVoiceover(voiceoverId: string): Promise<Blob> {
  const response = await fetch(
    `${API_BASE_URL}/api/voiceover/${voiceoverId}/download`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to download voiceover');
  }

  return response.blob();
}

/**
 * Delete voiceover
 */
export async function deleteVoiceover(
  voiceoverId: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/voiceover/${voiceoverId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete voiceover');
  }

  return response.json();
}

/**
 * Download and save voiceover to user's device
 */
export async function downloadAndSaveVoiceover(
  audioUrl: string,
  filename?: string
): Promise<void> {
  const response = await fetch(audioUrl);
  
  if (!response.ok) {
    throw new Error('Failed to download audio file');
  }
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `voiceover_${Date.now()}.wav`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/**
 * Play voiceover audio in browser
 */
export function playVoiceover(audioUrl: string): HTMLAudioElement {
  const audio = new Audio(audioUrl);
  audio.play();
  return audio;
}
