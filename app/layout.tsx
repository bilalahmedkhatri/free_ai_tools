import type { Metadata, Viewport } from 'next';
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://freevoiceover.vercel.app'),
  title: 'AI Voiceover Generator - Free Text to Speech Tool',
  description: 'Create professional voiceovers with customizable voice, speed, pitch, and volume. Free online text-to-speech generator.',
  keywords: ['voiceover generator', 'text to speech', 'TTS', 'AI voice', 'speech synthesis', 'voice generator', 'audio generator', 'free voiceover tool'],
  authors: [{ name: 'Voice Generator Free' }],
  creator: 'Voice Generator Free',
  publisher: 'Voice Generator Free',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freevoiceover.vercel.app',
    title: 'AI Voiceover Generator - Free Text to Speech Tool',
    description: 'Create professional voiceovers with customizable parameters. Free, fast, and easy to use text-to-speech generator.',
    siteName: 'AI Voiceover Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Voiceover Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Voiceover Generator - Free Text to Speech Tool',
    description: 'Generate professional voiceovers with customizable voice, speed, pitch, and volume. Free online tool.',
    images: ['/twitter-image.png'],
    creator: '@voicegenerator',
  },
  alternates: {
    canonical: 'https://freevoiceover.vercel.app',
    languages: {
      'en-US': 'https://freevoiceover.vercel.app/en-US',
    }
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#667eea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="http://localhost:8000" />
        <link rel="dns-prefetch" href="http://localhost:8000" />
        <Analytics />
        <style dangerouslySetInnerHTML={{
          __html: `
          * {
            scrollbar-width: thin;
            scrollbar-color: #ff9b8f #f3f4f6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          *::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          *::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }
          
          *::-webkit-scrollbar-thumb {
            background: #ff9b8f;
            border-radius: 4px;
            transition: background 0.3s ease;
          }
          
          *::-webkit-scrollbar-thumb:hover {
            background: #ffb4a8;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          select, input, textarea, button {
            -webkit-tap-highlight-color: transparent;
          }
        `}} />
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        {children}
      </body>
    </html>
  );
}
