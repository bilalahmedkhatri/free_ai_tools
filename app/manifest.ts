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
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
