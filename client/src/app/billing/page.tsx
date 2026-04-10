import type { Metadata } from 'next';
import Billing from '../../views/Billing/Billing';

export const metadata: Metadata = {
  title: 'Billing & Credits',
  description: 'Manage your V.Ai credits and subscription plan.',
  robots: { index: false, follow: false },
};

export default function BillingPage() {
  return <Billing />;
}
