import { useCallback, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WebWorkerSection = () => {
  const { t } = useTranslation('week13');
  const [mainThreadResult, setMainThreadResult] = useState<string>('');
  const [workerResult, setWorkerResult] = useState<string>('');
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  // JavaScript-based animation (runs on main thread)
  useEffect(() => {
    if (animating) {
      const animate = () => {
        setRotation((prev) => (prev + 3) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animating]);

  const runOnMainThread = useCallback(() => {
    setIsMainRunning(true);
    setMainThreadResult('Calculating...');
    const start = performance.now();

    // This will block the UI - synchronous execution
    const result = heavyCalculation(10000000);
    const duration = (performance.now() - start).toFixed(2);
    setMainThreadResult(`Result: ${result.toFixed(2)} (${duration}ms)`);
    setIsMainRunning(false);
  }, []);

  const runOnWorker = useCallback(() => {
    setIsWorkerRunning(true);
    setWorkerResult('Calculating...');
    const start = performance.now();

    // Create inline worker
    const workerCode = `
      self.onmessage = function(e) {
        let sum = 0;
        for (let i = 0; i < e.data.count; i++) {
          sum += Math.sqrt(i) * Math.sin(i);
        }
        self.postMessage({ result: sum });
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
      const duration = (performance.now() - start).toFixed(2);
      setWorkerResult(`Result: ${e.data.result.toFixed(2)} (${duration}ms)`);
      setIsWorkerRunning(false);
      worker.terminate();
    };

    worker.postMessage({ count: 10000000 });
  }, []);

  return (
    <SectionCard
      badge={{ label: t('webWorker.badge'), color: 'blue' }}
      title={t('webWorker.title')}
      description={t('webWorker.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('webWorker.whatIs.title')} icon iconColor="blue">
          <InfoBox variant="blue" title={t('webWorker.whatIs.infoTitle')}>
            <p className="text-sm leading-relaxed">
              {t('webWorker.whatIs.description')}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <Trans t={t} i18nKey="webWorker.whatIs.separateThread" />
              </li>
              <li>
                <Trans t={t} i18nKey="webWorker.whatIs.messagePassing" />
              </li>
              <li>
                <Trans t={t} i18nKey="webWorker.whatIs.transferable" />
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('webWorker.useCases.title')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: t('webWorker.useCases.largeJson'),
                desc: t('webWorker.useCases.largeJsonDesc'),
              },
              {
                title: t('webWorker.useCases.imageProcessing'),
                desc: t('webWorker.useCases.imageProcessingDesc'),
              },
              {
                title: t('webWorker.useCases.videoAudio'),
                desc: t('webWorker.useCases.videoAudioDesc'),
              },
              {
                title: t('webWorker.useCases.cryptography'),
                desc: t('webWorker.useCases.cryptographyDesc'),
              },
              {
                title: t('webWorker.useCases.mlInference'),
                desc: t('webWorker.useCases.mlInferenceDesc'),
              },
              {
                title: t('webWorker.useCases.compression'),
                desc: t('webWorker.useCases.compressionDesc'),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-purple-50 p-3 rounded border border-purple-200"
              >
                <p className="text-sm font-semibold text-purple-900">
                  {item.title}
                </p>
                <p className="text-xs text-purple-700 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('webWorker.demo.title')} icon iconColor="green">
          <DemoBox label={t('webWorker.demo.label')}>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-blue-500"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
                <div className="text-sm text-gray-600">
                  <p className="font-medium">
                    {t('webWorker.demo.animationTest')}
                  </p>
                  <p className="text-xs">{t('webWorker.demo.animationDesc')}</p>
                  <button
                    type="button"
                    onClick={() => setAnimating(!animating)}
                    className="mt-2 px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {animating
                      ? t('webWorker.demo.stop')
                      : t('webWorker.demo.start')}{' '}
                    Animation
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-sm mb-2 text-red-600">
                    {t('webWorker.demo.mainThread')}
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    {t('webWorker.demo.mainThreadDesc')}
                  </p>
                  <button
                    type="button"
                    onClick={runOnMainThread}
                    disabled={isMainRunning}
                    className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {isMainRunning
                      ? t('webWorker.demo.running')
                      : t('webWorker.demo.runOnMain')}
                  </button>
                  <p className="text-xs mt-2 text-gray-600 min-h-[20px]">
                    {mainThreadResult}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-sm mb-2 text-green-600">
                    {t('webWorker.demo.webWorker')}
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    {t('webWorker.demo.webWorkerDesc')}
                  </p>
                  <button
                    type="button"
                    onClick={runOnWorker}
                    disabled={isWorkerRunning}
                    className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    {isWorkerRunning
                      ? t('webWorker.demo.running')
                      : t('webWorker.demo.runOnWorker')}
                  </button>
                  <p className="text-xs mt-2 text-gray-600 min-h-[20px]">
                    {workerResult}
                  </p>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('webWorker.basicUsage.title')}
          icon
          iconColor="orange"
        >
          <CodeBlock
            code={`// main.js
const worker = new Worker('./worker.js');

// Send data to worker
worker.postMessage({ count: 50000000 });

// Receive results
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

worker.onerror = (e) => {
  console.error('Worker error:', e.message);
};

// worker.js
onmessage = (e) => {
  let sum = 0;
  for (let i = 0; i < e.data.count; i++) {
    sum += i;
  }
  postMessage(sum);
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('webWorker.transferableObjects.title')}
          icon
          iconColor="red"
        >
          <InfoBox
            variant="orange"
            title={t('webWorker.transferableObjects.infoTitle')}
          >
            <p className="text-sm mb-3">
              {t('webWorker.transferableObjects.description')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Transfer ownership of ArrayBuffer (zero-copy)
const buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB
console.log(buffer.byteLength); // 104857600

// Transfer to worker - buffer becomes unusable in main thread
worker.postMessage({ data: buffer }, [buffer]);
console.log(buffer.byteLength); // 0 (transferred!)

// Worker receives and can transfer back
// worker.js
onmessage = (e) => {
  const buffer = e.data.data;
  // Process buffer...
  postMessage({ result: buffer }, [buffer]);
};`}
            className="text-xs mt-4"
          />
        </SubSection>

        <SubSection
          title={t('webWorker.sharedArrayBuffer.title')}
          icon
          iconColor="purple"
        >
          <InfoBox
            variant="purple"
            title={t('webWorker.sharedArrayBuffer.infoTitle')}
          >
            <p className="text-sm">
              {t('webWorker.sharedArrayBuffer.description')}
            </p>
          </InfoBox>

          <CodeBlock
            code={`// Shared memory between main and worker
const shared = new SharedArrayBuffer(1024);
const view = new Int32Array(shared);

// Pass shared buffer (not transferred)
worker.postMessage({ shared });

// Both can read/write the same memory
// Use Atomics for thread-safe operations
Atomics.store(view, 0, 42);
Atomics.add(view, 0, 10);
const value = Atomics.load(view, 0); // 52

// Required headers for SharedArrayBuffer:
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Embedder-Policy: require-corp`}
            className="text-xs mt-4"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};

const heavyCalculation = (count: number): number => {
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += Math.sqrt(i) * Math.sin(i);
  }
  return sum;
};
