import type { Metadata } from 'next';
import Avatar from '../../views/Avatar/Avatar';

export const metadata: Metadata = {
  title: 'AI Avatar Creator – Make Your Perfect Profile Picture',
  description:
    'Create stunning, photorealistic AI avatars from your selfies. Upload your photo, choose a style, and get professional-quality profile pictures in seconds.',
  keywords: [
    'AI avatar creator',
    'AI profile picture generator',
    'AI headshot generator',
    'photo to avatar AI',
    'AI portrait generator',
    'professional AI avatar',
    'selfie to avatar',
    'V.Ai avatar',
  ],
  alternates: {
    canonical: 'https://v-ai.art/avatar',
  },
  openGraph: {
    type: 'website',
    url: 'https://v-ai.art/avatar',
    title: 'AI Avatar Creator – V.Ai',
    description:
      'Upload your photo and get stunning, photorealistic AI avatars in seconds. Perfect for profile pictures.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Avatar Creator – V.Ai',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Avatar Creator – V.Ai',
    description:
      'Upload your photo and get stunning, photorealistic AI avatars in seconds.',
    images: [{ url: '/og-image.png', alt: 'AI Avatar Creator – V.Ai' }],
  },
  robots: { index: true, follow: true },
};

export default function AvatarPage() {
  return <Avatar />;
}
