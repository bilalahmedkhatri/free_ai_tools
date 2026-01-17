import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Voiceover Generator',
    short_name: 'VoiceGen',
    description: 'Generate professional voiceovers with customizable parameters',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f5',
    theme_color: '#667eea',
    icons: [],
  };
}
