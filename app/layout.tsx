import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://voicegenerator.app'),
  title: 'AI Voiceover Generator - Free Text to Speech Tool | Create Professional Voiceovers',
  description: 'Generate professional voiceovers online for free. Convert text to speech with customizable voice, speed, pitch, and volume. Perfect for content creators, educators, and professionals.',
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
    url: 'https://voicegenerator.app',
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
    canonical: 'https://voicegenerator.app',
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
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
