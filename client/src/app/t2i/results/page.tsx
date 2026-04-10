import type { Metadata } from 'next';
import T2IResults from '../../../views/T2I/T2IResults';

export const metadata: Metadata = {
  title: 'Your AI-Generated Images',
  description: 'View, save, and download your AI-generated images from V.Ai.',
  robots: { index: false, follow: false },
};

export default function T2IResultsPage() {
  return <T2IResults />;
}
