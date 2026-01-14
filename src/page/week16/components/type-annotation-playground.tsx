import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const examples = [
  { value: '"hello"', type: 'string' },
  { value: '42', type: 'number' },
  { value: 'true', type: 'boolean' },
  { value: '[1, 2, 3]', type: 'number[]' },
  { value: '{ name: "Alice" }', type: '{ name: string }' },
  { value: 'null', type: 'null' },
  { value: 'undefined', type: 'undefined' },
];

const inferType = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed === 'null') return 'null';
  if (trimmed === 'undefined') return 'undefined';
  if (trimmed === 'true' || trimmed === 'false') return 'boolean';
  if (trimmed.startsWith('"') || trimmed.startsWith("'") || trimmed.startsWith('`')) return 'string';
  if (!Number.isNaN(Number(trimmed)) && trimmed !== '') return 'number';
  if (trimmed.startsWith('[')) {
    if (trimmed.includes('"') || trimmed.includes("'")) return 'string[]';
    return 'number[]';
  }
  if (trimmed.startsWith('{')) return 'object';
  if (trimmed === '') return '...';

  return 'unknown';
};

export const TypeAnnotationPlayground = () => {
  const { t } = useTranslation('week16');
  const [input, setInput] = useState('');
  const inferredType = inferType(input);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('typeBasics.visualizer.inputLabel')}
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('typeBasics.visualizer.tryIt')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        <motion.div
          key={inferredType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
        >
          <div className="text-sm text-gray-600 mb-1">{t('typeBasics.visualizer.inferredType')}</div>
          <code className="text-xl font-bold text-blue-600">{inferredType}</code>
        </motion.div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-600 mb-2">{t('typeBasics.visualizer.examples')}</div>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example.value}
              type="button"
              onClick={() => setInput(example.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <code className="text-gray-700">{example.value}</code>
              <span className="text-gray-400 mx-1">→</span>
              <code className="text-blue-600">{example.type}</code>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
