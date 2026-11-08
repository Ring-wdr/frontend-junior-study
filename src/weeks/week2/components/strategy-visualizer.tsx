'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Bitcoin, CreditCard, Wallet } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type StrategyType = 'credit-card' | 'paypal' | 'crypto';

export const StrategyVisualizer = () => {
  const { t } = useTranslation('week2');
  const [strategy, setStrategy] = useState<StrategyType>('credit-card');
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      for (const timer of timersRef.current) clearTimeout(timer);
    },
    [],
  );

  const pay = () => {
    setProcessing(true);
    setStatus('idle');
    timersRef.current.push(
      setTimeout(() => {
        setProcessing(false);
        setStatus('success');
        timersRef.current.push(setTimeout(() => setStatus('idle'), 2000));
      }, 1500),
    );
  };

  const generateCode = () => {
    let strategyClass = '';
    if (strategy === 'credit-card') strategyClass = 'CreditCardStrategy';
    if (strategy === 'paypal') strategyClass = 'PayPalStrategy';
    if (strategy === 'crypto') strategyClass = 'CryptoStrategy';

    return `const context = new PaymentContext();
context.setStrategy(new ${strategyClass}());

// Execute generic payment
context.pay(100);`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setStrategy('credit-card')}
          className={cn(
            'p-3 rounded-lg border-2 flex flex-col items-center gap-2 text-xs font-medium transition-colors hover:bg-gray-50',
            strategy === 'credit-card'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200',
          )}
        >
          <CreditCard className="w-5 h-5" />{' '}
          {t('behavioral.strategy.visualizer.creditCard')}
        </button>
        <button
          type="button"
          onClick={() => setStrategy('paypal')}
          className={cn(
            'p-3 rounded-lg border-2 flex flex-col items-center gap-2 text-xs font-medium transition-colors hover:bg-gray-50',
            strategy === 'paypal'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200',
          )}
        >
          <Wallet className="w-5 h-5" /> PayPal
        </button>
        <button
          type="button"
          onClick={() => setStrategy('crypto')}
          className={cn(
            'p-3 rounded-lg border-2 flex flex-col items-center gap-2 text-xs font-medium transition-colors hover:bg-gray-50',
            strategy === 'crypto'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200',
          )}
        >
          <Bitcoin className="w-5 h-5" />{' '}
          {t('behavioral.strategy.visualizer.crypto')}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-100 rounded-xl p-4 border border-gray-200">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 min-w-[120px] text-center">
          <div className="text-2xl font-bold text-gray-800">$100.00</div>
          <div className="text-xs text-gray-400">
            {t('behavioral.strategy.visualizer.totalAmount')}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center min-h-12 justify-center">
          <AnimatePresence mode="wait">
            {processing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                <span className="text-xs text-gray-500 font-mono">
                  {t('behavioral.strategy.visualizer.processing')}
                </span>
              </motion.div>
            ) : status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-2 text-green-600"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-xs font-bold">
                  {t('behavioral.strategy.visualizer.paid')}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="arrow"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="rotate-90 text-gray-300 md:rotate-0"
              >
                ➜
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300',
            strategy === 'credit-card'
              ? 'bg-amber-100 text-amber-600'
              : strategy === 'paypal'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-orange-100 text-orange-600',
          )}
        >
          {strategy === 'credit-card' && <CreditCard className="w-6 h-6" />}
          {strategy === 'paypal' && <Wallet className="w-6 h-6" />}
          {strategy === 'crypto' && <Bitcoin className="w-6 h-6" />}
        </div>

        <button
          type="button"
          onClick={pay}
          disabled={processing || status === 'success'}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          {t('behavioral.strategy.visualizer.pay')}
        </button>
      </div>

      <CodeBlock code={generateCode()} className="text-xs" />
    </div>
  );
};
