import type { Metadata } from 'next';
import T2I from '../../views/T2I/T2I';

export const metadata: Metadata = {
  title: 'Text to Image AI Generator',
  description:
    'Turn your words into stunning visuals. Type any description and our AI instantly generates high-quality, unique images — from photorealistic scenes to artistic illustrations.',
  keywords: [
    'text to image AI',
    'AI image generator',
    'AI art from text',
    'generate images from text',
    'AI photo generator',
    'AI illustration generator',
    'prompt to image',
    'V.Ai text to image',
  ],
  alternates: {
    canonical: 'https://v-ai.art/t2i',
  },
  openGraph: {
    type: 'website',
    url: 'https://v-ai.art/t2i',
    title: 'Text to Image AI Generator – V.Ai',
    description:
      'Type any description and our AI instantly generates high-quality, unique images in seconds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text to Image AI Generator – V.Ai',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text to Image AI Generator – V.Ai',
    description:
      'Type any description and our AI instantly generates high-quality, unique images in seconds.',
    images: [{ url: '/og-image.png', alt: 'Text to Image – V.Ai' }],
  },
  robots: { index: true, follow: true },
};

export default function T2IPage() {
  return <T2I />;
}
