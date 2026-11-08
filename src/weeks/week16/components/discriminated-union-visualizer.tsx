'use client';

import { Circle, Square, Triangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/client';

type ShapeType = 'circle' | 'rectangle' | 'triangle';

const activeButtonClass: Record<ShapeType, string> = {
  circle: 'bg-blue-500 text-white',
  rectangle: 'bg-green-500 text-white',
  triangle: 'bg-purple-500 text-white',
};

const feedbackTransition = { duration: 0.25, ease: 'easeOut' } as const;

const shapes: {
  type: ShapeType;
  icon: typeof Circle;
  properties: string[];
}[] = [
  {
    type: 'circle',
    icon: Circle,
    properties: ['radius: number'],
  },
  {
    type: 'rectangle',
    icon: Square,
    properties: ['width: number', 'height: number'],
  },
  {
    type: 'triangle',
    icon: Triangle,
    properties: ['base: number', 'height: number'],
  },
];

export const DiscriminatedUnionVisualizer = () => {
  const { t } = useTranslation('week16');
  const [selected, setSelected] = useState<ShapeType>('circle');

  const selectedShape = shapes.find((s) => s.type === selected) ?? shapes[0];
  const Icon = selectedShape.icon;

  const getFormula = () => {
    switch (selected) {
      case 'circle':
        return 'Math.PI * radius ** 2';
      case 'rectangle':
        return 'width * height';
      case 'triangle':
        return '(base * height) / 2';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {shapes.map((shape) => {
          const ShapeIcon = shape.icon;
          return (
            <button
              key={shape.type}
              type="button"
              onClick={() => setSelected(shape.type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selected === shape.type
                  ? activeButtonClass[shape.type]
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <ShapeIcon className="w-4 h-4" />
              {shape.type}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-2">
            {t('practicalPatterns.visualizer.discriminant')}
          </div>
          <motion.div
            key={selected}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={feedbackTransition}
            className="bg-pink-100 text-pink-700 px-3 py-3 rounded-lg font-mono text-sm break-words"
          >
            type: "{selected}"
          </motion.div>
        </div>

        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-2">
            {t('practicalPatterns.visualizer.narrowedTo')}
          </div>
          <motion.div
            key={selected}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={feedbackTransition}
            className="bg-indigo-100 text-indigo-700 px-3 py-3 rounded-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon className="w-5 h-5" />
              <span className="font-mono text-sm capitalize">{selected}</span>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-2">
            {t('practicalPatterns.visualizer.properties')}
          </div>
          <motion.div
            key={selected}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={feedbackTransition}
            className="bg-gray-100 px-3 py-2 rounded-lg"
          >
            {selectedShape.properties.map((prop) => (
              <div key={prop} className="font-mono text-xs text-gray-700">
                {prop}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={feedbackTransition}
        className="bg-gray-900 rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-x-auto"
      >
        <div className="text-gray-500 mb-2">
          {t('practicalPatterns.visualizer.switchComment')}
        </div>
        <div className="text-gray-300">
          <span className="text-purple-400">switch</span> (shape.
          <span className="text-yellow-300">type</span>) {'{'}
        </div>
        {shapes.map((shape) => (
          <div
            key={shape.type}
            className={`pl-4 py-1 whitespace-nowrap ${selected === shape.type ? 'bg-indigo-900/50 -mx-3 sm:-mx-4 px-7 sm:px-8' : ''}`}
          >
            <span className="text-purple-400">case</span>{' '}
            <span className="text-green-400">"{shape.type}"</span>:
            {selected === shape.type && (
              <span className="text-gray-400 ml-2">
                {'// shape: '}
                {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}
              </span>
            )}
          </div>
        ))}
        <div className="text-gray-300">{'}'}</div>
      </motion.div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
        <div className="text-sm font-medium text-gray-700 mb-2">
          {t('practicalPatterns.visualizer.formulaTitle', { selected })}
        </div>
        <code className="text-sm text-purple-700">{getFormula()}</code>
      </div>
    </div>
  );
};
