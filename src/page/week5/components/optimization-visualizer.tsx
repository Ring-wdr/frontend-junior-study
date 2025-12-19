import { AlertTriangle, Image as ImageIcon, Zap } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

export const OptimizationVisualizer = () => {
  const [mode, setMode] = useState<'bad' | 'good'>('bad');
  const [loading, setLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [clsScore, setClsScore] = useState(0);

  const reset = () => {
    setLoading(false);
    setContentVisible(false);
    setImageLoaded(false);
    setClsScore(0);
  };

  const startDemo = async () => {
    reset();
    setLoading(true);

    // Step 1: Text Content Loads
    setTimeout(() => {
      setContentVisible(true);
    }, 500);

    // Step 2: Image Loads (causing shift in bad mode)
    setTimeout(() => {
      setImageLoaded(true);
      setLoading(false);
      if (mode === 'bad') {
        setClsScore(0.25); // Simulate CLS impact
      }
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Image Optimization & CLS
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            See how reserving space prevents Cumulative Layout Shift (CLS).
          </p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setMode('bad');
              reset();
            }}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
              mode === 'bad'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            Unoptimized (Standard img)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('good');
              reset();
            }}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
              mode === 'good'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900',
            )}
          >
            Optimized (next/image)
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={startDemo}
          disabled={loading || imageLoaded}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? 'Loading...'
            : imageLoaded
              ? 'Reload to try again'
              : 'Load Content'}
        </button>
        {clsScore > 0 && (
          <div className="flex items-center gap-2 text-red-600 font-bold animate-in zoom-in">
            <AlertTriangle className="w-5 h-5" />
            CLS Detected! (Score: {clsScore})
          </div>
        )}
        {mode === 'good' && imageLoaded && (
          <div className="flex items-center gap-2 text-green-600 font-bold animate-in zoom-in">
            <Zap className="w-5 h-5" />
            Stable Layout (CLS: 0)
          </div>
        )}
      </div>

      {/* VIEWPORT SIMULATION */}
      <div className="border-4 border-gray-800 rounded-xl overflow-hidden bg-gray-50 relative h-[400px] shadow-2xl">
        {/* Header */}
        <div className="bg-white border-b p-4 shadow-sm z-10 relative">
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="p-4 space-y-4 max-w-lg mx-auto">
          {/* Text Content */}
          {contentVisible && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Beautiful Landscapes
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Discover the most breathtaking views from around the world. From
                mountain peaks to serene lakes, nature offers endless
                inspiration.
              </p>
            </div>
          )}

          {/* The Image */}
          {contentVisible && (
            <div
              className={cn(
                'transition-all duration-500',
                mode === 'good' && 'relative',
              )}
            >
              {mode === 'good' ? (
                // OPTIMIZED: Aspect Ratio Box
                <div className="aspect-video w-full bg-gray-200 rounded-lg relative overflow-hidden">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8 animate-pulse" />
                    </div>
                  )}
                  {/* Image fades in over placeholder */}
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop"
                    className={cn(
                      'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
                      imageLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                    alt="Landscape"
                  />
                </div>
              ) : (
                // UNOPTIMIZED: No height, snaps in
                imageLoaded && (
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop"
                    className="w-full rounded-lg shadow-md animate-in fade-in duration-300"
                    alt="Landscape"
                  />
                )
              )}
            </div>
          )}

          {/* More Text Content (Pushed down in bad mode) */}
          {contentVisible && (
            <p className="text-gray-600 leading-relaxed animate-in fade-in slide-in-from-bottom-2 delay-100">
              Photography allows us to capture these moments forever. It's not
              just about the gear, but about the perspective.
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
        <p>
          <strong>Why it matters:</strong> In the <strong>Unoptimized</strong>{' '}
          mode, the browser doesn't know the image height until it downloads.
          This causes content below it to jump (CLS), frustrating users.
          <strong> Next/Image</strong> (Optimized) enforces width/height props
          to reserve space immediately, ensuring a stable layout even while
          loading.
        </p>
      </div>

      <CodeBlock
        code={
          mode === 'bad'
            ? `// ❌ Unoptimized: Causes CLS
<img 
  src="/hero.jpg" 
  alt="Landscape" 
/>`
            : `// ✅ Optimized: Zero CLS
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  alt="Landscape"
  width={800} 
  height={450} // Aspect ratio reserved
  placeholder="blur" // Optional blur-up
/>`
        }
        className="text-xs"
      />
    </div>
  );
};
