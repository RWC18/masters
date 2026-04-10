import type { Metadata } from 'next';
import Home from '../views/Home/Home';

export const metadata: Metadata = {
  title: 'V.Ai – AI Creative Studio',
  description:
    'V.Ai is your all-in-one AI creative studio. Generate images from text, create professional avatars, design logos, and remove backgrounds — all powered by cutting-edge AI. No design skills needed.',
  keywords: [
    'AI creative studio',
    'AI image generator',
    'text to image',
    'AI avatar creator',
    'AI logo maker',
    'background remover',
    'free AI art generator',
    'online AI design tools',
    'V.Ai',
  ],
  alternates: {
    canonical: 'https://v-ai.art',
  },
  openGraph: {
    type: 'website',
    url: 'https://v-ai.art',
    title: 'V.Ai – AI Creative Studio',
    description:
      'Generate images, create avatars, design logos, and remove backgrounds instantly with AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'V.Ai – AI Creative Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V.Ai – AI Creative Studio',
    description:
      'Generate images, create avatars, design logos, and remove backgrounds instantly with AI.',
    images: [{ url: '/og-image.png', alt: 'V.Ai – AI Creative Studio' }],
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return <Home />;
}
