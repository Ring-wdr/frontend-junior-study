import { motion } from 'framer-motion';
import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const MotionBasicsSection = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SectionCard
      badge={{ label: 'Fundamentals', color: 'blue' }}
      title="Motion Component Basics"
      description="Understanding the core building blocks of Framer Motion"
    >
      <div className="space-y-8">
        <SubSection title="What is motion.div?" icon iconColor="blue">
          <InfoBox variant="blue" title="Motion Component">
            <p className="text-sm leading-relaxed">
              Framer Motion's basic unit is the <code>motion</code> component.
              It wraps any HTML element to enable declarative animations that
              integrate seamlessly with React state.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Declarative:</strong> Define what, not how
              </li>
              <li>
                <strong>State-driven:</strong> Animations react to React state
                changes
              </li>
              <li>
                <strong>Composable:</strong> Works with Variants for complex
                animations
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Basic Animation Properties" icon iconColor="purple">
          <div className="space-y-4">
            <CodeBlock
              code={`import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}   // Starting state
  animate={{ opacity: 1, y: 0 }}     // End state
  transition={{ duration: 0.4 }}     // How to animate
/>

// Key properties:
// - initial: Animation starting point
// - animate: Target animation state
// - transition: Timing and easing configuration
// - exit: Animation when component unmounts`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="Interactive Demo" icon iconColor="green">
          <DemoBox label="Fade & Slide Animation">
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isVisible ? 'Hide' : 'Show'} Element
              </button>

              <div className="h-24 flex items-center justify-center">
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
                  >
                    Hello!
                  </motion.div>
                )}
              </div>
            </div>
          </DemoBox>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> This simple toggle doesn't animate exit.
              For exit animations, you need <code>AnimatePresence</code>{' '}
              (covered later).
            </p>
          </div>
        </SubSection>

        <SubSection title="Animatable Properties" icon iconColor="orange">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">Transform</p>
              <p className="text-xs text-orange-700 mt-1">
                x, y, scale, rotate, skew
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">Visual</p>
              <p className="text-xs text-orange-700 mt-1">
                opacity, color, backgroundColor
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">Layout</p>
              <p className="text-xs text-orange-700 mt-1">
                width, height, borderRadius
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">Filter</p>
              <p className="text-xs text-orange-700 mt-1">
                blur, brightness, contrast
              </p>
            </div>
          </div>

          <InfoBox variant="green" title="Performance Tip">
            <p className="text-sm">
              <strong>Transform properties</strong> (x, y, scale, rotate) are
              GPU-accelerated and don't trigger layout recalculation. Prefer
              these over width/height for better performance.
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
