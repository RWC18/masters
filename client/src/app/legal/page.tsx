import type { Metadata } from 'next';
import Legal from '../../views/Legal/Legal';

export const metadata: Metadata = {
  title: 'Terms of Service & Privacy Policy',
  description:
    'Read the V.Ai Terms of Service and Privacy Policy. Learn how we collect, use, and protect your data, and understand the terms governing your use of our AI creative tools.',
  keywords: [
    'V.Ai terms of service',
    'V.Ai privacy policy',
    'AI tool terms',
    'data privacy policy',
  ],
  alternates: {
    canonical: 'https://v-ai.art/legal',
  },
  openGraph: {
    type: 'website',
    url: 'https://v-ai.art/legal',
    title: 'Terms of Service & Privacy Policy – V.Ai',
    description:
      'Read the V.Ai Terms of Service and Privacy Policy. Understand how we protect your data.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'V.Ai Legal',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service & Privacy Policy – V.Ai',
    description:
      'Read the V.Ai Terms of Service and Privacy Policy.',
  },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return <Legal />;
}
