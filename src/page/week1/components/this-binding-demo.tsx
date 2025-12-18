import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type BindingType = 'default' | 'implicit' | 'explicit' | 'new' | 'arrow';

const examples = {
  default: {
    title: 'Default Binding',
    desc: 'Standalone function call → global object (or undefined in strict mode)',
    code: `function showThis() {
  console.log(this);
}

showThis(); // window (or undefined in strict mode)`,
    result: 'window (or undefined in strict mode)',
  },
  implicit: {
    title: 'Implicit Binding',
    desc: "Object method call → 'this' is the object",
    code: `const obj = {
  name: 'JavaScript',
  greet() {
    console.log(this.name);
  }
};

obj.greet(); // 'JavaScript'`,
    result: "'JavaScript'",
  },
  explicit: {
    title: 'Explicit Binding',
    desc: "call/apply/bind → manually specify 'this'",
    code: `function greet() {
  console.log(this.name);
}

const person = { name: 'Alice' };

greet.call(person); // 'Alice'`,
    result: "'Alice'",
  },
  new: {
    title: 'new Binding',
    desc: "Constructor call → 'this' is the new instance",
    code: `function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');
console.log(alice.name); // 'Alice'`,
    result: "'Alice'",
  },
  arrow: {
    title: 'Lexical Binding (Arrow)',
    desc: "Arrow functions inherit 'this' from parent scope",
    code: `const obj = {
  name: 'JavaScript',
  greet: () => {
    console.log(this.name);
  }
};

obj.greet(); // undefined (inherits from outer scope)`,
    result: 'undefined (lexical scope)',
  },
};

export const ThisBindingDemo = () => {
  const [activeType, setActiveType] = useState<BindingType>('implicit');
  const [showResult, setShowResult] = useState(false);

  const handleRun = () => {
    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  const example = examples[activeType];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(examples) as BindingType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setActiveType(type);
              setShowResult(false);
            }}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              activeType === type
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {examples[type].title}
          </button>
        ))}
      </div>

      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
        <p className="text-sm text-purple-900">{example.desc}</p>
      </div>

      <div className="relative">
        <CodeBlock code={example.code} />
        <button
          type="button"
          onClick={handleRun}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all shadow-md"
        >
          <Play className="w-3 h-3" />
          Run
        </button>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm"
        >
          <div className="text-gray-500 mb-1">Output:</div>
          {example.result}
        </motion.div>
      )}
    </div>
  );
};
