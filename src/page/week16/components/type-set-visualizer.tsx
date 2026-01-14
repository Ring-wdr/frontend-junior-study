import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

type Operation = 'union' | 'intersection';

const typeA = ['string', 'number'];
const typeB = ['number', 'boolean'];

export const TypeSetVisualizer = () => {
  const { t } = useTranslation('week16');
  const [operation, setOperation] = useState<Operation>('union');

  const getResult = () => {
    if (operation === 'union') {
      return [...new Set([...typeA, ...typeB])];
    }
    return typeA.filter((t) => typeB.includes(t));
  };

  const result = getResult();

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={() => setOperation('union')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            operation === 'union'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {t('advancedTypes.visualizer.union')}
        </button>
        <button
          type="button"
          onClick={() => setOperation('intersection')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            operation === 'intersection'
              ? 'bg-indigo-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {t('advancedTypes.visualizer.intersection')}
        </button>
      </div>

      <div className="relative h-48 flex items-center justify-center">
        <svg viewBox="0 0 300 150" className="w-full max-w-md">
          <motion.circle
            cx="100"
            cy="75"
            r="55"
            fill={operation === 'union' ? 'rgba(147, 51, 234, 0.3)' : 'rgba(147, 51, 234, 0.1)'}
            stroke="rgb(147, 51, 234)"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          <motion.circle
            cx="200"
            cy="75"
            r="55"
            fill={operation === 'union' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.1)'}
            stroke="rgb(99, 102, 241)"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          {operation === 'intersection' && (
            <motion.ellipse
              cx="150"
              cy="75"
              rx="28"
              ry="45"
              fill="rgba(99, 102, 241, 0.5)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}
          <text x="70" y="70" className="text-xs fill-purple-700 font-medium">string</text>
          <text x="130" y="80" className="text-xs fill-indigo-700 font-bold">number</text>
          <text x="200" y="70" className="text-xs fill-indigo-700 font-medium">boolean</text>
          <text x="100" y="145" className="text-xs fill-gray-600" textAnchor="middle">Type A</text>
          <text x="200" y="145" className="text-xs fill-gray-600" textAnchor="middle">Type B</text>
        </svg>
      </div>

      <motion.div
        key={operation}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">{t('advancedTypes.visualizer.result')}</span>
          <span className="text-xs text-gray-500">
            {operation === 'union' ? t('advancedTypes.visualizer.unionDesc') : t('advancedTypes.visualizer.intersectionDesc')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-lg font-bold text-purple-700">
            {result.join(' | ')}
          </code>
        </div>
        <div className="mt-3 text-xs text-gray-600 font-mono bg-white p-2 rounded">
          {operation === 'union'
            ? `type Result = string | number | boolean; // A 또는 B`
            : `type Result = number; // A와 B 모두 만족`}
        </div>
      </motion.div>
    </div>
  );
};
