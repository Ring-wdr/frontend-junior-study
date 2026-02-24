import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type UtilityType =
  | 'Partial'
  | 'Required'
  | 'Readonly'
  | 'Pick'
  | 'Omit'
  | 'Extract'
  | 'Exclude';

const utilityTypes: UtilityType[] = [
  'Partial',
  'Required',
  'Readonly',
  'Pick',
  'Omit',
  'Extract',
  'Exclude',
];

const originalType = `interface User {
  id: number;
  name: string;
  email: string;
}`;

const transformedTypes: Record<UtilityType, { result: string; code: string }> =
  {
    Partial: {
      result: `{
  id?: number;
  name?: string;
  email?: string;
}`,
      code: 'Partial<User>',
    },
    Required: {
      result: `{
  id: number;
  name: string;
  email: string;
}`,
      code: 'Required<User>',
    },
    Readonly: {
      result: `{
  readonly id: number;
  readonly name: string;
  readonly email: string;
}`,
      code: 'Readonly<User>',
    },
    Pick: {
      result: `{
  id: number;
  name: string;
}`,
      code: 'Pick<User, "id" | "name">',
    },
    Omit: {
      result: `{
  name: string;
  email: string;
}`,
      code: 'Omit<User, "id">',
    },
    Extract: {
      result: `string | number`,
      code: 'Extract<string | number | boolean, string | number>',
    },
    Exclude: {
      result: `boolean`,
      code: 'Exclude<string | number | boolean, string | number>',
    },
  };

export const UtilityTypeTransformer = () => {
  const { t } = useTranslation('week16');
  const [selected, setSelected] = useState<UtilityType>('Partial');

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center flex-wrap">
        {utilityTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelected(type)}
            className={`px-3 py-1.5 rounded-lg font-mono text-sm transition-all ${
              selected === type
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex items-start justify-center gap-4">
        <div className="flex-1 max-w-xs">
          <div className="text-xs font-medium text-gray-500 mb-2 text-center">
            {t('utilityTypes.visualizer.original')}
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-xs">
            <pre className="text-gray-300">{originalType}</pre>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <motion.div
            key={selected}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-mono mb-2"
          >
            {transformedTypes[selected].code}
          </motion.div>
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>

        <div className="flex-1 max-w-xs">
          <div className="text-xs font-medium text-gray-500 mb-2 text-center">
            {t('utilityTypes.visualizer.result')}
          </div>
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg p-3 text-xs"
          >
            <pre className="text-green-300">
              {transformedTypes[selected].result}
            </pre>
          </motion.div>
        </div>
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-100 p-4 rounded-lg text-center"
      >
        <code className="text-sm font-mono">
          <span className="text-purple-600">type</span>{' '}
          <span className="text-gray-800">Result</span>{' '}
          <span className="text-gray-600">=</span>{' '}
          <span className="text-green-600">
            {transformedTypes[selected].code}
          </span>
        </code>
      </motion.div>
    </div>
  );
};
