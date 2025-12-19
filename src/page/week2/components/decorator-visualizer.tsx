import { motion } from 'framer-motion';
import {
  Clock,
  Database,
  Play,
  RotateCcw,
  Shield,
  Terminal,
} from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type DecoratorType = 'auth' | 'logger' | 'cache';

export const DecoratorVisualizer = () => {
  const [decorators, setDecorators] = useState<DecoratorType[]>([]); // Order matters!
  const [isAnimating, setIsAnimating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [packetPosition, setPacketPosition] = useState(0); // 0 = outside, 1 = layer 1, 2 = layer 2...

  const toggleDecorator = (type: DecoratorType) => {
    if (decorators.includes(type)) {
      setDecorators(decorators.filter((d) => d !== type));
    } else {
      setDecorators([type, ...decorators]); // Add to outside (start of array is OUTER layer)
    }
  };

  const runRequest = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLogs([]);
    setPacketPosition(0);

    const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

    // Simulate the Chain
    // The packet travels inwards: index 0 -> index N -> Core

    // INBOUND PHASE
    for (let i = 0; i < decorators.length; i++) {
      setPacketPosition(i + 1);
      const type = decorators[i];
      await new Promise((r) => setTimeout(r, 600));

      if (type === 'auth') {
        addLog(`[@Auth] Checking Token...`);
        addLog(`[@Auth] Token Valid.`);
      } else if (type === 'logger') {
        addLog(
          `[@Logger] Request started at ${new Date().toLocaleTimeString()}`,
        );
      } else if (type === 'cache') {
        addLog(`[@Cache] Checking Cache...`);
        addLog(`[@Cache] Cache Miss. Forwarding...`);
      }
    }

    // CORE PHASE
    setPacketPosition(decorators.length + 1); // Center
    await new Promise((r) => setTimeout(r, 600));
    addLog(`[Service] Fetching Data from DB...`);
    await new Promise((r) => setTimeout(r, 600));
    addLog(`[Service] Data Found: { id: 1, name: "User" }`);

    // OUTBOUND PHASE
    for (let i = decorators.length - 1; i >= 0; i--) {
      setPacketPosition(i + 1);
      const type = decorators[i];
      await new Promise((r) => setTimeout(r, 600));

      if (type === 'logger') {
        addLog(`[@Logger] Request finished. Duration: 12ms`);
      }
    }

    setPacketPosition(0); // Back out
    setIsAnimating(false);
  };

  const generateCode = () => {
    let code = `// TypeScript / ES Decorators\n\n`;

    // Reverse for standard top-down decorators display
    const ordered = [...decorators].reverse();

    ordered.forEach((d) => {
      const name = d.charAt(0).toUpperCase() + d.slice(1);
      code += `@${name}() // Wraps the class\n`;
    });

    code += `class DataService {
  
  @Get('/users') // Method decorator
  fetchData() {
    return db.query("SELECT * FROM users");
  }

}`;

    return code;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Pipeline Configuration
              </h5>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all',
                    decorators.includes('auth')
                      ? 'bg-red-50 border-red-200'
                      : 'bg-white border-gray-200 hover:border-red-200',
                  )}
                  onClick={() => toggleDecorator('auth')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-md',
                        decorators.includes('auth')
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">@Auth</div>
                      <div className="text-xs text-gray-500">
                        Class Decorator
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border',
                      decorators.includes('auth')
                        ? 'bg-red-500 border-red-500'
                        : 'border-gray-300',
                    )}
                  />
                </button>

                <button
                  type="button"
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all',
                    decorators.includes('logger')
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200 hover:border-blue-200',
                  )}
                  onClick={() => toggleDecorator('logger')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-md',
                        decorators.includes('logger')
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">@Logger</div>
                      <div className="text-xs text-gray-500">
                        Method/Class Decorator
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border',
                      decorators.includes('logger')
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300',
                    )}
                  />
                </button>

                <button
                  type="button"
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all',
                    decorators.includes('cache')
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-white border-gray-200 hover:border-amber-200',
                  )}
                  onClick={() => toggleDecorator('cache')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-md',
                        decorators.includes('cache')
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">@Cache</div>
                      <div className="text-xs text-gray-500">
                        Method Decorator
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border',
                      decorators.includes('cache')
                        ? 'bg-amber-500 border-amber-500'
                        : 'border-gray-300',
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={runRequest}
                disabled={isAnimating}
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold shadow-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnimating ? (
                  <RotateCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isAnimating ? 'Processing Request...' : 'Run Request'}
              </button>

              <div className="bg-gray-900 rounded-lg p-3 min-h-[100px]">
                <div className="text-xs font-mono text-gray-500 mb-2 border-b border-gray-800 pb-1">
                  System Logs
                </div>
                <div className="space-y-1 font-mono text-xs">
                  {logs.length === 0 && (
                    <span className="text-gray-600">
                      Waiting for request...
                    </span>
                  )}

                  {logs.map((log, i) => (
                    <motion.div
                      key={`${i}-${log}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400"
                    >
                      {'>'} {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="relative flex items-center justify-center min-h-[400px] bg-slate-50 rounded-xl border border-gray-200 overflow-hidden">
            <div
              className="absolute inset-0 grid grid-cols-[20px_20px] opacity-10 pointer-events-none"
              style={{
                backgroundSize: '20px 20px',
                backgroundImage:
                  'radial-gradient(circle, #000000 1px, transparent 1px)',
              }}
            ></div>

            {/* The Nested Structure */}
            <div className="relative flex items-center justify-center">
              {/* Render Decorators as Nested Boxes */}
              {/* We need to render from OUTSIDE (decorators[0]) to INSIDE */}
              {/* Actually, it's easier to render recursively or just stack them absolute with decreasing size/z-index? */}
              {/* CSS Flex/Grid is best. Core in middle, wrapped by others. */}

              {/* Let's build a recursive component for the visual wrappers or just iterate carefully */}

              <div className="relative z-10 flex items-center justify-center">
                {/* This function recursively renders the wrappers */}
                {(() => {
                  const renderLayer = (index: number): React.ReactNode => {
                    if (index >= decorators.length) {
                      // Core
                      return (
                        <div
                          className={cn(
                            'relative w-32 h-32 bg-gray-900 rounded-xl flex flex-col items-center justify-center shadow-xl transition-all duration-500',
                            packetPosition === decorators.length + 1 &&
                              'ring-4 ring-green-400 scale-105',
                          )}
                        >
                          <Database className="w-10 h-10 text-white mb-2" />
                          <span className="text-xs font-bold text-gray-300">
                            CORE DB
                          </span>
                          {packetPosition === decorators.length + 1 && (
                            <motion.div
                              layoutId="packet"
                              className="absolute w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                            />
                          )}
                        </div>
                      );
                    }

                    const type = decorators[index];
                    const isActive = packetPosition === index + 1;

                    // Colors
                    let colorClass = 'border-gray-300 bg-white';
                    if (type === 'auth')
                      colorClass = 'border-red-300 bg-red-50/50';
                    if (type === 'logger')
                      colorClass = 'border-blue-300 bg-blue-50/50';
                    if (type === 'cache')
                      colorClass = 'border-amber-300 bg-amber-50/50';

                    if (isActive) {
                      if (type === 'auth')
                        colorClass =
                          'border-red-500 bg-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
                      if (type === 'logger')
                        colorClass =
                          'border-blue-500 bg-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
                      if (type === 'cache')
                        colorClass =
                          'border-amber-500 bg-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
                    }

                    return (
                      <div
                        className={cn(
                          'p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center relative gap-2',
                          colorClass,
                        )}
                      >
                        <div className="absolute top-2 left-4 text-[10px] font-bold uppercase tracking-wider opacity-70">
                          @{type}
                        </div>

                        {/* Packet at this layer */}
                        {isActive && (
                          <motion.div
                            layoutId="packet"
                            className="absolute top-2 right-4 w-3 h-3 bg-gray-800 rounded-full"
                          />
                        )}

                        {renderLayer(index + 1)}
                      </div>
                    );
                  };

                  return renderLayer(0);
                })()}
              </div>

              {/* Code Overlay */}
            </div>
          </div>
        </div>

        {/* Separated Code Section */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="text-xs font-mono text-gray-500 mb-2 border-b border-gray-800 pb-1">
            Generated Code
          </div>
          <CodeBlock code={generateCode()} className="text-xs" />
        </div>
      </div>
    </div>
  );
};
