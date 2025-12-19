import { AnimatePresence, motion } from 'framer-motion';
import { Lock, ShieldAlert, User, UserCog } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type UserRole = 'guest' | 'admin';

export const ProxyVisualizer = () => {
  const [role, setRole] = useState<UserRole>('guest');
  const [accessState, setAccessState] = useState<'idle' | 'success' | 'denied'>(
    'idle',
  );

  const tryAccess = () => {
    setAccessState('idle');
    // Simulate slight network delay
    setTimeout(() => {
      if (role === 'admin') {
        setAccessState('success');
      } else {
        setAccessState('denied');
      }
    }, 300);
  };

  const generateCode = () => {
    return `const proxy = {
  accessVault(user) {
    if (user.role !== 'admin') {
      throw new Error("Access Denied");
    }
    return realVault.open();
  }
};

// Current User: ${role.toUpperCase()}
proxy.accessVault(currentUser);
${accessState === 'denied' ? '// Error: Access Denied' : accessState === 'success' ? '// Success: Vault Opened' : ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => {
            setRole('guest');
            setAccessState('idle');
          }}
          className={cn(
            'flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors',
            role === 'guest'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white hover:bg-gray-50',
          )}
        >
          <User className="w-4 h-4" /> Guest User
        </button>
        <button
          type="button"
          onClick={() => {
            setRole('admin');
            setAccessState('idle');
          }}
          className={cn(
            'flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors',
            role === 'admin'
              ? 'border-purple-500 bg-purple-50 text-purple-700'
              : 'border-gray-200 bg-white hover:bg-gray-50',
          )}
        >
          <UserCog className="w-4 h-4" /> Admin User
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 w-full relative h-[180px] bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
          <div className="absolute top-4 left-4 text-xs font-mono text-gray-400">
            PROXY SERVER
          </div>

          {/* Vault */}
          <div
            className={cn(
              'w-24 h-24 rounded-xl flex items-center justify-center transition-all duration-500',
              accessState === 'success'
                ? 'bg-green-100 border-4 border-green-500'
                : accessState === 'denied'
                  ? 'bg-red-100 border-4 border-red-500'
                  : 'bg-gray-200 border-4 border-gray-400',
            )}
          >
            <AnimatePresence mode="wait">
              {accessState === 'success' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="unlock"
                >
                  <div className="text-4xl">💰</div>
                </motion.div>
              ) : accessState === 'denied' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="lock"
                >
                  <ShieldAlert className="w-10 h-10 text-red-500" />
                </motion.div>
              ) : (
                <Lock className="w-10 h-10 text-gray-500" />
              )}
            </AnimatePresence>
          </div>

          {/* Connection Line */}
          <AnimatePresence>
            {accessState !== 'idle' && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 60, opacity: 1 }}
                className={cn(
                  'absolute left-1/2 ml-12 h-1 top-1/2 -mt-0.5 rounded-full',
                  accessState === 'success' ? 'bg-green-500' : 'bg-red-500',
                )}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <button
            type="button"
            onClick={tryAccess}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex flex-col items-center gap-1 min-w-[120px]"
          >
            <span>Access Vault</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3">
        <CodeBlock code={generateCode()} className="text-xs" />
      </div>
    </div>
  );
};
