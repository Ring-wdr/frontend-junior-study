import { motion } from 'motion/react';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { cn } from '../../../lib/utils';

type Rating = 'good' | 'needs-improvement' | 'poor';

const VITALS_CONFIG = {
  LCP: { unit: 's', good: 2.5, poor: 4.0, max: 6, decimals: 1 },
  INP: { unit: 'ms', good: 200, poor: 500, max: 800, decimals: 0 },
  CLS: { unit: '', good: 0.1, poor: 0.25, max: 0.5, decimals: 2 },
};

const SCENARIOS = [
  {
    label: 'Good Performance',
    lcp: 1.8,
    inp: 120,
    cls: 0.05,
    color: 'bg-green-100 text-green-700 border-green-200',
  },
  {
    label: 'Slow Loading',
    lcp: 4.5,
    inp: 150,
    cls: 0.08,
    color: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    label: 'Layout Shifts',
    lcp: 2.0,
    inp: 130,
    cls: 0.35,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  {
    label: 'Slow Interactions',
    lcp: 2.2,
    inp: 450,
    cls: 0.06,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
];

const getRating = (
  name: keyof typeof VITALS_CONFIG,
  value: number,
): Rating => {
  const config = VITALS_CONFIG[name];
  if (value <= config.good) return 'good';
  if (value <= config.poor) return 'needs-improvement';
  return 'poor';
};

const RATING_COLORS: Record<Rating, { stroke: string; badge: string; text: string }> = {
  good: {
    stroke: '#22c55e',
    badge: 'bg-green-100 text-green-700',
    text: 'Good',
  },
  'needs-improvement': {
    stroke: '#f59e0b',
    badge: 'bg-yellow-100 text-yellow-700',
    text: 'Needs Improvement',
  },
  poor: {
    stroke: '#ef4444',
    badge: 'bg-red-100 text-red-700',
    text: 'Poor',
  },
};

const GaugeMeter = ({
  name,
  value,
  config,
}: {
  name: string;
  value: number;
  config: (typeof VITALS_CONFIG)[keyof typeof VITALS_CONFIG];
}) => {
  const rating = getRating(name as keyof typeof VITALS_CONFIG, value);
  const ratingStyle = RATING_COLORS[rating];
  const radius = 55;
  const circumference = Math.PI * radius;
  const percentage = Math.min(value / config.max, 1);
  const offset = circumference * (1 - percentage);

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80">
        {/* Background arc */}
        <path
          d="M 15 75 A 55 55 0 0 1 125 75"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Foreground arc */}
        <motion.path
          d="M 15 75 A 55 55 0 0 1 125 75"
          fill="none"
          stroke={ratingStyle.stroke}
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="text-center -mt-2">
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-gray-900"
        >
          {value.toFixed(config.decimals)}
        </motion.span>
        <span className="text-sm text-gray-500 ml-1">{config.unit}</span>
      </div>
      <span className="text-sm font-semibold text-gray-700 mt-1">{name}</span>
      <motion.span
        key={rating}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1',
          ratingStyle.badge,
        )}
      >
        {ratingStyle.text}
      </motion.span>
    </div>
  );
};

export const WebVitalsVisualizer = () => {
  const [lcp, setLcp] = useState(1.8);
  const [inp, setInp] = useState(120);
  const [cls, setCls] = useState(0.05);

  const applyScenario = (scenario: (typeof SCENARIOS)[number]) => {
    setLcp(scenario.lcp);
    setInp(scenario.inp);
    setCls(scenario.cls);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 justify-center">
        {SCENARIOS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => applyScenario(s)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              s.color,
            )}
          >
            {s.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => applyScenario(SCENARIOS[0])}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <GaugeMeter name="LCP" value={lcp} config={VITALS_CONFIG.LCP} />
        <GaugeMeter name="INP" value={inp} config={VITALS_CONFIG.INP} />
        <GaugeMeter name="CLS" value={cls} config={VITALS_CONFIG.CLS} />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {Object.entries(VITALS_CONFIG).map(([name, config]) => (
          <div
            key={name}
            className="rounded-lg bg-gray-50 border border-gray-100 p-2"
          >
            <span className="text-[10px] font-semibold text-gray-500 block">
              {name} Thresholds
            </span>
            <div className="flex justify-center gap-2 mt-1">
              <span className="text-[10px] text-green-600">
                &le; {config.good}
                {config.unit}
              </span>
              <span className="text-[10px] text-yellow-600">
                &le; {config.poor}
                {config.unit}
              </span>
              <span className="text-[10px] text-red-600">
                &gt; {config.poor}
                {config.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
