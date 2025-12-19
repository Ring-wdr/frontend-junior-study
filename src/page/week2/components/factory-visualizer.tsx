import { AnimatePresence, motion } from 'framer-motion';
import { Circle, Plus, Square, Triangle } from 'lucide-react';
import { useState } from 'react';

type ShapeType = 'circle' | 'square' | 'triangle';

interface Shape {
  id: number;
  type: ShapeType;
  color: string;
}

export const FactoryVisualizer = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedType, setSelectedType] = useState<ShapeType>('circle');

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
      id: Date.now(),
      type: selectedType,
      color: randomColor,
    };

    setShapes((prev) => [...prev, newShape]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ShapeType)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        <button
          type="button"
          onClick={createShape}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      <div className="min-h-[160px] bg-gray-100 rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4 content-start">
        <AnimatePresence>
          {shapes.map((shape) => (
            <motion.div
              key={shape.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
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
            Factory storage is empty. Create some shapes!
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500">
        The client (buttons) doesn't need to know <em>how</em> the shapes are
        created, just requests them.
      </div>
    </div>
  );
};
