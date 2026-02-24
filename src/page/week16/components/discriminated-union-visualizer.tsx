import { Circle, Square, Triangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type ShapeType = 'circle' | 'rectangle' | 'triangle';

const shapes: {
  type: ShapeType;
  icon: typeof Circle;
  color: string;
  properties: string[];
}[] = [
  {
    type: 'circle',
    icon: Circle,
    color: 'blue',
    properties: ['radius: number'],
  },
  {
    type: 'rectangle',
    icon: Square,
    color: 'green',
    properties: ['width: number', 'height: number'],
  },
  {
    type: 'triangle',
    icon: Triangle,
    color: 'purple',
    properties: ['base: number', 'height: number'],
  },
];

export const DiscriminatedUnionVisualizer = () => {
  const { t } = useTranslation('week16');
  const [selected, setSelected] = useState<ShapeType>('circle');

  const selectedShape = shapes.find((s) => s.type === selected)!;
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
      <div className="flex gap-3 justify-center">
        {shapes.map((shape) => {
          const ShapeIcon = shape.icon;
          return (
            <button
              key={shape.type}
              type="button"
              onClick={() => setSelected(shape.type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selected === shape.type
                  ? `bg-${shape.color}-500 text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              style={{
                backgroundColor:
                  selected === shape.type
                    ? `var(--${shape.color}-500, #6366f1)`
                    : undefined,
              }}
            >
              <ShapeIcon className="w-4 h-4" />
              {shape.type}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-2">
            {t('practicalPatterns.visualizer.discriminant')}
          </div>
          <motion.div
            key={selected}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-pink-100 text-pink-700 px-4 py-3 rounded-lg font-mono text-sm"
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon className="w-5 h-5" />
              <span className="font-mono text-sm capitalize">{selected}</span>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <div className="text-xs font-medium text-gray-500 mb-2">
            Properties
          </div>
          <motion.div
            key={selected}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-100 px-4 py-2 rounded-lg"
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-4 text-sm font-mono"
      >
        <div className="text-gray-500 mb-2">// switch문으로 타입 좁히기</div>
        <div className="text-gray-300">
          <span className="text-purple-400">switch</span> (shape.
          <span className="text-yellow-300">type</span>) {'{'}
        </div>
        {shapes.map((shape) => (
          <div
            key={shape.type}
            className={`pl-4 py-1 ${selected === shape.type ? 'bg-indigo-900/50 -mx-4 px-8' : ''}`}
          >
            <span className="text-purple-400">case</span>{' '}
            <span className="text-green-400">"{shape.type}"</span>:
            {selected === shape.type && (
              <span className="text-gray-400 ml-2">
                // shape:{' '}
                {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}
              </span>
            )}
          </div>
        ))}
        <div className="text-gray-300">{'}'}</div>
      </motion.div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
        <div className="text-sm font-medium text-gray-700 mb-2">
          case "{selected}": 에서 사용 가능한 공식
        </div>
        <code className="text-sm text-purple-700">{getFormula()}</code>
      </div>
    </div>
  );
};
