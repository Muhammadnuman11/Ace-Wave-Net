import Head from 'next/head';
import SiteLayout from '@/components/layout/SiteLayout';
import HomePage from '@/components/HomePage';
import { brandTitle } from '@/lib/brand';

export default function Index() {
  return (
    <SiteLayout>
      <Head>
        <title>{brandTitle()}</title>
        <meta name="description" content="Compare internet plans, providers and coverage in your area with Ace Wave Net." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomePage />
    </SiteLayout>
  );
}
