import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../../../lib/utils';

const USER_DATA = [
  { field: 'Name', raw: 'Kim Manjoong', masked: 'K** *******' },
  { field: 'Email', raw: 'kim.manjoong@example.com', masked: 'k***@example.com' },
  { field: 'Phone', raw: '+82-10-1234-5678', masked: '+82-10-****-****' },
  { field: 'SSN', raw: '901215-1234567', masked: '******-*******' },
  { field: 'IP Address', raw: '192.168.1.42', masked: '192.168.x.x' },
  {
    field: 'Credit Card',
    raw: '4242-4242-4242-4242',
    masked: '****-****-****-4242',
  },
];

export const DataMaskingVisualizer = () => {
  const [isMasked, setIsMasked] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsMasked(!isMasked)}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all',
            isMasked
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-red-600 text-white hover:bg-red-700',
          )}
        >
          {isMasked ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          Masking: {isMasked ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="rounded-xl bg-gray-900 p-5 space-y-1">
        <p className="text-xs text-gray-500 font-mono mb-3">
          {'// user data object'}
        </p>
        {USER_DATA.map((item, index) => (
          <div
            key={item.field}
            className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
          >
            <span className="text-sm text-gray-400 font-mono">
              {item.field}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={isMasked ? 'masked' : 'raw'}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                {isMasked ? (
                  <>
                    <span className="text-sm font-mono text-green-400">
                      {item.masked}
                    </span>
                    <EyeOff className="w-3 h-3 text-green-500" />
                  </>
                ) : (
                  <>
                    <span className="text-sm font-mono text-red-400">
                      {item.raw}
                    </span>
                    <Eye className="w-3 h-3 text-red-500" />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isMasked ? 'safe' : 'warning'}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={cn(
            'flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium',
            isMasked
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200',
          )}
        >
          {isMasked ? (
            <>
              <ShieldCheck className="w-4 h-4" />
              Safe to send to monitoring service
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              WARNING: PII data exposed in raw form
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
