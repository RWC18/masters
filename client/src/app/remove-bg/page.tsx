import type { Metadata } from 'next';
import RemoveBg from '../../views/RemoveBg/RemoveBg';

export const metadata: Metadata = {
  title: 'Remove Image Background – Free AI Background Remover',
  description:
    'Remove image backgrounds instantly and accurately with AI. Upload any photo — product shots, portraits, or any image — and get a clean transparent background in one click.',
  keywords: [
    'remove background AI',
    'background remover free',
    'transparent background maker',
    'photo background eraser',
    'AI background removal',
    'remove bg online',
    'cut out background AI',
    'V.Ai remove background',
  ],
  alternates: {
    canonical: 'https://v-ai.art/remove-bg',
  },
  openGraph: {
    type: 'website',
    url: 'https://v-ai.art/remove-bg',
    title: 'Remove Image Background – V.Ai',
    description:
      'Remove any image background instantly with AI. Get a clean transparent background in one click.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Background Remover – V.Ai',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Image Background – V.Ai',
    description:
      'Remove any image background instantly with AI. Get a clean transparent background in one click.',
    images: [{ url: '/og-image.png', alt: 'AI Background Remover – V.Ai' }],
  },
  robots: { index: true, follow: true },
};

export default function RemoveBgPage() {
  return <RemoveBg />;
}
