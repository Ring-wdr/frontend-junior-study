import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';

export const ScopeClosureSection = () => (
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
