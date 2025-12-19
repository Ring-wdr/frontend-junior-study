import { motion } from 'framer-motion';
import { Film, Lightbulb, Moon, Thermometer, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

export const FacadeVisualizer = () => {
  const [lights, setLights] = useState(100);
  const [temp, setTemp] = useState(24);
  const [volume, setVolume] = useState(0);

  const activateMovieMode = () => {
    setLights(20);
    setTemp(22);
    setVolume(50);
  };

  const activateSleepMode = () => {
    setLights(0);
    setTemp(20);
    setVolume(0);
  };

  const generateCode = () => {
    return `const smartHome = new SmartHomeFacade();

// One call triggers complex subsystem logic
smartHome.movieMode(); 
// -> Lights dim to 20%
// -> AC set to 22°C
// -> TV Volume up to 50%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={activateMovieMode}
          className="flex-1 p-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Film className="w-4 h-4" /> Movie Mode
        </button>
        <button
          type="button"
          onClick={activateSleepMode}
          className="flex-1 p-3 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-900 active:scale-95 transition-all"
        >
          <Moon className="w-4 h-4" /> Sleep Mode
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        {/* Lights */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500',
              lights > 0
                ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]'
                : 'bg-gray-300',
            )}
          >
            <Lightbulb
              className={cn(
                'w-6 h-6 transition-colors',
                lights > 0 ? 'text-white' : 'text-gray-500',
              )}
            />
          </div>
          <div className="text-xs font-semibold text-gray-600">
            Lights: {lights}%
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-400"
              animate={{ width: `${lights}%` }}
            />
          </div>
        </div>

        {/* Temp */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Thermometer className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-gray-600">
            AC: {temp}°C
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: `${(temp / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Audio */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Volume2 className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-gray-600">
            Vol: {volume}%
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              animate={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3">
        <CodeBlock code={generateCode()} className="text-xs" />
      </div>
    </div>
  );
};
