import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MousePointer,
  Move,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

export function CoreWebVitalsSection() {
  const { t } = useTranslation('week11');
  const [selectedMetric, setSelectedMetric] = useState<'lcp' | 'inp' | 'cls'>(
    'lcp',
  );

  const metrics = {
    lcp: {
      name: t('coreWebVitals.lcp.name'),
      fullName: t('coreWebVitals.lcp.fullName'),
      icon: <Clock className="text-blue-600" size={24} />,
      color: 'blue',
      description: t('coreWebVitals.lcp.description'),
      good: t('coreWebVitals.lcp.good'),
      needsImprovement: t('coreWebVitals.lcp.needsImprovement'),
      poor: t('coreWebVitals.lcp.poor'),
      causes: t('coreWebVitals.lcp.causes', { returnObjects: true }),
      solutions: t('coreWebVitals.lcp.solutions', {
        returnObjects: true,
      }),
    },
    inp: {
      name: t('coreWebVitals.inp.name'),
      fullName: t('coreWebVitals.inp.fullName'),
      icon: <MousePointer className="text-purple-600" size={24} />,
      color: 'purple',
      description: t('coreWebVitals.inp.description'),
      good: t('coreWebVitals.inp.good'),
      needsImprovement: t('coreWebVitals.inp.needsImprovement'),
      poor: t('coreWebVitals.inp.poor'),
      causes: t('coreWebVitals.inp.causes', { returnObjects: true }),
      solutions: t('coreWebVitals.inp.solutions', {
        returnObjects: true,
      }),
    },
    cls: {
      name: t('coreWebVitals.cls.name'),
      fullName: t('coreWebVitals.cls.fullName'),
      icon: <Move className="text-orange-600" size={24} />,
      color: 'orange',
      description: t('coreWebVitals.cls.description'),
      good: t('coreWebVitals.cls.good'),
      needsImprovement: t('coreWebVitals.cls.needsImprovement'),
      poor: t('coreWebVitals.cls.poor'),
      causes: t('coreWebVitals.cls.causes', { returnObjects: true }),
      solutions: t('coreWebVitals.cls.solutions', {
        returnObjects: true,
      }),
    },
  };

  const current = metrics[selectedMetric];
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      button: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      button: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      button: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
    },
  };
  const colors = colorClasses[current.color as keyof typeof colorClasses];

  // Visualizer States
  const [lcpState, setLcpState] = useState<'initial' | 'loading' | 'loaded'>(
    'initial',
  );
  const [lcpTime, setLcpTime] = useState(0);
  const [lcpMode, setLcpMode] = useState<'good' | 'bad'>('bad');

  const [inpState, setInpState] = useState<'idle' | 'processing' | 'responded'>(
    'idle',
  );
  const [inpTime, setInpTime] = useState(0);
  const [inpMode, setInpMode] = useState<'good' | 'bad'>('bad');

  const [clsItems, setClsItems] = useState<number[]>([1, 2, 3]);
  const [clsScore, setClsScore] = useState(0);
  const [clsMode, setClsMode] = useState<'good' | 'bad'>('bad');

  // LCP Simulator
  const runLcpSim = () => {
    setLcpState('loading');
    setLcpTime(0);
    const startTime = performance.now();
    const duration = lcpMode === 'good' ? 800 : 3500;

    const interval = setInterval(() => {
      setLcpTime(Math.floor(performance.now() - startTime));
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setLcpTime(duration);
      setLcpState('loaded');
    }, duration);
  };

  // INP Simulator
  const runInpSim = () => {
    setInpState('processing');
    const start = performance.now();

    // Simulate main thread blocking
    if (inpMode === 'bad') {
      const blockUntil = start + 600;
      while (performance.now() < blockUntil) {
        // blocking main thread
      }
      setInpTime(600);
      setInpState('responded');
    } else {
      setTimeout(() => {
        setInpTime(50);
        setInpState('responded');
      }, 50);
    }
  };

  // CLS Simulator
  const runClsSim = () => {
    if (clsMode === 'bad') {
      // Bad: Insert item at top without reserving space
      setClsItems((prev) => [Math.random(), ...prev]);
      setClsScore((prev) => Math.min(prev + 0.15, 0.5));
    } else {
      // Good: Append or insert with reserved space (simulated)
      setClsItems((prev) => [...prev, Math.random()]);
      // No layout shift score increase
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
            {current.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('coreWebVitals.title')}
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-lg">
          <Trans t={t} i18nKey="coreWebVitals.description" />
        </p>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          {(['lcp', 'inp', 'cls'] as const).map((metric) => (
            <button
              key={metric}
              type="button"
              onClick={() => setSelectedMetric(metric)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                selectedMetric === metric
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {metrics[metric].name}
            </button>
          ))}
        </div>

        {/* Visualizer Area */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              {current.name} {t('coreWebVitals.visualizerTitle')}
            </h3>
            <div className="flex items-center gap-4 text-sm">
              {selectedMetric === 'lcp' && (
                <div className="flex gap-2 bg-white p-1 rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setLcpMode('good')}
                    className={`px-3 py-1 rounded ${lcpMode === 'good' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {t('coreWebVitals.lcp.goodMode')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLcpMode('bad')}
                    className={`px-3 py-1 rounded ${lcpMode === 'bad' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {t('coreWebVitals.lcp.badMode')}
                  </button>
                </div>
              )}
              {selectedMetric === 'inp' && (
                <div className="flex gap-2 bg-white p-1 rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setInpMode('good')}
                    className={`px-3 py-1 rounded ${inpMode === 'good' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {t('coreWebVitals.inp.goodMode')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInpMode('bad')}
                    className={`px-3 py-1 rounded ${inpMode === 'bad' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {t('coreWebVitals.inp.badMode')}
                  </button>
                </div>
              )}
              {selectedMetric === 'cls' && (
                <div className="flex gap-2 bg-white p-1 rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setClsMode('good');
                      setClsScore(0);
                      setClsItems([1, 2, 3]);
                    }}
                    className={`px-3 py-1 rounded ${clsMode === 'good' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {t('coreWebVitals.cls.goodMode')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setClsMode('bad');
                      setClsScore(0);
                      setClsItems([1, 2, 3]);
                    }}
                    className={`px-3 py-1 rounded ${clsMode === 'bad' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {t('coreWebVitals.cls.badMode')}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 bg-gray-100/50 min-h-[300px] flex items-center justify-center relative">
            {selectedMetric === 'lcp' && (
              <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <button
                    type="button"
                    onClick={runLcpSim}
                    disabled={lcpState === 'loading'}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    <RotateCcw size={12} />{' '}
                    {lcpState === 'loading'
                      ? t('coreWebVitals.lcp.loading')
                      : t('coreWebVitals.lcp.reloadPage')}
                  </button>
                </div>
                <div className="space-y-3">
                  {/* Skeleton or Content */}
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded"></div>

                  {/* LCP Element */}
                  <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                    {lcpState === 'loaded' ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl animate-in zoom-in-95 duration-500">
                        {t('coreWebVitals.lcp.heroImage')}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        {t('coreWebVitals.lcp.loadingText')}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500">
                      {t('coreWebVitals.lcp.time')}{' '}
                      <span className="font-mono text-gray-900">
                        {lcpTime}ms
                      </span>
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        lcpTime > 2500
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {lcpTime > 2500
                        ? t('coreWebVitals.lcp.needsImprovementLabel')
                        : t('coreWebVitals.lcp.goodLabel')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'inp' && (
              <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center gap-6">
                <div className="text-center space-y-2">
                  <h4 className="font-medium text-gray-900">
                    {t('coreWebVitals.inp.clickTest')}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t('coreWebVitals.inp.testButton')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={runInpSim}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition-all active:scale-95 ${
                    inpState === 'processing'
                      ? 'bg-gray-400'
                      : inpMode === 'bad'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {inpState === 'processing'
                    ? t('coreWebVitals.inp.processing')
                    : t('coreWebVitals.inp.clickMe')}
                </button>

                {inpState === 'responded' && (
                  <div
                    className={`text-center space-y-1 animate-in slide-in-from-bottom-2`}
                  >
                    <div className="text-2xl font-bold font-mono">
                      {inpTime}ms
                    </div>
                    <div
                      className={`text-xs font-medium ${inpTime > 200 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {inpTime > 200
                        ? t('coreWebVitals.inp.slow')
                        : t('coreWebVitals.inp.fast')}
                    </div>
                  </div>
                )}

                <div className="text-xs text-center text-gray-400 max-w-[200px]">
                  {inpMode === 'bad'
                    ? t('coreWebVitals.inp.simulateHeavy')
                    : t('coreWebVitals.inp.simulateLightweight')}
                </div>
              </div>
            )}

            {selectedMetric === 'cls' && (
              <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[320px]">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">
                    {t('coreWebVitals.cls.layoutView')}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${clsScore > 0.1 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    CLS: {clsScore.toFixed(3)}
                  </span>
                </div>
                <div className="p-4 flex-1 overflow-y-auto relative">
                  {/* Simulated Ad/Content injection */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      type="button"
                      onClick={runClsSim}
                      className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors shadow-sm"
                      title="Trigger Content Load"
                    >
                      <Move size={16} />
                    </button>
                  </div>

                  <div className="space-y-4 transition-all duration-300">
                    {clsItems.map((item, idx) => (
                      <div
                        key={item}
                        className="animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        {/* If it's the newest item in bad mode, it pushes things down */}
                        <div
                          className={`p-4 rounded-lg flex items-center gap-3 ${
                            idx === 0 &&
                            clsMode === 'bad' &&
                            clsItems.length > 3
                              ? 'bg-orange-50 border border-orange-200'
                              : 'bg-gray-50 border border-gray-100'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                          <div className="space-y-2 w-full">
                            <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">
                        {t('coreWebVitals.cls.targetContent')}
                      </h4>
                      <p className="text-xs text-blue-700">
                        {t('coreWebVitals.cls.targetContentDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`${colors.bg} ${colors.border} border rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-4">
            {current.icon}
            <div>
              <h3 className="font-bold text-gray-900">{current.name}</h3>
              <p className="text-sm text-gray-500">{current.fullName}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{current.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="mx-auto text-green-600 mb-1" size={20} />
              <p className="text-xs text-gray-500">
                {t('coreWebVitals.metrics.good')}
              </p>
              <p className="font-bold text-green-700">{current.good}</p>
            </div>
            <div className="text-center p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle
                className="mx-auto text-yellow-600 mb-1"
                size={20}
              />
              <p className="text-xs text-gray-500">
                {t('coreWebVitals.metrics.needsWork')}
              </p>
              <p className="font-bold text-yellow-700">
                {current.needsImprovement}
              </p>
            </div>
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <Zap className="mx-auto text-red-600 mb-1" size={20} />
              <p className="text-xs text-gray-500">
                {t('coreWebVitals.metrics.poor')}
              </p>
              <p className="font-bold text-red-700">{current.poor}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-red-500">!</span>{' '}
                {t('coreWebVitals.metrics.causes')}
              </h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {(current.causes as string[]).map((cause) => (
                  <li key={cause}>• {cause}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />{' '}
                {t('coreWebVitals.metrics.solutions')}
              </h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {(current.solutions as string[]).map((solution) => (
                  <li key={solution}>• {solution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          {t('coreWebVitals.measurementTools')}
        </div>
      </div>
    </div>
  );
}
