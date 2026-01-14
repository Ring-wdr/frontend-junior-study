import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowDown, Check, X } from 'lucide-react';

type Scenario = 'isString' | 'isArray' | 'extractPromise';

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'isString', label: 'IsString<T>' },
  { id: 'isArray', label: 'IsArray<T>' },
  { id: 'extractPromise', label: 'Awaited<T>' },
];

const scenarioData: Record<Scenario, {
  condition: string;
  trueCase: { input: string; result: string };
  falseCase: { input: string; result: string };
  code: string;
}> = {
  isString: {
    condition: 'T extends string ?',
    trueCase: { input: 'string', result: '"yes"' },
    falseCase: { input: 'number', result: '"no"' },
    code: 'type IsString<T> = T extends string ? "yes" : "no";',
  },
  isArray: {
    condition: 'T extends any[] ?',
    trueCase: { input: 'number[]', result: 'true' },
    falseCase: { input: 'number', result: 'false' },
    code: 'type IsArray<T> = T extends any[] ? true : false;',
  },
  extractPromise: {
    condition: 'T extends Promise<infer U> ?',
    trueCase: { input: 'Promise<string>', result: 'string' },
    falseCase: { input: 'number', result: 'number' },
    code: 'type Awaited<T> = T extends Promise<infer U> ? U : T;',
  },
};

export const ConditionalTypeFlowchart = () => {
  const { t } = useTranslation('week16');
  const [scenario, setScenario] = useState<Scenario>('isString');
  const [branch, setBranch] = useState<'true' | 'false'>('true');

  const data = scenarioData[scenario];
  const result = branch === 'true' ? data.trueCase : data.falseCase;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center flex-wrap">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScenario(s.id)}
            className={`px-3 py-1.5 rounded-lg font-mono text-sm transition-all ${
              scenario === s.id
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <motion.div
          key={`input-${scenario}-${branch}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl border-2 border-purple-300 font-mono text-sm"
        >
          T = {result.input}
        </motion.div>

        <ArrowDown className="w-5 h-5 text-gray-400 my-2" />

        <div className="px-6 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 font-mono text-sm text-center">
          <span className="text-purple-600">{data.condition}</span>
        </div>

        <div className="flex gap-8 mt-4">
          <button
            type="button"
            onClick={() => setBranch('true')}
            className={`flex flex-col items-center transition-all ${
              branch === 'true' ? 'scale-110' : 'opacity-50'
            }`}
          >
            <div className="flex items-center gap-1 text-sm text-green-600 mb-2">
              <Check className="w-4 h-4" />
              {t('conditionalTypes.visualizer.true')}
            </div>
            <ArrowDown className="w-4 h-4 text-green-400" />
          </button>

          <button
            type="button"
            onClick={() => setBranch('false')}
            className={`flex flex-col items-center transition-all ${
              branch === 'false' ? 'scale-110' : 'opacity-50'
            }`}
          >
            <div className="flex items-center gap-1 text-sm text-red-600 mb-2">
              <X className="w-4 h-4" />
              {t('conditionalTypes.visualizer.false')}
            </div>
            <ArrowDown className="w-4 h-4 text-red-400" />
          </button>
        </div>

        <motion.div
          key={`result-${scenario}-${branch}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mt-4 px-6 py-3 rounded-xl border-2 font-mono text-sm ${
            branch === 'true'
              ? 'bg-green-100 text-green-700 border-green-300'
              : 'bg-red-100 text-red-700 border-red-300'
          }`}
        >
          {t('conditionalTypes.visualizer.result')}: {result.result}
        </motion.div>
      </div>

      <motion.div
        key={scenario}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 rounded-lg p-3 text-center"
      >
        <code className="text-xs text-gray-300">{data.code}</code>
      </motion.div>
    </div>
  );
};
