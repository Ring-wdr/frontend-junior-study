import { motion } from 'framer-motion';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const GestureSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Interaction', color: 'green' }}
      title="Gesture-Based Interactions"
      description="Create responsive UI with hover, tap, focus, and scroll animations"
    >
      <div className="space-y-8">
        <SubSection title="Gesture Props Overview" icon iconColor="green">
          <InfoBox variant="green" title="Available Gesture Props">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>whileHover:</strong> Animation on mouse hover
              </li>
              <li>
                <strong>whileTap:</strong> Animation while pressing/clicking
              </li>
              <li>
                <strong>whileFocus:</strong> Animation when element is focused
              </li>
              <li>
                <strong>whileInView:</strong> Animation when element enters
                viewport
              </li>
              <li>
                <strong>whileDrag:</strong> Animation while dragging
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Hover & Tap" icon iconColor="blue">
          <CodeBlock
            code={`<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  Click Me
</motion.button>

// Combines multiple gestures for
// a polished interaction feel`}
            className="text-xs"
          />

          <DemoBox label="Interactive Buttons">
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md"
              >
                Hover Me
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#7C3AED' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-md"
              >
                Color Change
              </motion.button>

              <motion.button
                whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                whileTap={{ y: 0, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium shadow-md"
              >
                Lift Effect
              </motion.button>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title="whileInView (Scroll Animation)"
          icon
          iconColor="purple"
        >
          <CodeBlock
            code={`<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
>
  Appears when scrolled into view
</motion.div>

// viewport options:
// - once: Only animate first time
// - margin: Trigger offset from edge
// - amount: Percentage visible (0-1)`}
            className="text-xs"
          />

          <DemoBox label="Scroll-triggered Elements">
            <div className="space-y-3">
              {['First Item', 'Second Item', 'Third Item'].map(
                (text, index) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200"
                  >
                    <p className="font-medium text-purple-900">{text}</p>
                  </motion.div>
                ),
              )}
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Focus States" icon iconColor="orange">
          <CodeBlock
            code={`<motion.input
  whileFocus={{ scale: 1.02, borderColor: "#3B82F6" }}
  transition={{ duration: 0.2 }}
  className="border-2 px-4 py-2 rounded"
  placeholder="Focus me"
/>`}
            className="text-xs"
          />

          <DemoBox label="Focus Animation">
            <div className="flex justify-center">
              <motion.input
                whileFocus={{
                  scale: 1.02,
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                }}
                transition={{ duration: 0.2 }}
                className="border-2 border-gray-300 px-4 py-3 rounded-lg w-64 outline-none"
                placeholder="Click to focus..."
              />
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Gesture Event Handlers" icon iconColor="pink">
          <InfoBox variant="purple" title="Event Callbacks">
            <p className="text-sm mb-2">
              Framer Motion provides callbacks for gesture events:
            </p>
            <CodeBlock
              code={`<motion.div
  onHoverStart={() => console.log("Hover started")}
  onHoverEnd={() => console.log("Hover ended")}
  onTapStart={() => console.log("Tap started")}
  onTap={() => console.log("Tapped")}
  onTapCancel={() => console.log("Tap cancelled")}
  onPan={(e, info) => console.log(info.offset)}
/>`}
              className="text-xs"
            />
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
