'use client';

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

const bindingTypes = [
  'default',
  'implicit',
  'explicit',
  'new',
  'arrow',
] as const;

type BindingType = (typeof bindingTypes)[number];

const exampleCode: Record<BindingType, string> = {
  default: `function showThis() {
  console.log(this);
}

showThis(); // window (or undefined in strict mode)`,
  implicit: `const obj = {
  name: 'JavaScript',
  greet() {
    console.log(this.name);
  }
};

obj.greet(); // 'JavaScript'`,
  explicit: `function greet() {
  console.log(this.name);
}

const person = { name: 'Alice' };

greet.call(person); // 'Alice'`,
  new: `function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');
console.log(alice.name); // 'Alice'`,
  arrow: `const obj = {
  name: 'JavaScript',
  greet: () => {
    console.log(this.name);
  }
};

obj.greet(); // undefined (inherits from outer scope)`,
};

export const ThisBindingDemo = () => {
  const { t } = useTranslation('week1');
  const [activeType, setActiveType] = useState<BindingType>('implicit');
  const [showResult, setShowResult] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    },
    [],
  );

  const handleRun = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowResult(true);
    hideTimerRef.current = setTimeout(() => setShowResult(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {bindingTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setActiveType(type);
              setShowResult(false);
            }}
            data-testid={`this-binding-${type}`}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              activeType === type
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {t(`thisBinding.demo.examples.${type}.title`)}
          </button>
        ))}
      </div>

      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
        <p className="text-sm text-purple-900">
          {t(`thisBinding.demo.examples.${activeType}.desc`)}
        </p>
      </div>

      <div className="space-y-2">
        <CodeBlock code={exampleCode[activeType]} />
        <button
          type="button"
          onClick={handleRun}
          className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all shadow-md"
        >
          <Play className="w-3 h-3" />
          {t('thisBinding.demo.run')}
        </button>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm"
        >
          <div className="text-gray-500 mb-1">
            {t('thisBinding.demo.output')}
          </div>
          {t(`thisBinding.demo.examples.${activeType}.result`)}
        </motion.div>
      )}
    </div>
  );
};
