import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// -- UI Components --

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const Badge = ({
  children,
  color = 'blue',
}: {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700',
    green: 'bg-green-50 text-green-700',
    orange: 'bg-orange-50 text-orange-700',
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const CodeBlock = ({
  code,
  language = 'javascript',
}: {
  code: string;
  language?: string;
}) => (
  <div className="rounded-xl overflow-hidden my-3 text-left shadow-md">
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);

// -- Section Components --

const EventLoopSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="blue">Runtime</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Event Loop & Concurrency
        </h3>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-left">
      JavaScript gets its single-threaded non-blocking nature from the Event
      Loop. It processes the <strong>Call Stack</strong>,{' '}
      <strong>Task Queue</strong> (Macrotasks), and{' '}
      <strong>Microtask Queue</strong> (Promises).
    </p>
    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-left">
      <h4 className="font-semibold text-blue-900 mb-2">Key Rule</h4>
      <p className="text-sm text-blue-800">
        Microtasks (Promises, queueMicrotask) calls are processed{' '}
        <em>immediately</em> after the current script and before any new
        Macrotask (setTimeout, I/O).
      </p>
    </div>
    <CodeBlock
      code={`console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// Output:
// Start
// End
// Promise
// Timeout`}
    />
  </Card>
);

const ThisBindingSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="purple">Core</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          5 Rules of 'this'
        </h3>
      </div>
    </div>
    <ul className="space-y-3 text-left">
      {[
        {
          rule: 'Default Binding',
          desc: 'Standalone function call -> global object (or undefined in strict mode).',
        },
        {
          rule: 'Implicit Binding',
          desc: "Object method call (obj.func()) -> 'this' is 'obj'.",
        },
        {
          rule: 'Explicit Binding',
          desc: "call, apply, bind -> manually specify 'this'.",
        },
        {
          rule: 'new Binding',
          desc: "Constructor call -> 'this' is the new instance.",
        },
        {
          rule: 'Lexical Binding',
          desc: "Arrow functions inherit 'this' from the parent scope.",
        },
      ].map((item, i) => (
        <li
          key={item.rule}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-600">
            {i + 1}
          </span>
          <div>
            <span className="font-semibold text-gray-900 block">
              {item.rule}
            </span>
            <span className="text-sm text-gray-500">{item.desc}</span>
          </div>
        </li>
      ))}
    </ul>
    <CodeBlock
      code={`const obj = {
  name: 'JS',
  // Implicit
  greet() { return this.name; },
  // Lexical (Arrow)
  delayGreet: () => { return this.name; } // undefined (window/global)
};`}
    />
  </Card>
);

const ScopeClosureSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="green">Scope</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">Closures</h3>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-left">
      A closure is a function that remembers its outer variables and can access
      them even when the outer function has finished executing.
    </p>
    <CodeBlock
      code={`function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`}
    />
  </Card>
);

const AsyncSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="orange">Async</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          Promise & Async/Await
        </h3>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.all</h4>
        <p className="text-xs text-orange-800">Fails if ANY element fails.</p>
      </div>
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.allSettled</h4>
        <p className="text-xs text-orange-800">
          Waits for ALL to finish, regardless of status.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.race</h4>
        <p className="text-xs text-orange-800">
          First settled (resolve OR reject) wins.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h4 className="font-bold text-orange-900 mb-1">Promise.any</h4>
        <p className="text-xs text-orange-800">First FULFILLED wins.</p>
      </div>
    </div>
  </Card>
);

const OptimizationSection = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4 text-left">
      <div>
        <Badge color="blue">Advanced</Badge>
        <h3 className="text-xl font-bold mt-2 text-gray-900">
          V8 Hidden Classes
        </h3>
      </div>
    </div>
    <p className="text-gray-600 mb-4 text-left">
      V8 optimizes object property access by creating "Hidden Classes" (Shapes).
      <strong>Always initialize properties in the exact same order</strong> to
      help the engine share these hidden classes (Monomorphism).
    </p>
    <CodeBlock
      code={`// Good (Same Shape)
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Bad (Different Shapes)
const p1 = { x: 1 };
p1.y = 2; // Shape transition`}
    />
  </Card>
);

// -- Main Component --

const tabs = ['all', 'runtime', 'core', 'async'] as const;
type Tab = (typeof tabs)[number];

export default function Week1Page() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const sections = [
    { id: 'runtime', component: <EventLoopSection /> },
    { id: 'core', component: <ThisBindingSection /> },
    { id: 'core', component: <ScopeClosureSection /> },
    { id: 'async', component: <AsyncSection /> },
    { id: 'runtime', component: <OptimizationSection /> },
  ];

  const filteredSections =
    activeTab === 'all' ? sections : sections.filter((s) => s.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F0F4F8] font-sans text-gray-900 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-3xl pt-12 pb-6 px-6 text-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
          Internal Mechanism
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Deep dive into the JavaScript Runtime, Execution Context, and Memory
          Model.
        </p>
      </header>

      {/* Filter / Controls */}
      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-gray-200 mb-8 flex gap-1">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Stream */}
      <main className="w-full max-w-2xl px-6 pb-20 space-y-6">
        {filteredSections.map((section, idx) => (
          <div
            key={section.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {section.component}
          </div>
        ))}
      </main>
    </div>
  );
}
