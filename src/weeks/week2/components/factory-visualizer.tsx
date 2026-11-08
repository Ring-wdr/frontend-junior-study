'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Circle, Plus, Square, Triangle } from 'lucide-react';
import { useRef, useState } from 'react';
import { Trans, useTranslation } from '@/i18n/client';

type ShapeType = (typeof SHAPE_TYPES)[number];

interface Shape {
  id: number;
  type: ShapeType;
  color: string;
}

const SHAPE_TYPES = ['circle', 'square', 'triangle'] as const;

export const FactoryVisualizer = () => {
  const { t } = useTranslation('week2');
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedType, setSelectedType] = useState<ShapeType>('circle');
  const nextId = useRef(0);

  const createShape = () => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newShape: Shape = {
      id: nextId.current++,
      type: selectedType,
      color: randomColor,
    };

    setShapes((prev) => [...prev, newShape]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {t('creation.factory.visualizer.type')}
          </span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ShapeType)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
          >
            {SHAPE_TYPES.map((shapeType) => (
              <option key={shapeType} value={shapeType}>
                {t(`creation.factory.visualizer.shapes.${shapeType}`)}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={createShape}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('creation.factory.visualizer.create')}
        </button>
      </div>

      <div className="min-h-[160px] bg-gray-100 rounded-xl border border-gray-200 p-3 flex flex-wrap gap-3 content-start overflow-hidden sm:p-4">
        <AnimatePresence>
          {shapes.map((shape) => (
            <motion.div
              key={shape.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              layout
              className={`w-12 h-12 flex items-center justify-center shadow-sm text-white ${shape.color} ${shape.type === 'circle' ? 'rounded-full' : shape.type === 'square' ? 'rounded-lg' : 'clip-triangle'}`}
              style={
                shape.type === 'triangle'
                  ? {
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      borderRadius: 0,
                      width: '3rem',
                      height: '3rem',
                    }
                  : {}
              }
            >
              {shape.type === 'circle' && <Circle className="w-6 h-6" />}
              {shape.type === 'square' && <Square className="w-6 h-6" />}
              {/* Icon for triangle isn't perfect fit for css shape but works for symbol */}
              {shape.type === 'triangle' && (
                <Triangle className="w-4 h-4 mt-2" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {shapes.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic py-10">
            {t('creation.factory.visualizer.empty')}
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500">
        <Trans t={t} i18nKey="creation.factory.visualizer.note" />
      </div>
    </div>
  );
};
