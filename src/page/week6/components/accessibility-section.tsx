import { InfoBox, SectionCard, SubSection } from '../../../components';

export const AccessibilitySection = () => {
  return (
    <SectionCard
      badge={{ label: 'A11y', color: 'orange' }}
      title="Accessibility (A11y) & Styling"
      description="ensure your styles do not exclude users. Valid HTML and thoughtful CSS are key."
    >
      <div className="space-y-8">
        <SubSection title="Checklist" icon iconColor="red">
          <InfoBox variant="red" title="Critical Rules">
            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
              <li>
                <strong>Focus Rings:</strong> Never set{' '}
                <code>outline: none</code> on focusable elements without
                replacing it. Is users navigate via keyboard, they must see
                where they are.
                <br />
                <code className="bg-red-50 px-1 rounded text-red-600 text-xs mt-1 block w-fit">
                  focus-visible:ring-2
                </code>
              </li>
              <li>
                <strong>Contrast Ratio:</strong> Ensure text has sufficient
                contrast against the background (WCAG AA/AAA).
              </li>
              <li>
                <strong>Reduced Motion:</strong> Respect user preference for
                standard motion.
                <br />
                <code className="bg-gray-100 px-1 rounded text-xs mt-1 block w-fit">
                  @media (prefers-reduced-motion: reduce) &#123; * &#123;
                  animation: none !important; &#125; &#125;
                </code>
              </li>
              <li>
                <strong>Don't rely on color alone:</strong> Use icons or text
                labels along with color to convey state (error, success).
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
