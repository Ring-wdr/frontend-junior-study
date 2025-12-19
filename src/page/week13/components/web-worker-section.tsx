import { useCallback, useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WebWorkerSection = () => {
  const [mainThreadResult, setMainThreadResult] = useState<string>('');
  const [workerResult, setWorkerResult] = useState<string>('');
  const [isMainRunning, setIsMainRunning] = useState(false);
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);
  const [animating, setAnimating] = useState(false);

  const heavyCalculation = (count: number): number => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }
    return sum;
  };

  const runOnMainThread = useCallback(() => {
    setIsMainRunning(true);
    setMainThreadResult('Calculating...');
    const start = performance.now();

    // This will block the UI
    setTimeout(() => {
      const result = heavyCalculation(10000000);
      const duration = (performance.now() - start).toFixed(2);
      setMainThreadResult(`Result: ${result.toFixed(2)} (${duration}ms)`);
      setIsMainRunning(false);
    }, 10);
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
      badge={{ label: 'Parallel', color: 'blue' }}
      title="Web Worker — Browser Multithreading"
      description="Offload CPU-intensive work to background threads"
    >
      <div className="space-y-8">
        <SubSection title="What is Web Worker?" icon iconColor="blue">
          <InfoBox variant="blue" title="Background Processing">
            <p className="text-sm leading-relaxed">
              JavaScript runs on a single thread, but browsers provide Worker
              threads to <strong>offload CPU-heavy tasks</strong> without
              blocking the main UI thread.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>Separate Thread:</strong> Workers run in isolated
                contexts with no DOM access
              </li>
              <li>
                <strong>Message Passing:</strong> Communication via postMessage
                (serialization overhead)
              </li>
              <li>
                <strong>Transferable Objects:</strong> Zero-copy transfer for
                ArrayBuffer
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Use Cases" icon iconColor="purple">
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Large JSON Parsing', desc: '5-50MB data processing' },
              { title: 'Image Processing', desc: 'Filters, transformations' },
              { title: 'Video/Audio', desc: 'FFmpeg WASM encoding' },
              { title: 'Cryptography', desc: 'Encryption/decryption' },
              { title: 'ML Inference', desc: 'TensorFlow.js models' },
              { title: 'Data Compression', desc: 'Gzip, LZ compression' },
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

        <SubSection title="Main Thread vs Worker Demo" icon iconColor="green">
          <DemoBox label="UI Blocking Comparison">
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 transition-transform ${
                    animating ? 'animate-spin' : ''
                  }`}
                />
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Animation Test</p>
                  <p className="text-xs">
                    Click toggle, then run calculations to see blocking
                  </p>
                  <button
                    type="button"
                    onClick={() => setAnimating(!animating)}
                    className="mt-2 px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {animating ? 'Stop' : 'Start'} Animation
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-sm mb-2 text-red-600">
                    Main Thread
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Blocks UI during calculation
                  </p>
                  <button
                    type="button"
                    onClick={runOnMainThread}
                    disabled={isMainRunning}
                    className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {isMainRunning ? 'Running...' : 'Run on Main'}
                  </button>
                  <p className="text-xs mt-2 text-gray-600 min-h-[20px]">
                    {mainThreadResult}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-sm mb-2 text-green-600">
                    Web Worker
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    UI stays responsive
                  </p>
                  <button
                    type="button"
                    onClick={runOnWorker}
                    disabled={isWorkerRunning}
                    className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    {isWorkerRunning ? 'Running...' : 'Run on Worker'}
                  </button>
                  <p className="text-xs mt-2 text-gray-600 min-h-[20px]">
                    {workerResult}
                  </p>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Basic Usage" icon iconColor="orange">
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

        <SubSection title="Transferable Objects" icon iconColor="red">
          <InfoBox variant="orange" title="Zero-Copy Transfer">
            <p className="text-sm mb-3">
              postMessage copies data by default. For large ArrayBuffers, use
              Transferable Objects to transfer ownership without copying.
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

        <SubSection title="SharedArrayBuffer (Advanced)" icon iconColor="purple">
          <InfoBox variant="purple" title="Shared Memory">
            <p className="text-sm">
              SharedArrayBuffer allows true memory sharing between threads. Use
              Atomics for synchronization. Requires COOP/COEP headers.
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
