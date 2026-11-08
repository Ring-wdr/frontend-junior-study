'use client';

import { CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type Message = {
  id: number;
  text: string;
  status: 'sending' | 'sent' | 'error';
};

const sendMessageToServer = async (text: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, 2000);
  });
};

export const React19Visualizer = () => {
  const { t } = useTranslation('week5');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, setIsPending] = useState(false);

  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

  const handleSendStandard = async () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');
    setIsPending(true);

    await sendMessageToServer(text);

    setMessages((prev) => [...prev, { id: Date.now(), text, status: 'sent' }]);
    setIsPending(false);
  };

  const handleSendOptimistic = async () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');

    const tempId = Date.now();
    const optimisticMsg: Message = { id: tempId, text, status: 'sending' };

    setOptimisticMessages((prev) => [...prev, optimisticMsg]);

    await sendMessageToServer(text);

    setOptimisticMessages((prev) => prev.filter((m) => m.id !== tempId));
    setMessages((prev) => [...prev, { id: tempId, text, status: 'sent' }]);
  };

  const displayMessages = [...messages, ...optimisticMessages].sort(
    (a, b) => a.id - b.id,
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 my-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-500">
              {t('react19.visualizer.featuresTitle')}
            </span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {t('react19.visualizer.featuresSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="border rounded-xl overflow-hidden bg-gray-50 flex flex-col h-[440px] md:h-[500px] min-w-0">
          <div className="bg-white p-3 border-b">
            <h4 className="text-xs font-bold uppercase text-gray-500">
              {t('react19.visualizer.demo1')}
            </h4>
          </div>

          <div className="bg-white p-3 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              {t('react19.visualizer.chatPreview')}
            </span>
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setOptimisticMessages([]);
              }}
              className="text-xs text-red-500 hover:underline"
            >
              {t('react19.visualizer.clear')}
            </button>
          </div>

          <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto overflow-x-hidden min-h-0">
            {displayMessages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-10 italic">
                {t('react19.visualizer.noMessages')}
              </div>
            )}
            {displayMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ originX: 1 }}
                className={cn(
                  'max-w-[80%] w-fit p-3 rounded-2xl text-sm break-words transition-colors duration-200',
                  msg.status === 'sending'
                    ? 'bg-blue-100 text-blue-800 ml-auto rounded-tr-sm border-2 border-blue-200 border-dashed opacity-80'
                    : 'bg-blue-600 text-white ml-auto rounded-tr-sm shadow-sm',
                )}
              >
                <div className="flex items-center gap-2">
                  {msg.status === 'sending' && (
                    <Clock className="w-3 h-3 animate-pulse" />
                  )}
                  {msg.status === 'sent' && (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {msg.text}
                </div>
                {msg.status === 'sending' && (
                  <div className="text-[10px] opacity-70 mt-1 text-right">
                    {t('react19.visualizer.sending')}
                  </div>
                )}
              </motion.div>
            ))}
            {isPending && (
              <div className="flex justify-center py-4">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t space-y-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('react19.visualizer.typeMessage')}
              className="w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === 'Enter') handleSendOptimistic();
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleSendStandard}
                disabled={isPending || !inputValue}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {t('react19.visualizer.standardSend')}
              </button>
              <button
                type="button"
                onClick={handleSendOptimistic}
                disabled={!inputValue}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                <ZapIcon className="w-3 h-3" />
                {t('react19.visualizer.optimisticSend')}
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden bg-gray-50 flex flex-col md:h-[500px] min-w-0">
          <div className="bg-white p-3 border-b">
            <h4 className="text-xs font-bold uppercase text-gray-500">
              {t('react19.visualizer.demo2')}
            </h4>
          </div>

          <CacheDemo />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            {t('react19.visualizer.patternUseOptimistic')}
          </h4>
          <CodeBlock
            code={`const [optimisticMsgs, addMsg] = 
  useOptimistic(msgs, (state, newMsg) => [
      ...state, { text: newMsg, sending: true }
  ]);

// In Server Action
async function send(data) {
    addMsg(data.get('msg')); // Instant update
    await db.save(data.get('msg'));
}`}
            className="text-xs"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            {t('react19.visualizer.patternUseCache')}
          </h4>
          <CodeBlock
            code={`import { unstable_cacheLife as cacheLife } from 'next/cache';

async function getProduct(id) {
  'use cache'; // Opt-in directive
  cacheLife('hours'); // Profile-based config
  
  return db.product.findUnique({ id });
}`}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

const CacheDemo = () => {
  const { t } = useTranslation('week5');
  const [freshness, setFreshness] = useState<'stale' | 'fresh'>('stale');
  const [strategy, setStrategy] = useState<'default' | 'fast' | 'dynamic'>(
    'default',
  );
  const staleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (staleTimer.current) clearTimeout(staleTimer.current);
    },
    [],
  );

  return (
    <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center space-y-5">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div
          className={cn(
            'absolute inset-0 rounded-full border-4 opacity-20',
            freshness === 'fresh' ? 'border-green-500' : 'border-gray-400',
          )}
        />
        <div
          className={cn(
            'absolute inset-0 rounded-full border-4 border-t-transparent',
            freshness === 'fresh' ? 'border-green-500' : 'border-gray-400',
            freshness === 'fresh'
              ? 'animate-[spin_3s_linear_infinite]'
              : 'animate-none',
          )}
        />
        <div className="text-center">
          <div
            className={cn(
              'text-2xl font-bold',
              freshness === 'fresh' ? 'text-green-600' : 'text-gray-500',
            )}
          >
            {freshness === 'fresh'
              ? t('dataFetching.visualizer.hit')
              : t('dataFetching.visualizer.miss')}
          </div>
          <div className="text-[10px] text-gray-400">
            {' '}
            {t('react19.visualizer.cacheStatus')}{' '}
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['default', 'fast', 'dynamic'] as const).map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => {
                setStrategy(s);
                setFreshness('fresh');
                if (staleTimer.current) clearTimeout(staleTimer.current);
                staleTimer.current = setTimeout(
                  () => setFreshness('stale'),
                  s === 'dynamic' ? 0 : s === 'fast' ? 2000 : 5000,
                );
              }}
              className={cn(
                'px-1.5 sm:px-2 py-2 text-[11px] sm:text-xs rounded border transition-colors break-all',
                strategy === s
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                  : 'bg-white border-gray-200',
              )}
            >
              {s === 'default' && 'cacheLife("hours")'}
              {s === 'fast' && 'cacheLife("seconds")'}
              {s === 'dynamic' && t('react19.visualizer.noUseCache')}
            </button>
          ))}
        </div>

        <div className="bg-slate-800 text-slate-200 p-3 rounded text-xs font-mono overflow-x-auto">
          {strategy === 'default' && (
            <>
              <span className="text-purple-400">'use cache'</span>;<br />
              <span className="text-blue-400">cacheLife</span>(
              <span className="text-green-400">"hours"</span>);
            </>
          )}
          {strategy === 'fast' && (
            <>
              <span className="text-purple-400">'use cache'</span>;<br />
              <span className="text-blue-400">cacheLife</span>(
              <span className="text-green-400">"seconds"</span>);
            </>
          )}
          {strategy === 'dynamic' && (
            <span className="text-gray-500">{'// No directive (Dynamic)'}</span>
          )}
        </div>
      </div>

      <p className="text-xs text-center text-gray-500 max-w-[80%]">
        <Trans
          t={t}
          i18nKey="react19.visualizer.cacheInstructions"
          components={{ br: <br /> }}
        />
      </p>
    </div>
  );
};

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
