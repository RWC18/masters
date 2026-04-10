import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '../lib/ThemeRegistry';
import Providers from '../lib/Providers';
import AppShell from '../lib/AppShell';

export const metadata: Metadata = {
  title: {
    default: 'V.Ai – AI Creative Studio',
    template: '%s | V.Ai',
  },
  description:
    'AI-powered image generation, avatar creation, logo design and background removal. Create stunning visuals in seconds.',
  keywords: [
    'AI image generation',
    'AI avatar',
    'AI logo generator',
    'background removal',
    'text to image',
    'V.Ai',
  ],
  authors: [{ name: 'V.Ai' }],
  creator: 'V.Ai',
  metadataBase: new URL('https://v-ai.art'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://v-ai.art',
    siteName: 'V.Ai',
    title: 'V.Ai – AI Creative Studio',
    description:
      'AI-powered image generation, avatar creation, logo design and background removal.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'V.Ai – AI Creative Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V.Ai – AI Creative Studio',
    description:
      'AI-powered image generation, avatar creation, logo design and background removal.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
  other: {
    'google-adsense-account': 'ca-pub-3340717863320635',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#012641" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3340717863320635"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ background: '#012641' }}>
        <ThemeRegistry>
          <Providers>
            <AppShell>{children}</AppShell>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
