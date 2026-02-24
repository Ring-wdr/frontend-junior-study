import { Trans, useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const PerformanceSection = () => {
  const { t } = useTranslation('week9');

  return (
    <SectionCard
      badge={{ label: t('performance.badge'), color: 'indigo' }}
      title={t('performance.title')}
      description={t('performance.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('performance.performanceTips.title')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                {t('performance.performanceTips.useTransform')}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {t('performance.performanceTips.useTransformDesc')}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                {t('performance.performanceTips.limitSimultaneous')}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {t('performance.performanceTips.limitSimultaneousDesc')}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                {t('performance.performanceTips.willChange')}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {t('performance.performanceTips.willChangeDesc')}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-900">
                {t('performance.performanceTips.layoutExpensive')}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {t('performance.performanceTips.layoutExpensiveDesc')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('performance.measuring.title')}
          icon
          iconColor="blue"
        >
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
          title={t('performance.reducedMotion.title')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('performance.reducedMotion.infoTitle')}
          >
            <p className="text-sm leading-relaxed">
              <Trans
                t={t}
                i18nKey="performance.reducedMotion.content"
                components={{ code: <code /> }}
              />
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

        <SubSection
          title={t('performance.antiPatterns.title')}
          icon
          iconColor="red"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                {t('performance.antiPatterns.animatingLayout')}
              </p>
              <p className="text-xs text-red-700 mt-1">
                {t('performance.antiPatterns.animatingLayoutDesc')}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                {t('performance.antiPatterns.tooManyLayout')}
              </p>
              <p className="text-xs text-red-700 mt-1">
                {t('performance.antiPatterns.tooManyLayoutDesc')}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                {t('performance.antiPatterns.animatingEverything')}
              </p>
              <p className="text-xs text-red-700 mt-1">
                {t('performance.antiPatterns.animatingEverythingDesc')}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-900">
                {t('performance.antiPatterns.longDurations')}
              </p>
              <p className="text-xs text-red-700 mt-1">
                {t('performance.antiPatterns.longDurationsDesc')}
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection
          title={t('performance.goodPrinciples.title')}
          icon
          iconColor="orange"
        >
          <InfoBox
            variant="orange"
            title={t('performance.goodPrinciples.infoTitle')}
          >
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>{t('performance.goodPrinciples.purpose')}</strong>{' '}
                {t('performance.goodPrinciples.purposeDesc')}
              </li>
              <li>
                <strong>{t('performance.goodPrinciples.speed')}</strong>{' '}
                {t('performance.goodPrinciples.speedDesc')}
              </li>
              <li>
                <strong>{t('performance.goodPrinciples.consistency')}</strong>{' '}
                {t('performance.goodPrinciples.consistencyDesc')}
              </li>
              <li>
                <strong>{t('performance.goodPrinciples.subtlety')}</strong>{' '}
                {t('performance.goodPrinciples.subtletyDesc')}
              </li>
              <li>
                <strong>
                  {t('performance.goodPrinciples.interruptibility')}
                </strong>{' '}
                {t('performance.goodPrinciples.interruptibilityDesc')}
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

        <SubSection
          title={t('performance.resources.title')}
          icon
          iconColor="pink"
        >
          <InfoBox
            variant="purple"
            title={t('performance.resources.infoTitle')}
          >
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
