import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const ThisBindingSection = () => (
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
