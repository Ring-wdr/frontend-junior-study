import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DragSection = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <SectionCard
      badge={{ label: 'Advanced', color: 'orange' }}
      title="Drag & Drop"
      description="Build draggable UI components with physics-based interactions"
    >
      <div className="space-y-8">
        <SubSection title="Basic Drag" icon iconColor="orange">
          <CodeBlock
            code={`<motion.div drag>
  Drag me anywhere!
</motion.div>

// Or constrain to an axis:
<motion.div drag="x">Horizontal only</motion.div>
<motion.div drag="y">Vertical only</motion.div>`}
            className="text-xs"
          />

          <DemoBox label="Free Drag">
            <div className="h-32 flex items-center justify-center">
              <motion.div
                drag
                dragMomentum={false}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold text-sm"
              >
                Drag!
              </motion.div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Drag Constraints" icon iconColor="blue">
          <CodeBlock
            code={`// Using pixel values
<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
/>

// Or reference a parent element
const constraintsRef = useRef(null);

<motion.div ref={constraintsRef}>
  <motion.div drag dragConstraints={constraintsRef} />
</motion.div>`}
            className="text-xs"
          />

          <DemoBox label="Constrained Drag">
            <motion.div
              ref={constraintsRef}
              className="h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative"
            >
              <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold text-xs"
              >
                Bound
              </motion.div>
            </motion.div>
          </DemoBox>
        </SubSection>

        <SubSection title="Drag Options" icon iconColor="purple">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                dragElastic
              </p>
              <p className="text-xs text-purple-700 mt-1">
                0 = hard constraint, 1 = full elasticity (default: 0.5)
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                dragMomentum
              </p>
              <p className="text-xs text-purple-700 mt-1">
                Continue moving after release based on velocity (default: true)
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                dragTransition
              </p>
              <p className="text-xs text-purple-700 mt-1">
                Configure the momentum animation: bounceStiffness, bounceDamping
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-900">
                dragDirectionLock
              </p>
              <p className="text-xs text-purple-700 mt-1">
                Lock to detected direction after threshold
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Drag with Momentum" icon iconColor="green">
          <DemoBox label="Momentum & Snap Back">
            <motion.div className="h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                dragMomentum={true}
                className="w-24 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold text-xs"
              >
                Swipe Me
              </motion.div>
            </motion.div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Swipe horizontally and release to see momentum
            </p>
          </DemoBox>
        </SubSection>

        <SubSection title="Use Cases" icon iconColor="pink">
          <InfoBox variant="purple" title="Common Applications">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Kanban boards:</strong> Drag cards between columns
                (Trello)
              </li>
              <li>
                <strong>Carousels:</strong> Swipe-based image galleries
              </li>
              <li>
                <strong>Sliders:</strong> Custom range inputs
              </li>
              <li>
                <strong>Reorderable lists:</strong> Drag to reorder items
              </li>
              <li>
                <strong>Dismissible items:</strong> Swipe to delete
                notifications
              </li>
            </ul>
          </InfoBox>

          <CodeBlock
            code={`// Swipe to dismiss pattern
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, { offset, velocity }) => {
    if (Math.abs(offset.x) > 200 || Math.abs(velocity.x) > 500) {
      onDismiss();
    }
  }}
>
  Swipe to dismiss
</motion.div>`}
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
