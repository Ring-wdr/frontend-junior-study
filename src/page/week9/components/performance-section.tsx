import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const PerformanceSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Best Practices', color: 'indigo' }}
      title="Performance & Accessibility"
      description="Optimize animations for performance and inclusive design"
    >
      <div className="space-y-8">
        <SubSection title="Performance Tips" icon iconColor="green">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                Use Transform Properties
              </p>
              <p className="text-xs text-green-700 mt-1">
                x, y, scale, rotate are GPU-accelerated. Avoid animating width,
                height, top, left.
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                Limit Simultaneous Animations
              </p>
              <p className="text-xs text-green-700 mt-1">
                Too many animating elements at once can cause jank. Be
                selective.
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                Use will-change Sparingly
              </p>
              <p className="text-xs text-green-700 mt-1">
                Framer Motion handles this automatically. Don't add it manually.
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                Layout Animations Are Expensive
              </p>
              <p className="text-xs text-green-700 mt-1">
                Use layout prop judiciously. Consider layout="position" when
                possible.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Measuring Performance" icon iconColor="blue">
          <CodeBlock
            code={`// Use Chrome DevTools Performance tab
1. Open DevTools → Performance
2. Record while interacting with animations
3. Look for:
   - Long frames (> 16.67ms)
   - Layout thrashing
   - Paint/composite issues

// Target: 60 FPS (16.67ms per frame)

// Framer Motion DevTools (beta)
npm install @framer/motion-dev
// Visualize animation performance in dev mode`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title="Accessibility: Reduced Motion"
          icon
          iconColor="purple"
        >
          <InfoBox variant="purple" title="Respecting User Preferences">
            <p className="text-sm leading-relaxed">
              Some users experience motion sickness or have vestibular
              disorders. Always respect the <code>prefers-reduced-motion</code>{' '}
              system preference.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Option 1: Use Framer Motion's built-in support
import { motion, ReducedMotionConfig } from "framer-motion";

<ReducedMotionConfig reducedMotion="user">
  <App />
</ReducedMotionConfig>

// Option 2: Custom hook
import { useReducedMotion } from "framer-motion";

function Component() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{
        x: shouldReduceMotion ? 0 : 100,
        opacity: 1,  // Opacity is usually safe
      }}
    />
  );
}

// Option 3: CSS fallback
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
    transition: none !important;
  }
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Animation Anti-patterns" icon iconColor="red">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                Animating Layout Properties
              </p>
              <p className="text-xs text-red-700 mt-1">
                width/height cause reflow. Use scale transform instead.
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                Too Many layout Props
              </p>
              <p className="text-xs text-red-700 mt-1">
                Each layout animation requires measuring. Use sparingly.
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                Animating Everything
              </p>
              <p className="text-xs text-red-700 mt-1">
                Purposeless animation is distracting. Each animation should
                serve UX.
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                Long Durations
              </p>
              <p className="text-xs text-red-700 mt-1">
                Keep animations under 300ms for UI. Users perceive long
                animations as slow.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Good Animation Principles" icon iconColor="orange">
          <InfoBox variant="orange" title="UX Guidelines">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Purpose:</strong> Every animation should communicate
                something
              </li>
              <li>
                <strong>Speed:</strong> 200-300ms for most UI interactions
              </li>
              <li>
                <strong>Consistency:</strong> Same elements should animate the
                same way
              </li>
              <li>
                <strong>Subtlety:</strong> Animations should enhance, not
                distract
              </li>
              <li>
                <strong>Interruptibility:</strong> Animations should be
                cancellable
              </li>
            </ul>
          </InfoBox>

          <CodeBlock
            code={`// Recommended timing guidelines
const timings = {
  // Micro-interactions (buttons, toggles)
  micro: 0.1,          // 100ms

  // Standard transitions (modals, panels)
  standard: 0.2,       // 200ms

  // Complex transitions (page changes)
  complex: 0.3,        // 300ms

  // Emphasis (drawing attention)
  emphasis: 0.4,       // 400ms
};

// Never exceed 500ms for UI animations`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Resources" icon iconColor="pink">
          <InfoBox variant="purple" title="Learn More">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <a
                  href="https://motion.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-700 underline"
                >
                  Framer Motion Docs
                </a>
              </li>
              <li>
                <a
                  href="https://motion.dev/docs/animation/variants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-700 underline"
                >
                  Variants Guide
                </a>
              </li>
              <li>
                <a
                  href="https://motion.dev/docs/gestures/drag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-700 underline"
                >
                  Drag Gestures
                </a>
              </li>
              <li>
                <a
                  href="https://motion.dev/docs/layout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-700 underline"
                >
                  Layout Animations
                </a>
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
