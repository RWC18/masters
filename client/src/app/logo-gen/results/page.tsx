import type { Metadata } from 'next';
import LogoGenResults from '../../../views/LogoGen/LogoGenResults';

export const metadata: Metadata = {
  title: 'Your AI-Generated Logos',
  description: 'View, save, and download your AI-generated logos from V.Ai.',
  robots: { index: false, follow: false },
};

export default function LogoGenResultsPage() {
  return <LogoGenResults />;
}
