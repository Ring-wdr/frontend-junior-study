import { AnimatePresence, motion } from 'framer-motion';
import { Power, Radio, Tv, Volume1, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

// Implementor Interface (Visual connection)
type DeviceType = 'tv' | 'radio';

// Abstraction Interface
type RemoteType = 'basic' | 'advanced';

export const BridgeVisualizer = () => {
  const [device, setDevice] = useState<DeviceType>('tv');
  const [remote, setRemote] = useState<RemoteType>('basic');

  // Device State
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState(20);

  const togglePower = () => setIsOn(!isOn);
  const volumeDown = () => isOn && setVolume(Math.max(0, volume - 10));
  const volumeUp = () => isOn && setVolume(Math.min(100, volume + 10));
  const mute = () => isOn && setVolume(0);

  const generateCode = () => {
    const deviceClass = device === 'tv' ? 'Tv' : 'Radio';
    const remoteClass = remote === 'basic' ? 'Remote' : 'AdvancedRemote';

    return `const device = new ${deviceClass}();
const remote = new ${remoteClass}(device);

remote.togglePower(); // Works on both
${remote === 'advanced' ? 'remote.mute(); // Advanced feature' : '// Basic remote has limited features'}`;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Abstraction (Remote)
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRemote('basic')}
              className={cn(
                'flex-1 py-2 px-3 rounded border text-xs font-medium transition-colors',
                remote === 'basic'
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50',
              )}
            >
              Basic Remote
            </button>
            <button
              type="button"
              onClick={() => setRemote('advanced')}
              className={cn(
                'flex-1 py-2 px-3 rounded border text-xs font-medium transition-colors',
                remote === 'advanced'
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50',
              )}
            >
              Advanced Remote
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Implementation (Device)
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDevice('tv')}
              className={cn(
                'flex-1 py-2 px-3 rounded border text-xs font-medium transition-colors',
                device === 'tv'
                  ? 'bg-rose-100 border-rose-500 text-rose-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50',
              )}
            >
              TV
            </button>
            <button
              type="button"
              onClick={() => setDevice('radio')}
              className={cn(
                'flex-1 py-2 px-3 rounded border text-xs font-medium transition-colors',
                device === 'radio'
                  ? 'bg-rose-100 border-rose-500 text-rose-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50',
              )}
            >
              Radio
            </button>
          </div>
        </div>
      </div>

      {/* Visualizer Area */}
      <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-100 p-6 rounded-xl border border-gray-200">
        {/* Remote Control (Abstraction) */}
        <div className="w-32 bg-gray-800 rounded-2xl p-4 shadow-xl flex flex-col gap-4 items-center border border-gray-700">
          <div className="text-[10px] text-gray-400 font-mono tracking-widest text-center mb-2">
            REMOTE
          </div>
          <button
            type="button"
            onClick={togglePower}
            className="w-12 h-12 rounded-full bg-red-600 shadow-lg active:scale-95 transition-transform flex items-center justify-center text-white"
          >
            <Power className="w-5 h-5" />
          </button>

          <div className="flex gap-2 w-full justify-between">
            <button
              type="button"
              onClick={volumeDown}
              className="bg-gray-700 flex-1 py-3 rounded-lg flex items-center justify-center active:bg-gray-600 text-white"
            >
              <Volume1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={volumeUp}
              className="bg-gray-700 flex-1 py-3 rounded-lg flex items-center justify-center active:bg-gray-600 text-white"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence>
            {remote === 'advanced' && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                type="button"
                onClick={mute}
                className="w-full py-2 bg-yellow-600 text-[10px] font-bold text-white rounded uppercase tracking-wider overflow-hidden"
              >
                Mute
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Connection Line with Animated Signal */}
        <div className="flex-1 h-1 bg-gray-300 relative rounded-full hidden md:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 px-2 text-[10px] text-gray-500 whitespace-nowrap">
            Bridge Pattern
          </div>
        </div>

        {/* Device (Implementation) */}
        <div
          className={cn(
            'w-64 h-40 bg-black rounded-xl border-8 shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-500',
            device === 'tv'
              ? 'border-gray-800 rounded-xl'
              : 'border-amber-900 rounded-lg bg-amber-950 aspect-video h-auto py-8',
          )}
        >
          {isOn ? (
            <div className="text-center w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white mb-2"
              >
                {device === 'tv' ? (
                  <Tv className="w-12 h-12 mx-auto" />
                ) : (
                  <Radio className="w-12 h-12 mx-auto" />
                )}
              </motion.div>
              <div className="text-xs text-gray-400 font-mono mb-2">
                {device === 'tv' ? 'CHANNEL 1' : 'FM 104.5'}
              </div>
              <div className="w-1/2 mx-auto h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    'h-full',
                    device === 'tv' ? 'bg-blue-500' : 'bg-amber-500',
                  )}
                  animate={{ width: `${volume}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-red-900 shadow-[0_0_10px_red]" />
          )}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3">
        <CodeBlock code={generateCode()} className="text-xs" />
      </div>
    </div>
  );
};
