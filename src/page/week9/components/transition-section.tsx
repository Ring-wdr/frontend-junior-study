import { motion } from 'framer-motion';
import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const TransitionSection = () => {
  const [animationType, setAnimationType] = useState<
    'spring' | 'tween' | 'keyframes'
  >('spring');
  const [trigger, setTrigger] = useState(0);

  return (
    <SectionCard
      badge={{ label: 'Physics', color: 'blue' }}
      title="Transitions & Springs"
      description="Fine-tune animation timing with springs, tweens, and keyframes"
    >
      <div className="space-y-8">
        <SubSection title="Spring Physics (Default)" icon iconColor="blue">
          <InfoBox variant="blue" title="Why Springs?">
            <p className="text-sm leading-relaxed">
              Framer Motion uses spring physics by default because they create
              more natural, responsive animations. Unlike duration-based tweens,
              springs respond to interruption smoothly.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Spring parameters
transition={{
  type: "spring",
  stiffness: 100,  // Higher = snappier (default: 100)
  damping: 10,     // Higher = less bounce (default: 10)
  mass: 1,         // Higher = slower, more momentum
  velocity: 0,     // Initial velocity
}}

// Or use presets:
transition={{ type: "spring", bounce: 0.25 }}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Tween (Duration-based)" icon iconColor="purple">
          <CodeBlock
            code={`transition={{
  type: "tween",
  duration: 0.5,          // Time in seconds
  ease: "easeInOut",      // Easing function
}}

// Available easings:
// - "linear"
// - "easeIn", "easeOut", "easeInOut"
// - "circIn", "circOut", "circInOut"
// - "backIn", "backOut", "backInOut"
// - [0.42, 0, 0.58, 1]  // Custom bezier curve`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Compare Animation Types" icon iconColor="green">
          <DemoBox label="Click to Animate">
            <div className="space-y-4">
              <div className="flex gap-2 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setAnimationType('spring');
                    setTrigger((t) => t + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    animationType === 'spring'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Spring
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnimationType('tween');
                    setTrigger((t) => t + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    animationType === 'tween'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Tween
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnimationType('keyframes');
                    setTrigger((t) => t + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    animationType === 'keyframes'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Keyframes
                </button>
              </div>

              <div className="h-24 flex items-center justify-center">
                <motion.div
                  key={trigger}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={
                    animationType === 'spring'
                      ? { type: 'spring', stiffness: 200, damping: 15 }
                      : animationType === 'tween'
                        ? { type: 'tween', duration: 0.5, ease: 'easeOut' }
                        : {
                            duration: 0.8,
                            times: [0, 0.2, 0.5, 0.8, 1],
                            ease: 'easeInOut',
                          }
                  }
                  className={`w-20 h-20 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xs ${
                    animationType === 'spring'
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                      : animationType === 'tween'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                        : 'bg-gradient-to-br from-pink-500 to-red-600'
                  }`}
                >
                  {animationType}
                </motion.div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                {animationType === 'spring' &&
                  'Notice the natural bounce and overshoot'}
                {animationType === 'tween' && 'Smooth, predictable timing'}
                {animationType === 'keyframes' &&
                  'Multi-step animation sequence'}
              </p>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Keyframes Animation" icon iconColor="pink">
          <CodeBlock
            code={`// Animate through multiple values
<motion.div
  animate={{
    scale: [1, 1.2, 1.2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  }}
  transition={{
    duration: 2,
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
  }}
/>`}
            className="text-xs"
          />

          <DemoBox label="Keyframe Animation">
            <div className="flex justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1.2, 1, 1],
                  rotate: [0, 0, 180, 180, 0],
                  borderRadius: ['10%', '10%', '50%', '50%', '10%'],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 shadow-lg"
              />
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Transition Options" icon iconColor="orange">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">delay</p>
              <p className="text-xs text-orange-700 mt-1">
                Wait before starting (in seconds)
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">repeat</p>
              <p className="text-xs text-orange-700 mt-1">
                Number of repetitions (Infinity for loop)
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                repeatType
              </p>
              <p className="text-xs text-orange-700 mt-1">
                "loop" | "reverse" | "mirror"
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                repeatDelay
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Pause between repetitions
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Per-Property Transitions" icon iconColor="blue">
          <CodeBlock
            code={`// Different transitions for different properties
<motion.div
  animate={{ x: 100, opacity: 1 }}
  transition={{
    x: { type: "spring", stiffness: 100 },
    opacity: { duration: 0.2 },
  }}
/>

// The x property uses spring physics,
// while opacity uses a simple tween`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
