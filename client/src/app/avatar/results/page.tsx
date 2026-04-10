import type { Metadata } from 'next';
import AvatarResults from '../../../views/Avatar/AvatarResults';

export const metadata: Metadata = {
  title: 'Your AI Avatars',
  description: 'View, save, and download your AI-generated avatars from V.Ai.',
  robots: { index: false, follow: false },
};

export default function AvatarResultsPage() {
  return <AvatarResults />;
}
