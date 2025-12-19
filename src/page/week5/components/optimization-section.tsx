import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { OptimizationVisualizer } from './optimization-visualizer';

export const OptimizationSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Optimization', color: 'green' }}
      title="Optimization & SEO"
      description="Next.js features for performance and search engine optimization."
    >
      <div className="space-y-8">
        <SubSection title="SEO & Metadata Management" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              App Router uses the <code>metadata</code> object or{' '}
              <code>generateMetadata</code> function to define SEO tags,
              replacing the old <code>Head</code> component. Metadata is used
              for search engine optimization and social media sharing.
            </p>

            <InfoBox variant="green" title="Metadata API">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Static Metadata:</strong> Export a{' '}
                  <code>metadata</code> object for constant SEO information
                </li>
                <li>
                  <strong>Dynamic Metadata:</strong> Use{' '}
                  <code>generateMetadata</code> function to compute metadata at
                  request time
                </li>
                <li>
                  <strong>OpenGraph:</strong> Define social media preview images
                  and text
                </li>
                <li>
                  <strong>Robots & Canonical:</strong> Control indexing and
                  prevent duplicate content issues
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

            <InfoBox variant="blue" title="SEO Best Practices">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Keep titles under 60 characters for desktop display</li>
                <li>Write compelling meta descriptions (150-160 characters)</li>
                <li>Use proper heading hierarchy (h1, h2, h3)</li>
                <li>Include structured data (Schema.org) for rich snippets</li>
                <li>Ensure mobile responsiveness for mobile-first indexing</li>
                <li>Optimize Core Web Vitals (LCP, FID, CLS)</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title="Image Optimization with next/image"
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The <code>next/image</code> component automatically optimizes
              images for different screen sizes and device pixel ratios, serving
              modern formats (WebP, AVIF) to supported browsers while
              maintaining responsive design without layout shift.
            </p>

            <InfoBox variant="blue" title="Key Features">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Automatic Lazy Loading:</strong> Images load only when
                  near viewport
                </li>
                <li>
                  <strong>Responsive Sizing:</strong> Automatic srcset
                  generation for different screen sizes
                </li>
                <li>
                  <strong>Modern Formats:</strong> Automatic WebP/AVIF serving
                  with graceful fallback
                </li>
                <li>
                  <strong>Zero CLS:</strong> Dimensions required, preventing
                  layout shift
                </li>
                <li>
                  <strong>On-Demand Optimization:</strong> Images optimized at
                  request time, cached for future requests
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

            <InfoBox variant="purple" title="Image Optimization Tips">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  Use <code>priority</code> for above-the-fold images
                </li>
                <li>
                  Use <code>placeholder="blur"</code> for better UX
                </li>
                <li>
                  Set <code>sizes</code> prop for responsive optimization
                </li>
                <li>
                  Reduce quality (75-85) to decrease file size without visible
                  degradation
                </li>
                <li>Crop/resize images to exact dimensions needed</li>
                <li>Use SVG for icons instead of image format</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <OptimizationVisualizer />

        <SubSection
          title="Font Optimization with next/font"
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>next/font</code> automatically optimizes web fonts by
              downloading font files at build time and hosting them as static
              assets. This eliminates layout shift and improves page load
              performance by removing external requests.
            </p>

            <InfoBox variant="purple" title="Font Loading Benefits">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Zero Layout Shift (CLS):</strong> Font metrics are
                  precomputed to prevent text reflow
                </li>
                <li>
                  <strong>Improved Performance:</strong> Fonts served locally,
                  no external network requests
                </li>
                <li>
                  <strong>Font Subsetting:</strong> Only load characters used in
                  your app
                </li>
                <li>
                  <strong>Automatic Fallback:</strong> System fonts display
                  while custom fonts load
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

            <InfoBox variant="orange" title="Font Selection Guide">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Display:</strong> Large headlines and decorative text
                </li>
                <li>
                  <strong>Swap:</strong> Most readable, prefers fallback
                  visibility
                </li>
                <li>
                  <strong>Block:</strong> Hides text while loading (not
                  recommended)
                </li>
                <li>Limit to 2-3 font families for performance</li>
                <li>
                  Use variable fonts when possible for fewer file requests
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="Edge Middleware & Redirection" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Middleware runs at the edge before requests reach your server,
              enabling authentication, rewriting, redirects, and A/B testing
              with zero additional latency. Perfect for executing logic close to
              the user.
            </p>

            <InfoBox variant="blue" title="Middleware Use Cases">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Authentication:</strong> Check auth tokens and
                  redirect unauthenticated users
                </li>
                <li>
                  <strong>URL Rewriting:</strong> Rewrite URLs internally
                  without redirects
                </li>
                <li>
                  <strong>A/B Testing:</strong> Route users to different
                  versions based on cookies
                </li>
                <li>
                  <strong>Geo-routing:</strong> Serve different content based on
                  user location
                </li>
                <li>
                  <strong>Bot Detection:</strong> Block or handle bot traffic
                  early
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
          title="Performance Metrics & Best Practices"
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Core Web Vitals are critical metrics used by Google to assess page
              quality. Next.js provides built-in tools to monitor and optimize
              these metrics.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="blue" title="Largest Contentful Paint (LCP)">
                <p className="text-sm text-gray-700 mb-2">
                  Time until the largest content element renders. Target:
                  &lt;2.5s
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>
                    Use <code>priority</code> on critical images
                  </li>
                  <li>Optimize server response time (TTFB)</li>
                  <li>Minimize JavaScript blocking main thread</li>
                </ul>
              </InfoBox>

              <InfoBox variant="green" title="Cumulative Layout Shift (CLS)">
                <p className="text-sm text-gray-700 mb-2">
                  Unexpected layout changes. Target: &lt;0.1
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>Always specify image dimensions (next/image)</li>
                  <li>Preload fonts to avoid font swap shift</li>
                  <li>Avoid insertions above existing content</li>
                  <li>
                    Use <code>size-adjust</code> for font metrics
                  </li>
                </ul>
              </InfoBox>

              <InfoBox variant="purple" title="First Input Delay (FID / INP)">
                <p className="text-sm text-gray-700 mb-2">
                  Delay from user interaction to response. Target: &lt;100ms
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                  <li>Code splitting to reduce main thread work</li>
                  <li>Break long tasks into smaller chunks</li>
                  <li>Use React 18 transitions for non-urgent updates</li>
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

            <InfoBox variant="gray" title="Quick Optimization Checklist">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>✓ Use dynamic imports for non-critical code</li>
                <li>✓ Minimize JavaScript bundle size</li>
                <li>✓ Enable compression (gzip/brotli) on server</li>
                <li>✓ Use CDN for static assets</li>
                <li>✓ Enable caching headers (Cache-Control)</li>
                <li>✓ Monitor real user metrics with analytics</li>
                <li>✓ Test on slow 3G / low-end devices</li>
                <li>✓ Use Lighthouse CI for continuous monitoring</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
