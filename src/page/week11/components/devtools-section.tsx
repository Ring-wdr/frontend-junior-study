import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Eye,
  MousePointer2,
  Play,
  Search,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

export function DevToolsSection() {
  const { t } = useTranslation('week11');
  // Visualizer State
  const [tasks, setTasks] = useState<
    {
      id: number;
      duration: number;
      type: 'short' | 'long';
      timestamp: number;
    }[]
  >([]);
  const [isBlocking, setIsBlocking] = useState(false);
  const [fps, setFps] = useState(60);
  const [clicks, setClicks] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animation Loop for FPS and Scrolling
  useEffect(() => {
    let frameCount = 0;
    let fpsInterval: NodeJS.Timeout;

    const loop = (time: number) => {
      if (isBlocking) {
        // Drop FPS to 0 if blocking
      } else {
        frameCount++;
      }

      // Only update FPS if not completely hung
      requestAnimationFrame(loop);
    };

    // FPS Updater
    fpsInterval = setInterval(() => {
      if (isBlocking) {
        setFps(0);
      } else {
        setFps(Math.min(60, frameCount)); // Simplified FPS
      }
      frameCount = 0;
    }, 1000);

    const rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(fpsInterval);
    };
  }, [isBlocking]);

  // Auto-scroll timeline
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [tasks]);

  const runTask = (type: 'short' | 'long') => {
    const duration = type === 'short' ? 20 : 1000; // ms
    const newTask = {
      id: Date.now(),
      duration,
      type,
      timestamp: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);

    if (type === 'long') {
      setIsBlocking(true);
      // Simulate main thread blocking (without actually freezing browser for too long visually if possible,
      // but here we just simulate the state to show UI updates)

      // Actually, let's purposely NOT block the real browser event loop 100% so the user can see the UI update "Blocked" state,
      // but we will disable interactions.
      setTimeout(() => {
        setIsBlocking(false);
      }, duration);
    } else {
      // Short task doesn't block significantly
    }
  };

  const handleInteraction = () => {
    if (isBlocking) return; // Unresponsive
    setClicks((p) => p + 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <BarChart3 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('devTools.title')}
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          {t('devTools.description')}
        </p>

        {/* Visualizer */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-start mb-6 text-white">
            <div>
              <h3 className="font-bold flex items-center gap-2 text-yellow-400">
                <Activity size={18} /> {t('devTools.simulatorTitle')}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {t('devTools.simulatorDesc')}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div
                className={`text-2xl font-mono font-bold ${fps < 30 ? 'text-red-500' : 'text-green-400'}`}
              >
                {fps} {t('devTools.fps')}
              </div>
              <div className="text-xs text-gray-500">
                {t('devTools.frameRate')}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => runTask('short')}
              disabled={isBlocking}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {t('devTools.runShortTask')}
            </button>
            <button
              type="button"
              onClick={() => runTask('long')}
              disabled={isBlocking}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {t('devTools.runLongTask')}
            </button>
          </div>

          {/* Timeline */}
          <div
            className="relative h-24 bg-gray-800 rounded-lg mb-4 overflow-x-hidden flex items-center px-4"
            ref={scrollRef}
          >
            <div className="flex gap-1 items-end h-16 w-full justify-end pr-10">
              {tasks.slice(-15).map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    'relative rounded-t-sm animate-in slide-in-from-right-10 duration-300',
                    task.type === 'long'
                      ? 'bg-red-500 w-32'
                      : 'bg-green-500 w-4',
                  )}
                  style={{ height: '70%' }}
                >
                  {task.type === 'long' && (
                    <div className="absolute -top-3 left-0 w-full flex justify-center">
                      <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-6 border-t-red-500"></div>
                    </div>
                  )}
                  {task.type === 'long' && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold opacity-80 backdrop-blur-sm">
                      Long Task
                    </span>
                  )}
                </div>
              ))}
              {/* Placeholder for current time */}
              <div className="h-full w-[1px] bg-yellow-500 absolute right-10 top-0 z-10 opacity-50"></div>
            </div>
            <div className="absolute bottom-2 left-4 text-xs text-gray-500 font-mono">
              {t('devTools.timeMs')}
            </div>
          </div>

          {/* Interaction Test Area */}
          <div
            className={`
                rounded-lg p-4 border-2 transition-colors duration-200 flex justify-between items-center
                ${isBlocking ? 'bg-red-900/20 border-red-500/50' : 'bg-gray-800 border-gray-700'}
            `}
          >
            <div className="flex items-center gap-3">
              <MousePointer2
                className={isBlocking ? 'text-red-500' : 'text-green-400'}
              />
              <div>
                <div className="text-white font-medium">
                  {t('devTools.interactionTest')}
                </div>
                <div
                  className={`text-xs ${isBlocking ? 'text-red-400' : 'text-gray-400'}`}
                >
                  {isBlocking
                    ? t('devTools.mainThreadBlocked')
                    : t('devTools.uiResponsive')}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleInteraction}
              className={cn(
                'px-4 py-2 rounded font-bold text-sm transition-transform active:scale-95',
                isBlocking
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600',
              )}
            >
              {t('devTools.clicked')} {clicks}
            </button>
          </div>

          {isBlocking && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-none flex items-center justify-center z-20">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                {t('devTools.blockingWarning')}
              </div>
            </div>
          )}
        </div>

        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Play size={18} /> {t('devTools.usageTitle')}
          </h3>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                1
              </span>
              <span>{t('devTools.usageSteps.step1')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                2
              </span>
              <span>{t('devTools.usageSteps.step2')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                3
              </span>
              <span>{t('devTools.usageSteps.step3')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              <span>{t('devTools.usageSteps.step4')}</span>
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="text-red-500" size={20} />
              <h4 className="font-bold text-gray-900">
                {t('devTools.longTask.title')}
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              {t('devTools.longTask.description')}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              {t('devTools.longTask.note')}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="text-orange-500" size={20} />
              <h4 className="font-bold text-gray-900">
                {t('devTools.layoutShift.title')}
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              {t('devTools.layoutShift.description')}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              {t('devTools.layoutShift.note')}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="text-blue-500" size={20} />
              <h4 className="font-bold text-gray-900">
                {t('devTools.fpsMonitoring.title')}
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              {t('devTools.fpsMonitoring.description')}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              {t('devTools.fpsMonitoring.note')}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Search className="text-green-500" size={20} />
              <h4 className="font-bold text-gray-900">
                {t('devTools.callTree.title')}
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              {t('devTools.callTree.description')}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              {t('devTools.callTree.note')}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="text-amber-600 shrink-0" size={20} />
          <div className="text-sm text-amber-800">{t('devTools.proTip')}</div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-purple-600" size={20} />
            <h4 className="font-bold text-gray-900">
              {t('devTools.lighthouse.title')}
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {t('devTools.lighthouse.description')}
          </p>
          <div className="flex flex-wrap gap-2">
            {t('devTools.lighthouse.categories', {
              returnObjects: true,
            }).map((category: string) => (
              <span
                key={category}
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
