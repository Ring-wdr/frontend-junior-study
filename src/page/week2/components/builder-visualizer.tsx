import { AnimatePresence, motion } from 'framer-motion';
import { Check, Hammer, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type RobotPart = 'head' | 'arms' | 'legs' | 'wheels';
type RobotColor = 'gray' | 'red' | 'blue';

interface RobotState {
  parts: Set<RobotPart>;
  color: RobotColor;
  isBuilt: boolean;
}

export const BuilderVisualizer = () => {
  const [robot, setRobot] = useState<RobotState>({
    parts: new Set(),
    color: 'gray',
    isBuilt: false,
  });

  const addPart = (part: RobotPart) => {
    if (robot.isBuilt) return;
    setRobot((prev) => {
      const newParts = new Set(prev.parts);
      newParts.add(part);
      return { ...prev, parts: newParts };
    });
  };

  const setColor = (color: RobotColor) => {
    if (robot.isBuilt) return;
    setRobot((prev) => ({ ...prev, color }));
  };

  const build = () => {
    setRobot((prev) => ({ ...prev, isBuilt: true }));
  };

  const reset = () => {
    setRobot({
      parts: new Set(),
      color: 'gray',
      isBuilt: false,
    });
  };

  const generateCode = () => {
    let code = `const robot = new RobotBuilder()`;
    if (robot.parts.has('head')) code += `\n  .addHead()`;
    if (robot.parts.has('arms')) code += `\n  .addArms()`;
    if (robot.parts.has('legs') && !robot.parts.has('wheels'))
      code += `\n  .addLegs()`;
    if (robot.parts.has('wheels')) code += `\n  .addWheels()`; // Mutually exclusive for demo ideally, but let's allow overlapping
    if (robot.color !== 'gray') code += `\n  .paint('${robot.color}')`;
    if (robot.isBuilt) code += `\n  .build();`;
    return code;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Controls */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addPart('head')}
              disabled={robot.isBuilt || robot.parts.has('head')}
              className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <div className="w-4 h-4 rounded-full bg-gray-400" /> Add Head
            </button>
            <button
              type="button"
              onClick={() => addPart('arms')}
              disabled={robot.isBuilt || robot.parts.has('arms')}
              className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <div className="w-8 h-1 bg-gray-400 rounded" /> Add Arms
            </button>
            <button
              type="button"
              onClick={() => addPart('legs')}
              disabled={
                robot.isBuilt ||
                robot.parts.has('legs') ||
                robot.parts.has('wheels')
              }
              className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <div className="w-1 h-6 bg-gray-400 rounded mx-1" />
              <div className="w-1 h-6 bg-gray-400 rounded mx-1" /> Legs
            </button>
            <button
              type="button"
              onClick={() => addPart('wheels')}
              disabled={
                robot.isBuilt ||
                robot.parts.has('wheels') ||
                robot.parts.has('legs')
              }
              className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <div className="w-4 h-4 rounded-full border-2 border-gray-400" />{' '}
              Wheels
            </button>
          </div>

          <div className="flex gap-2 justify-center py-2 bg-gray-50 rounded-lg">
            <button
              type="button"
              onClick={() => setColor('red')}
              disabled={robot.isBuilt}
              className={cn(
                'w-8 h-8 rounded-full bg-red-500 border-2 transition-all hover:scale-110',
                robot.color === 'red'
                  ? 'border-black scale-110'
                  : 'border-transparent opacity-80',
              )}
            />
            <button
              type="button"
              onClick={() => setColor('blue')}
              disabled={robot.isBuilt}
              className={cn(
                'w-8 h-8 rounded-full bg-blue-500 border-2 transition-all hover:scale-110',
                robot.color === 'blue'
                  ? 'border-black scale-110'
                  : 'border-transparent opacity-80',
              )}
            />
            <button
              type="button"
              onClick={() => setColor('gray')}
              disabled={robot.isBuilt}
              className={cn(
                'w-8 h-8 rounded-full bg-gray-400 border-2 transition-all hover:scale-110',
                robot.color === 'gray'
                  ? 'border-black scale-110'
                  : 'border-transparent opacity-80',
              )}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={build}
              disabled={robot.isBuilt || robot.parts.size === 0}
              className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <Hammer className="w-4 h-4" /> Build
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 overflow-hidden">
            <CodeBlock code={generateCode()} className="text-xs" />
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex-1 min-h-[300px] bg-gray-100 rounded-xl border border-gray-200 relative flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 grid grid-cols-[20px_20px] opacity-20 pointer-events-none"
            style={{
              backgroundSize: '20px 20px',
              backgroundImage:
                'radial-gradient(circle, #000000 1px, transparent 1px)',
            }}
          ></div>

          <AnimatePresence>
            {robot.isBuilt && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> BUILT
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative w-40 h-60 flex flex-col items-center justify-center">
            {/* Body (Always present roughly) */}
            <motion.div
              layout
              className={cn(
                'w-24 h-32 rounded-xl border-2 border-gray-700 flex items-center justify-center z-10 transition-colors duration-500',
                robot.color === 'red'
                  ? 'bg-red-400'
                  : robot.color === 'blue'
                    ? 'bg-blue-400'
                    : 'bg-gray-300',
              )}
            >
              <div className="text-[10px] font-mono opacity-50">CHASSIS</div>
            </motion.div>

            {/* Head */}
            <AnimatePresence>
              {robot.parts.has('head') && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -45, opacity: 1 }} // Relative to body center roughly
                  exit={{ y: 0, opacity: 0 }}
                  className={cn(
                    'absolute w-16 h-16 rounded-xl border-2 border-gray-800 z-20 transition-colors duration-500 flex items-center justify-center',
                    robot.color === 'red'
                      ? 'bg-red-300'
                      : robot.color === 'blue'
                        ? 'bg-blue-300'
                        : 'bg-gray-200',
                  )}
                  style={{ top: '50%', marginTop: -16 }} // Centering adjustments
                >
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Arms */}
            <AnimatePresence>
              {robot.parts.has('arms') && (
                <>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: -35, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    className={cn(
                      'absolute left-1/2 w-8 h-24 rounded-full border-2 border-gray-700 top-1/2 -mt-12 transition-colors duration-500 origin-top-right',
                      robot.color === 'red'
                        ? 'bg-red-400'
                        : robot.color === 'blue'
                          ? 'bg-blue-400'
                          : 'bg-gray-300',
                    )}
                  />
                  <motion.div
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 35, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    className={cn(
                      'absolute left-1/2 w-8 h-24 rounded-full border-2 border-gray-700 top-1/2 -mt-12 transition-colors duration-500 origin-top-left',
                      robot.color === 'red'
                        ? 'bg-red-400'
                        : robot.color === 'blue'
                          ? 'bg-blue-400'
                          : 'bg-gray-300',
                    )}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Legs or Wheels */}
            <AnimatePresence>
              {robot.parts.has('legs') && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 40, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 flex gap-4"
                >
                  <div
                    className={cn(
                      'w-6 h-20 rounded-b-lg border-2 border-gray-700 transition-colors duration-500',
                      robot.color === 'red'
                        ? 'bg-red-500'
                        : robot.color === 'blue'
                          ? 'bg-blue-500'
                          : 'bg-gray-400',
                    )}
                  />
                  <div
                    className={cn(
                      'w-6 h-20 rounded-b-lg border-2 border-gray-700 transition-colors duration-500',
                      robot.color === 'red'
                        ? 'bg-red-500'
                        : robot.color === 'blue'
                          ? 'bg-blue-500'
                          : 'bg-gray-400',
                    )}
                  />
                </motion.div>
              )}
              {robot.parts.has('wheels') && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 40, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 flex gap-1" // Tracks
                >
                  <div className="w-32 h-12 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-around px-2">
                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-gray-300 animate-spin-slow" />
                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-gray-300 animate-spin-slow" />
                    <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-gray-300 animate-spin-slow" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
