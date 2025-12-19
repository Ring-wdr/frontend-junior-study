import { motion } from 'framer-motion';
import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const LayoutAnimationSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([1, 2, 3, 4]);
  const [isGrid, setIsGrid] = useState(true);

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item !== id));
  };

  const resetItems = () => {
    setItems([1, 2, 3, 4]);
  };

  return (
    <SectionCard
      badge={{ label: 'Magic', color: 'pink' }}
      title="Layout Animation"
      description="Automatic smooth transitions when layout changes"
    >
      <div className="space-y-8">
        <SubSection title="The Magic of layout Prop" icon iconColor="pink">
          <InfoBox variant="purple" title="What Layout Animation Does">
            <p className="text-sm leading-relaxed">
              When you add the <code>layout</code> prop, Framer Motion
              automatically animates between layout changes (position, size)
              using performant transforms. This is nearly impossible to achieve
              with CSS alone.
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Just add layout prop - that's it!
<motion.div layout>
  {isExpanded ? "Large content here" : "Small"}
</motion.div>

// The element smoothly animates between
// any size/position changes automatically`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Accordion Example" icon iconColor="blue">
          <DemoBox label="Click to Expand/Collapse">
            <motion.div
              layout
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 cursor-pointer text-white"
              style={{ borderRadius: 16 }}
            >
              <motion.h4 layout="position" className="font-bold">
                Click Me!
              </motion.h4>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-blue-100"
                >
                  This content smoothly expands and collapses. The parent
                  container automatically animates its size change, and the
                  title stays in position using layout="position".
                </motion.p>
              )}
            </motion.div>
          </DemoBox>
        </SubSection>

        <SubSection title="List Reordering" icon iconColor="green">
          <CodeBlock
            code={`// Each item needs layout prop
{items.map((item) => (
  <motion.div
    key={item.id}
    layout
    onClick={() => removeItem(item.id)}
  >
    {item.text}
  </motion.div>
))}

// When items are removed, remaining items
// smoothly slide into their new positions`}
            className="text-xs"
          />

          <DemoBox label="Click Items to Remove">
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {items.map((item) => (
                  <motion.div
                    key={item}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => removeItem(item)}
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md cursor-pointer flex items-center justify-center text-white font-bold hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              {items.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  All items removed!
                </p>
              )}
              <button
                type="button"
                onClick={resetItems}
                className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset Items
              </button>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Grid ↔ List Toggle" icon iconColor="purple">
          <DemoBox label="Toggle Layout Mode">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setIsGrid(!isGrid)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Switch to {isGrid ? 'List' : 'Grid'}
              </button>

              <motion.div
                layout
                className={`${isGrid ? 'grid grid-cols-4 gap-2' : 'flex flex-col gap-2'}`}
              >
                {[1, 2, 3, 4].map((num) => (
                  <motion.div
                    key={num}
                    layout
                    className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold ${
                      isGrid ? 'h-16' : 'h-12 px-4'
                    }`}
                  >
                    Item {num}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Layout Prop Options" icon iconColor="orange">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">layout</p>
              <p className="text-xs text-orange-700 mt-1">
                Animate both position and size changes
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                layout="position"
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Only animate position, not size (prevents text distortion)
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                layout="size"
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Only animate size changes, not position
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                layoutId="shared-id"
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Shared layout animations across different components
              </p>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
