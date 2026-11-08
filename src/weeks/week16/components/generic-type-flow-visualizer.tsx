'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

type InputType = 'string' | 'number' | 'boolean' | 'User';

const inputTypes: InputType[] = ['string', 'number', 'boolean', 'User'];

const boxTransition = { duration: 0.3, ease: 'easeOut' } as const;
const nudgeTransition = { duration: 0.5, ease: 'easeInOut' } as const;

const typeColors: Record<InputType, string> = {
  string: 'bg-green-100 text-green-700 border-green-300',
  number: 'bg-blue-100 text-blue-700 border-blue-300',
  boolean: 'bg-purple-100 text-purple-700 border-purple-300',
  User: 'bg-orange-100 text-orange-700 border-orange-300',
};

export const GenericTypeFlowVisualizer = () => {
  const { t } = useTranslation('week16');
  const [selectedType, setSelectedType] = useState<InputType>('string');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTypeSelect = (type: InputType) => {
    setIsAnimating(true);
    setSelectedType(type);
  };

  const arrowProps = {
    animate: { x: isAnimating ? [0, 8, 0] : 0 },
    transition: nudgeTransition,
    onAnimationComplete: () => setIsAnimating(false),
    className: 'flex items-center gap-1 rotate-90 sm:rotate-0',
    'aria-hidden': true,
  } as const;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 text-center">
        {t('generics.visualizer.flowDescription')}
      </p>

      <div className="flex gap-2 justify-center flex-wrap">
        {inputTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeSelect(type)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all border ${
              selectedType === type
                ? typeColors[type]
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 py-4">
        <motion.div
          key={`input-${selectedType}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={boxTransition}
          className={`px-4 py-3 rounded-xl border-2 text-center ${typeColors[selectedType]}`}
        >
          <div className="text-xs text-gray-500 mb-1">
            {t('generics.visualizer.inputType')}
          </div>
          <code className="text-base sm:text-lg font-bold">{selectedType}</code>
        </motion.div>

        <motion.div {...arrowProps}>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </motion.div>

        <div className="px-4 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 text-center">
          <div className="text-xs text-gray-500 mb-1">
            {t('generics.visualizer.genericFunction')}
          </div>
          <code className="text-base sm:text-lg font-bold text-gray-700">
            identity&lt;T&gt;
          </code>
        </div>

        <motion.div {...arrowProps}>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </motion.div>

        <motion.div
          key={`output-${selectedType}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...boxTransition, delay: 0.2 }}
          className={`px-4 py-3 rounded-xl border-2 text-center ${typeColors[selectedType]}`}
        >
          <div className="text-xs text-gray-500 mb-1">
            {t('generics.visualizer.outputType')}
          </div>
          <code className="text-base sm:text-lg font-bold">{selectedType}</code>
        </motion.div>
      </div>

      <motion.div
        key={selectedType}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={boxTransition}
        className="bg-gray-900 rounded-lg p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto"
      >
        <code className="text-gray-300">
          <span className="text-purple-400">function</span>{' '}
          <span className="text-yellow-300">identity</span>
          <span className="text-gray-400">&lt;</span>
          <span className="text-green-400">T</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-400">(</span>
          <span className="text-orange-300">arg</span>
          <span className="text-gray-400">:</span>{' '}
          <span className="text-green-400">T</span>
          <span className="text-gray-400">):</span>{' '}
          <span className="text-green-400">T</span>
          <br />
          <br />
          <span className="text-gray-500">// T = {selectedType}</span>
          <br />
          <span className="text-purple-400">const</span> result{' '}
          <span className="text-gray-400">=</span>{' '}
          <span className="text-yellow-300">identity</span>
          <span className="text-gray-400">(</span>
          <span
            className={
              selectedType === 'string'
                ? 'text-green-400'
                : selectedType === 'number'
                  ? 'text-blue-400'
                  : 'text-purple-400'
            }
          >
            {selectedType === 'string' && '"hello"'}
            {selectedType === 'number' && '42'}
            {selectedType === 'boolean' && 'true'}
            {selectedType === 'User' && '{ name: "Alice" }'}
          </span>
          <span className="text-gray-400">);</span>
          <br />
          <span className="text-gray-500">// result: {selectedType}</span>
        </code>
      </motion.div>
    </div>
  );
};
