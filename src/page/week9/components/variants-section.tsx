import { motion } from 'framer-motion';
import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const VariantsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SectionCard
      badge={{ label: 'Advanced', color: 'purple' }}
      title="Variants"
      description="State-based animation patterns for complex orchestration"
    >
      <div className="space-y-8">
        <SubSection title="What are Variants?" icon iconColor="purple">
          <InfoBox variant="purple" title="Variants Concept">
            <p className="text-sm leading-relaxed">
              Variants are named animation states that can be referenced by
              string. They enable:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Reusability:</strong> Define once, use everywhere
              </li>
              <li>
                <strong>Propagation:</strong> Child components inherit parent
                states
              </li>
              <li>
                <strong>Orchestration:</strong> Stagger, delay, and sequence
                animations
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Basic Variants Pattern" icon iconColor="blue">
          <CodeBlock
            code={`const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.div
  variants={boxVariants}
  initial="hidden"
  animate="show"
/>

// Instead of inline objects,
// you reference states by name!`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Stagger Children" icon iconColor="green">
          <CodeBlock
            code={`const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms delay between children
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.li variants={item} key={item.id}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>`}
            className="text-xs"
          />

          <DemoBox label="Stagger Animation Demo">
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isVisible ? 'Reset' : 'Animate List'}
              </button>

              <motion.div
                key={isVisible ? 'visible' : 'hidden'}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex gap-3"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <motion.div
                    key={num}
                    variants={itemVariants}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                  >
                    {num}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Variant Propagation" icon iconColor="orange">
          <InfoBox variant="orange" title="How Propagation Works">
            <p className="text-sm">
              When a parent component changes to a new variant, all children
              with the same variant names automatically animate to match. This
              creates coordinated animations without explicit wiring.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Parent controls the animation state
<motion.div
  initial="rest"
  whileHover="hover"
  variants={parentVariants}
>
  {/* Children automatically inherit "rest" → "hover" */}
  <motion.span variants={childVariants}>
    Icon
  </motion.span>
  <motion.span variants={childVariants}>
    Label
  </motion.span>
</motion.div>

// No need to add whileHover to each child!`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Orchestration Options" icon iconColor="pink">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                staggerChildren
              </p>
              <p className="text-xs text-pink-700 mt-1">
                Delay between each child animation start
              </p>
            </div>
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                staggerDirection
              </p>
              <p className="text-xs text-pink-700 mt-1">
                1 = first to last, -1 = last to first
              </p>
            </div>
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">
                delayChildren
              </p>
              <p className="text-xs text-pink-700 mt-1">
                Wait before starting children animations
              </p>
            </div>
            <div className="bg-pink-50 p-3 rounded border border-pink-200">
              <p className="text-sm font-semibold text-pink-900">when</p>
              <p className="text-xs text-pink-700 mt-1">
                "beforeChildren" | "afterChildren"
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
