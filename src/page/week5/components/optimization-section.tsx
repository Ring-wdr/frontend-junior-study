import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { OptimizationVisualizer } from './optimization-visualizer';

export const OptimizationSection = () => {
  const { t } = useTranslation('week5');
  return (
    <SectionCard
      badge={{ label: t('optimization.badge'), color: 'green' }}
      title={t('optimization.title')}
      description={t('optimization.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('optimization.seo.title')} icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="optimization.seo.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox variant="green" title={t('optimization.seo.api.title')}>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="optimization.seo.api.static" components={{ code: <code /> }} />
                </li>
                <li>
                  <Trans t={t} i18nKey="optimization.seo.api.dynamic" components={{ code: <code /> }} />
                </li>
                <li>
                  <Trans t={t} i18nKey="optimization.seo.api.openGraph" />
                </li>
                <li>
                  <Trans t={t} i18nKey="optimization.seo.api.robots" />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// app/page.tsx - Static Metadata
export const metadata = {
  title: 'My Awesome Blog',
  description: 'Read the latest tech articles',
  keywords: ['tech', 'blog', 'react'],
  robots: 'index, follow',
  openGraph: {
    title: 'My Awesome Blog',
    description: 'Read the latest tech articles',
    url: 'https://example.com',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Awesome Blog',
    description: 'Read the latest tech articles',
    images: ['https://example.com/twitter-image.jpg'],
  },
};`}
              className="text-xs"
            />

            <CodeBlock
              code={`// app/posts/[id]/page.tsx - Dynamic Metadata
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
    authors: [{ name: post.author }],
    publishedTime: post.publishedDate,
  };
}`}
              className="text-xs"
            />

            <InfoBox
              variant="blue"
              title={t('optimization.seo.bestPractices.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('optimization.seo.bestPractices.titleLength')}</li>
                <li>{t('optimization.seo.bestPractices.description')}</li>
                <li>{t('optimization.seo.bestPractices.headingHierarchy')}</li>
                <li>{t('optimization.seo.bestPractices.structuredData')}</li>
                <li>{t('optimization.seo.bestPractices.mobileResponsive')}</li>
                <li>{t('optimization.seo.bestPractices.coreWebVitals')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('optimization.imageOptimization.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="optimization.imageOptimization.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox
              variant="blue"
              title={t('optimization.imageOptimization.keyFeatures.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.keyFeatures.lazyLoading"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.keyFeatures.responsiveSizing"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.keyFeatures.modernFormats"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.keyFeatures.zeroCLS"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.keyFeatures.onDemand"
                  />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`import Image from 'next/image';
import heroImage from '@/public/hero.jpg';

export default function Home() {
  return (
    <>
      {/* Static imports - width/height automatically determined */}
      <Image
        src={heroImage}
        alt="Hero banner"
        priority
        placeholder="blur"
      />

      {/* Remote images - must specify width/height */}
      <Image
        src="https://example.com/image.jpg"
        alt="Product"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />

      {/* Fill container (responsive) */}
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="purple"
              title={t('optimization.imageOptimization.tips.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.tips.priority"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.imageOptimization.tips.placeholder"
                    components={{ code: <code /> }}
                  />
                </li>
                <li>
                  <Trans t={t} i18nKey="optimization.imageOptimization.tips.sizes" components={{ code: <code /> }} />
                </li>
                <li>{t('optimization.imageOptimization.tips.quality')}</li>
                <li>{t('optimization.imageOptimization.tips.crop')}</li>
                <li>
                  <Trans t={t} i18nKey="optimization.imageOptimization.tips.svg" />
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <OptimizationVisualizer />

        <SubSection
          title={t('optimization.fontOptimization.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="optimization.fontOptimization.intro" components={{ code: <code /> }} />
            </p>

            <InfoBox
              variant="purple"
              title={t('optimization.fontOptimization.benefits.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.benefits.zeroCLS"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.benefits.performance"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.benefits.subsetting"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.benefits.fallback"
                  />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

// Google Font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Use fallback while loading
});

const playfair = Playfair_Display({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`}
              className="text-xs"
            />

            <CodeBlock
              code={`// app/layout.tsx - Local fonts
import localFont from 'next/font/local';

const geist = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="orange"
              title={t('optimization.fontOptimization.selectionGuide.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.selectionGuide.display"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.selectionGuide.swap"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.fontOptimization.selectionGuide.block"
                  />
                </li>
                <li>{t('optimization.fontOptimization.selectionGuide.limit')}</li>
                <li>
                  {t('optimization.fontOptimization.selectionGuide.variable')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('optimization.middleware.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('optimization.middleware.intro')}
            </p>

            <InfoBox
              variant="blue"
              title={t('optimization.middleware.useCases.title')}
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.middleware.useCases.authentication"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.middleware.useCases.rewriting"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.middleware.useCases.abTesting"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.middleware.useCases.geoRouting"
                  />
                </li>
                <li>
                  <Trans
                    t={t}
                    i18nKey="optimization.middleware.useCases.botDetection"
                  />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rewrite without changing URL
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.rewrite(new URL('/admin/dashboard', request.url));
  }

  // A/B testing
  const variant = request.cookies.get('ab-variant')?.value || 'control';
  const response = NextResponse.next();
  response.headers.set('X-AB-Variant', variant);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('optimization.performance.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              {t('optimization.performance.intro')}
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="blue" title={t('optimization.performance.lcp.title')}>
                <p className="text-sm text-gray-700 mb-2">
                  <Trans t={t} i18nKey="optimization.performance.lcp.description" />
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>
                    <Trans t={t} i18nKey="optimization.performance.lcp.tip1" />
                  </li>
                  <li>{t('optimization.performance.lcp.tip2')}</li>
                  <li>{t('optimization.performance.lcp.tip3')}</li>
                </ul>
              </InfoBox>

              <InfoBox
                variant="green"
                title={t('optimization.performance.cls.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  <Trans t={t} i18nKey="optimization.performance.cls.description" />
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>{t('optimization.performance.cls.tip1')}</li>
                  <li>{t('optimization.performance.cls.tip2')}</li>
                  <li>{t('optimization.performance.cls.tip3')}</li>
                  <li>
                    <Trans t={t} i18nKey="optimization.performance.cls.tip4" />
                  </li>
                </ul>
              </InfoBox>

              <InfoBox
                variant="purple"
                title={t('optimization.performance.fid.title')}
              >
                <p className="text-sm text-gray-700 mb-2">
                  <Trans t={t} i18nKey="optimization.performance.fid.description" />
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>{t('optimization.performance.fid.tip1')}</li>
                  <li>{t('optimization.performance.fid.tip2')}</li>
                  <li>{t('optimization.performance.fid.tip3')}</li>
                </ul>
              </InfoBox>
            </div>

            <CodeBlock
              code={`// app/layout.tsx - Monitor Web Vitals
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function RootLayout({ children }) {
  useReportWebVitals((metric) => {
    console.log(metric);
    // Send to analytics
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  });

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="gray"
              title={t('optimization.performance.checklist.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('optimization.performance.checklist.dynamicImports')}</li>
                <li>{t('optimization.performance.checklist.minifyJS')}</li>
                <li>{t('optimization.performance.checklist.compression')}</li>
                <li>{t('optimization.performance.checklist.cdn')}</li>
                <li>{t('optimization.performance.checklist.caching')}</li>
                <li>{t('optimization.performance.checklist.monitoring')}</li>
                <li>{t('optimization.performance.checklist.testing')}</li>
                <li>{t('optimization.performance.checklist.lighthouse')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
