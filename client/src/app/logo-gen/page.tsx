import type { Metadata } from 'next';
import LogoGen from '../../views/LogoGen/LogoGen';

export const metadata: Metadata = {
  title: 'AI Logo Generator – Create a Professional Logo Instantly',
  description:
    'Design a unique, professional logo for your brand in seconds with AI. Enter your company name and industry, pick your style, and get stunning logo concepts — no designer needed.',
  keywords: [
    'AI logo generator',
    'free logo maker AI',
    'AI logo design',
    'brand logo creator',
    'business logo generator',
    'startup logo AI',
    'logo design online',
    'V.Ai logo generator',
  ],
  alternates: {
    canonical: 'https://v-ai.art/logo-gen',
  },
  openGraph: {
    type: 'website',
    url: 'https://v-ai.art/logo-gen',
    title: 'AI Logo Generator – V.Ai',
    description:
      'Create a professional logo for your brand in seconds. Enter your name, pick a style — AI does the rest.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Logo Generator – V.Ai',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Logo Generator – V.Ai',
    description:
      'Create a professional logo for your brand in seconds. Enter your name, pick a style — AI does the rest.',
    images: [{ url: '/og-image.png', alt: 'AI Logo Generator – V.Ai' }],
  },
  robots: { index: true, follow: true },
};

export default function LogoGenPage() {
  return <LogoGen />;
}
