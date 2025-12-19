import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type Step = 'bread' | 'filling' | 'sauce' | 'complete';
type Ingredient = string;

export const CurryingVisualizer = () => {
  const [step, setStep] = useState<Step>('bread');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = (ing: Ingredient) => {
    setIngredients((prev) => [...prev, ing]);
    if (step === 'bread') setStep('filling');
    else if (step === 'filling') setStep('sauce');
    else if (step === 'sauce') setStep('complete');
  };

  const reset = () => {
    setStep('bread');
    setIngredients([]);
  };

  const generateCode = () => {
    // Step 1
    let code = `const makeSandwich = (bread) => (filling) => (sauce) => {
  return \`\${bread} sandwich with \${filling} and \${sauce}\`;
};`;

    // Execution
    code += `\n\n// Execution Step-by-Step:`;

    if (step === 'bread') {
      code += `\n// Waiting for bread...`;
    } else if (step === 'filling') {
      code += `\nconst step1 = makeSandwich("${ingredients[0]}");`;
      code += `\n// Returns: Function(filling)`;
    } else if (step === 'sauce') {
      code += `\nconst step1 = makeSandwich("${ingredients[0]}");`;
      code += `\nconst step2 = step1("${ingredients[1]}");`;
      code += `\n// Returns: Function(sauce)`;
    } else if (step === 'complete') {
      code += `\nconst step1 = makeSandwich("${ingredients[0]}");`;
      code += `\nconst step2 = step1("${ingredients[1]}");`;
      code += `\nconst result = step2("${ingredients[2]}");`;
      code += `\n// Returns: "Result String"`;
    }

    return code;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-center">
        {/* Visual Pipeline */}
        <div className="flex items-center gap-2 w-full justify-center text-sm font-mono text-gray-500 overflow-x-auto p-2">
          <div
            className={cn(
              'px-3 py-1 rounded transition-colors',
              step === 'bread'
                ? 'bg-orange-100 text-orange-700 font-bold border-2 border-orange-300'
                : 'bg-gray-100',
            )}
          >
            (bread)
          </div>
          <span>➜</span>
          <div
            className={cn(
              'px-3 py-1 rounded transition-colors',
              step === 'filling'
                ? 'bg-orange-100 text-orange-700 font-bold border-2 border-orange-300'
                : 'bg-gray-100',
            )}
          >
            (filling)
          </div>
          <span>➜</span>
          <div
            className={cn(
              'px-3 py-1 rounded transition-colors',
              step === 'sauce'
                ? 'bg-orange-100 text-orange-700 font-bold border-2 border-orange-300'
                : 'bg-gray-100',
            )}
          >
            (sauce)
          </div>
        </div>

        {/* Selection Area */}
        <div className="min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 'bread' && (
              <motion.div
                key="bread"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4"
              >
                <button
                  type="button"
                  onClick={() => addIngredient('Wheat')}
                  className="p-4 bg-amber-100 border-2 border-amber-300 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  🍞 Wheat
                </button>
                <button
                  type="button"
                  onClick={() => addIngredient('White')}
                  className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  🥖 White
                </button>
              </motion.div>
            )}
            {step === 'filling' && (
              <motion.div
                key="filling"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4"
              >
                <button
                  type="button"
                  onClick={() => addIngredient('Ham')}
                  className="p-4 bg-red-100 border-2 border-red-300 rounded-lg hover:bg-red-200 transition-colors"
                >
                  🍖 Ham
                </button>
                <button
                  type="button"
                  onClick={() => addIngredient('Veggie')}
                  className="p-4 bg-green-100 border-2 border-green-300 rounded-lg hover:bg-green-200 transition-colors"
                >
                  🥗 Veggie
                </button>
              </motion.div>
            )}
            {step === 'sauce' && (
              <motion.div
                key="sauce"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4"
              >
                <button
                  type="button"
                  onClick={() => addIngredient('Mayo')}
                  className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  🧂 Mayo
                </button>
                <button
                  type="button"
                  onClick={() => addIngredient('Mustard')}
                  className="p-4 bg-yellow-200 border-2 border-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  🟡 Mustard
                </button>
              </motion.div>
            )}
            {step === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-xl font-bold text-gray-800 bg-white p-6 rounded-xl shadow-lg border-b-4 border-orange-400 flex flex-col items-center">
                  <span className="text-4xl mb-2">🥪</span>
                  {ingredients[0]} + {ingredients[1]} + {ingredients[2]}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Make another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3">
        <CodeBlock code={generateCode()} className="text-xs" />
      </div>
    </div>
  );
};
