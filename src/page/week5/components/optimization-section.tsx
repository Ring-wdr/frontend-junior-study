import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const OptimizationSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Optimization', color: 'green' }}
      title="Optimization & SEO"
      description="Next.js features for performance and search engine optimization."
    >
      <div className="space-y-8">
        <SubSection title="SEO & Metadata" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              App Router uses the <code>metadata</code> object or{' '}
              <code>generateMetadata</code> function to define SEO tags,
              replacing the old <code>Head</code> component.
            </p>
            <CodeBlock
              code={`// Static Metadata
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.title,
    openGraph: {
      images: [product.image],
    },
  };
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Performance Components" icon iconColor="green">
          <div className="space-y-4">
            <InfoBox variant="green" title="next/image">
              <p className="text-sm text-gray-700">
                Automatic image optimization. Resizing, lazy loading, and modern
                formats (WebP/AVIF). Prevents Layout Shift (CLS).
              </p>
            </InfoBox>
            <InfoBox variant="green" title="next/font">
              <p className="text-sm text-gray-700">
                Optimizes web fonts (Google Fonts or local). Zero layout shift
                by preloading and using <code>size-adjust</code>.
              </p>
            </InfoBox>
            <InfoBox variant="green" title="Edge Middleware">
              <p className="text-sm text-gray-700">
                Run code at the edge (close to the user) for authentication,
                rewriting, and A/B testing before the request hits the server.
              </p>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
