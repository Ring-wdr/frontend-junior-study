import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const ResponsiveSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Essential', color: 'orange' }}
      title="Responsive Design Strategy"
      description="Creating interfaces that adapt seamlessly to any screen size, from mobile phones to large desktops."
    >
      <div className="space-y-8">
        <SubSection title="Mobile-First Approach" icon iconColor="orange">
          <p className="text-sm text-gray-700 mb-4">
            Design for the smallest screen first, then add complexity for larger
            screens. In Tailwind, this means unwrapped classes target mobile,
            and <code>md:</code>, <code>lg:</code> target larger screens.
          </p>
          <CodeBlock
            code={`<!-- 
  Default: block (mobile)
  md (768px): flex (tablet)
-->
<div class="block md:flex">
  <div class="w-full md:w-1/2">Sidebar</div>
  <div class="w-full md:w-1/2">Content</div>
</div>`}
            language="html"
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Tools & Techniques" icon iconColor="orange">
          <div className="grid grid-cols-1 gap-4">
            <InfoBox variant="orange" title="Techniques">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Breakpoints:</strong> Standardize widths (e.g., sm:
                  640px, md: 768px, lg: 1024px).
                </li>
                <li>
                  <strong>Fluid Typography:</strong> Use <code>clamp()</code>{' '}
                  for smooth font scaling. <br />
                  <code>font-size: clamp(1rem, 2.5vw, 2rem);</code>
                </li>
                <li>
                  <strong>Art Direction:</strong> Use{' '}
                  <code>&lt;picture&gt;</code> to serve different images for
                  different screens to save bandwidth.
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
