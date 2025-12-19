import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AnimatePresenceSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome!' },
    { id: 2, text: 'New message received' },
    { id: 3, text: 'Update available' },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const addNotification = () => {
    const newId = Date.now();
    setNotifications([
      ...notifications,
      { id: newId, text: `Notification ${newId}` },
    ]);
  };

  return (
    <SectionCard
      badge={{ label: 'Essential', color: 'orange' }}
      title="AnimatePresence"
      description="Animate components when they mount and unmount"
    >
      <div className="space-y-8">
        <SubSection title="The Problem" icon iconColor="red">
          <InfoBox variant="red" title="Why AnimatePresence?">
            <p className="text-sm leading-relaxed">
              React immediately removes elements from the DOM when they unmount.
              This means exit animations are impossible without{' '}
              <code>AnimatePresence</code>, which keeps elements in the DOM
              during their exit animation.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="Basic Usage" icon iconColor="blue">
          <CodeBlock
            code={`import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {isVisible && (
    <motion.div
      key="unique-key"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      I will fade out when removed!
    </motion.div>
  )}
</AnimatePresence>

// Key points:
// 1. Wrap conditional content in AnimatePresence
// 2. Add exit prop to define exit animation
// 3. Always provide a unique key`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Modal Example" icon iconColor="purple">
          <DemoBox label="Modal with Exit Animation">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Open Modal
              </button>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsOpen(false)}
                      className="fixed inset-0 bg-black/50 z-40"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 300,
                      }}
                      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                      <div className="bg-white rounded-xl p-6 shadow-2xl max-w-sm mx-4 pointer-events-auto">
                        <h3 className="text-lg font-bold mb-2">
                          Animated Modal
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          This modal has smooth enter and exit animations!
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Toast Notifications" icon iconColor="green">
          <DemoBox label="Dismissible Notifications">
            <div className="space-y-3">
              <button
                type="button"
                onClick={addNotification}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Notification
              </button>

              <div className="space-y-2 min-h-[100px]">
                <AnimatePresence mode="popLayout">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.9 }}
                      className="flex items-center justify-between p-3 bg-green-100 border border-green-200 rounded-lg"
                    >
                      <span className="text-sm text-green-800">
                        {notification.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNotification(notification.id)}
                        className="text-green-600 hover:text-green-800 font-bold"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="AnimatePresence Modes" icon iconColor="orange">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                mode="sync" (default)
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Enter and exit animations happen simultaneously
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                mode="wait"
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Wait for exit to complete before entering (good for page
                transitions)
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded border border-orange-200">
              <p className="text-sm font-semibold text-orange-900">
                mode="popLayout"
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Exiting elements are removed from layout flow immediately
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// Page transition pattern
<AnimatePresence mode="wait">
  <motion.div
    key={router.pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <Component {...pageProps} />
  </motion.div>
</AnimatePresence>`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Use Cases" icon iconColor="pink">
          <InfoBox variant="purple" title="Common Applications">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Modals & Dialogs:</strong> Fade/scale in and out
              </li>
              <li>
                <strong>Toast notifications:</strong> Slide in and dismiss
              </li>
              <li>
                <strong>Dropdowns:</strong> Expand and collapse menus
              </li>
              <li>
                <strong>Page transitions:</strong> Crossfade between routes
              </li>
              <li>
                <strong>Accordions:</strong> Smooth content reveal
              </li>
            </ul>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
