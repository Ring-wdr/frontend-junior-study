import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Radio, User, UserCheck, UserMinus } from 'lucide-react';
import { useState } from 'react';

interface Observer {
  id: number;
  name: string;
  notified: boolean;
}

export const ObserverVisualizer = () => {
  const [observers, setObservers] = useState<Observer[]>([
    { id: 1, name: 'User A', notified: false },
    { id: 2, name: 'User B', notified: false },
  ]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const addObserver = () => {
    const newId = Math.max(...observers.map((o) => o.id), 0) + 1;
    setObservers([
      ...observers,
      {
        id: newId,
        name: `User ${String.fromCharCode(65 + newId - 1)}`,
        notified: false,
      },
    ]);
  };

  const removeObserver = (id: number) => {
    setObservers(observers.filter((obs) => obs.id !== id));
  };

  const notify = () => {
    setIsBroadcasting(true);
    setObservers(observers.map((o) => ({ ...o, notified: true })));

    setTimeout(() => {
      setIsBroadcasting(false);
      setTimeout(() => {
        setObservers(observers.map((o) => ({ ...o, notified: false })));
      }, 1000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative min-h-[200px]">
        {/* Subject */}
        <div className="relative z-10">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            animate={
              isBroadcasting
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
            onClick={notify}
            disabled={isBroadcasting}
            className="w-24 h-24 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Radio
              className={`w-8 h-8 mb-2 ${isBroadcasting ? 'animate-pulse' : ''}`}
            />
            <span className="text-xs font-bold">Subject</span>
            <span className="text-[10px] opacity-80">Broadcast</span>
          </motion.button>

          {/* Signal Waves */}
          {isBroadcasting && (
            <>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: 0, scale: 3 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                />
              ))}
            </>
          )}
        </div>

        {/* Observers Grid */}
        <div className="flex flex-wrap gap-4 justify-center items-center max-w-sm">
          <AnimatePresence>
            {observers.map((obs) => (
              <motion.div
                key={obs.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`relative p-3 rounded-xl border-2 flex flex-col items-center min-w-[80px] transition-colors duration-300 ${
                  obs.notified
                    ? 'bg-green-50 border-green-400'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="relative">
                  <User
                    className={`w-8 h-8 ${obs.notified ? 'text-green-600' : 'text-gray-400'}`}
                  />
                  {obs.notified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <Bell className="w-3 h-3" />
                    </motion.div>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium text-gray-600">
                  {obs.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeObserver(obs.id)}
                  className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                  <UserMinus className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addObserver}
            className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            <UserCheck className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 text-center">
        The <strong>Subject</strong> maintains a list of observers and notifies
        them automatically of any state changes.
      </div>
    </div>
  );
};
