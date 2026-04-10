import type { Metadata } from 'next';
import History from '../../views/History/History';

export const metadata: Metadata = {
  title: 'Generation History',
  description: 'View and download all your past AI generations on V.Ai.',
  robots: { index: false, follow: false },
};

export default function HistoryPage() {
  return <History />;
}
