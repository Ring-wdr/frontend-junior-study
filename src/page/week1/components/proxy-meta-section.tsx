import { AnimatePresence, motion } from 'framer-motion';
import { Eye, ShieldAlert, Zap } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

export const ProxyMetaSection = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [targetObj, setTargetObj] = useState({
    message: 'Hello',
    secret: '123',
  });

  const handleAccess = (prop: 'message' | 'secret') => {
    // Simulate Proxy Trap
    const timestamp = new Date().toLocaleTimeString();

    if (prop === 'secret') {
      setLogs((prev) => [
        `[${timestamp}] 🛑 Trap Triggered → Blocked access to 'secret'`,
        ...prev,
      ]);
      return;
    }

    setLogs((prev) => [
      `[${timestamp}] 👁️ Trap Triggered → Reflect.get('${prop}')`,
      ...prev,
    ]);
  };

  const handleSet = () => {
    // Simulate Proxy Trap
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      `[${timestamp}] 📝 Trap Triggered → Reflect.set('message', 'Hi!')`,
      ...prev,
    ]);
    setTargetObj((prev) => ({ ...prev, message: 'Hi!' }));
  };

  const clearLogs = () => setLogs([]);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6 text-left">
        <div>
          <Badge color="indigo">Meta Programming</Badge>
          <h3 className="text-xl font-bold mt-2 text-gray-900">
            Proxy & Reflect
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Intercept and redefine fundamental operations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CodeBlock
            language="javascript"
            code={`const target = { 
  message: "${targetObj.message}", 
  secret: "***" 
};

const handler = {
  get(target, prop, receiver) {
    if (prop === 'secret') {
      console.warn("Blocked!");
      return null;
    }
    console.log(\`Accessed \${prop}\`);
    // Forward operation using Reflect
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
      console.log(\`Setting \${prop} = \${value}\`);
      // Forward operation using Reflect
      return Reflect.set(target, prop, value, receiver);
  }
};

const proxy = new Proxy(target, handler);`}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() => handleAccess('message')}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              <Eye className="w-4 h-4" /> Read 'message'
            </button>
            <button
              type="button"
              onClick={() => handleAccess('secret')}
              className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" /> Read 'secret'
            </button>
            <button
              type="button"
              onClick={handleSet}
              className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
            >
              <Zap className="w-4 h-4" /> Set 'message'
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 text-left border border-gray-800 flex flex-col h-full min-h-[200px]">
          <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-2">
            <span className="text-xs font-mono text-gray-400">Proxy Logs</span>
            <button
              type="button"
              onClick={clearLogs}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 font-mono text-xs max-h-[200px]">
            <AnimatePresence initial={false}>
              {logs.length === 0 && (
                <span className="text-gray-600 italic">
                  Interactions will appear here...
                </span>
              )}
              {logs.map((log, i) => (
                <motion.div
                  key={`${log}-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: specify log index
                    i
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'py-1 border-l-2 pl-2',
                    log.includes('Blocked')
                      ? 'text-red-400 border-red-500 bg-red-900/10'
                      : 'text-green-400 border-green-500 bg-green-900/10',
                  )}
                >
                  <span className="font-bold mr-2">{log.split('→')[0]}</span>
                  <span>{log.split('→')[1]}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Card>
  );
};
