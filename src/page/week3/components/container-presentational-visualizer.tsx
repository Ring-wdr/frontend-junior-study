import { AnimatePresence, motion } from 'framer-motion';
import { Database, LayoutTemplate, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Types for our "Data"
interface DogData {
  id: number;
  url: string;
  breed: string;
}

// 1. Presentational Component (Pure UI)
// Knows NOTHING about where data comes from. Just renders.
const DogImageCard = ({
  loading,
  data,
  onRefresh,
}: {
  loading: boolean;
  data: DogData | null;
  onRefresh: () => void;
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-4 w-full h-full min-h-[200px] justify-center relative overflow-hidden">
      {/* Visual indicator that this is UI layer */}
      <div className="absolute top-2 right-2 text-[10px] font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full flex items-center gap-1">
        <LayoutTemplate className="w-3 h-3" />
        Presentational
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm">Rendering UI skeleton...</span>
          </motion.div>
        ) : data ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-2 bg-gray-100 border-4 border-white shadow-md mx-auto">
              <img
                src={data.url}
                alt={data.breed}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg text-gray-800">{data.breed}</h3>
            <button
              type="button"
              onClick={onRefresh}
              className="mt-3 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full hover:scale-105 transition-transform"
            >
              Request New Data
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

// 2. Container Component (Logic/Data)
// Knows NOTHING about how to look. Just manages state.
export const ContainerPresentationalVisualizer = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DogData | null>(null);

  const fetchData = async () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const breeds = ['Golden Retriever', 'Beagle', 'Poodle', 'Husky'];
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      setData({
        id: Date.now(),
        url: `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200`, // Placeholder dog
        breed: randomBreed,
      });
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Logical Layer Visualization */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col gap-4 relative">
        <div className="absolute top-2 right-2 text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Database className="w-3 h-3" />
          Container
        </div>
        <div className="text-sm font-semibold text-blue-900 mb-2">
          State Manager
        </div>
        <div className="flex-1 font-mono text-xs bg-white/50 p-3 rounded-lg border border-blue-100 space-y-2">
          <div>
            <span className="text-gray-400">const</span> [loading, setLoading] ={' '}
            <span
              className={`${loading ? 'text-green-600 font-bold' : 'text-gray-600'}`}
            >
              {String(loading)}
            </span>
            ;
          </div>
          <div>
            <span className="text-gray-400">const</span> [data, setData] ={' '}
            <span className="text-orange-600">
              {data ? `{ breed: "${data.breed}" ... }` : 'null'}
            </span>
            ;
          </div>
          <div className="pt-2 border-t border-blue-100 text-gray-500">
            // Fetches data, then passes to Presentation
          </div>
        </div>
      </div>

      {/* UI Layer */}
      <div>
        <DogImageCard loading={loading} data={data} onRefresh={fetchData} />
      </div>
    </div>
  );
};
