import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Head, Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs';
import type { ReactNode } from 'react';
import { MotionProvider } from '@/components/motion-provider';
import { isLocale, localeNames, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import '../globals.css';

const REPOSITORY = 'https://github.com/ring-wdr/frontend-junior-study';

export const metadata: Metadata = {
  metadataBase: new URL('https://ring-wdr.github.io/frontend-junior-study/'),
  title: {
    default: 'Frontend Study',
    template: '%s | Frontend Study',
  },
  description:
    'Interactive frontend study materials: event loop, closures, design patterns, React, Next.js, performance and more.',
  icons: '/frontend-junior-study/icon.png',
  openGraph: {
    images: '/frontend-junior-study/og-image.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/frontend-junior-study/og-image.png',
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [{ theme }, pageMap] = await Promise.all([
    getDictionary(lang, 'common'),
    getPageMap(`/${lang}`),
  ]);

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 220, saturation: 90 }} />
      <body>
        <MotionProvider>
          <Layout
            navbar={
              <Navbar
                logo={<b>{theme.siteTitle}</b>}
                logoLink={`/${lang}`}
                projectLink={REPOSITORY}
              />
            }
            footer={<Footer>{theme.footer}</Footer>}
            pageMap={pageMap}
            docsRepositoryBase={`${REPOSITORY}/tree/main`}
            i18n={locales.map((locale) => ({
              locale,
              name: localeNames[locale],
            }))}
            darkMode={false}
            nextThemes={{ defaultTheme: 'light', forcedTheme: 'light' }}
            editLink={theme.editLink}
            feedback={{ content: null }}
            lastUpdated={<LastUpdated>{theme.lastUpdated}</LastUpdated>}
            search={
              <Search
                placeholder={theme.searchPlaceholder}
                emptyResult={theme.searchEmpty}
                loading={theme.searchLoading}
                errorText={theme.searchError}
              />
            }
            sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
            toc={{ title: theme.tocTitle, backToTop: theme.backToTop }}
          >
            {children}
          </Layout>
        </MotionProvider>
      </body>
    </html>
  );
}
