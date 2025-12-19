import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  type ComponentType,
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

// ==========================================
// 1. Compound Component Pattern: Tabs
// ==========================================
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (id: string) => void;
} | null>(null);

const Tabs = ({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col gap-4 border p-4 rounded-xl bg-gray-50">
        <div className="text-xs font-mono text-gray-500 mb-2 border-b pb-2">
          Context State: {JSON.stringify({ activeTab })}
        </div>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-2 p-1 bg-gray-200 rounded-lg w-fit">{children}</div>
);

const Tab = ({ id, children }: { id: string; children: ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const isActive = context.activeTab === id;
  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(id)}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-all',
        isActive
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900',
      )}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ id, children }: { id: string; children: ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  if (context.activeTab !== id) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 2. Render Props Pattern: Mouse Tracker
// ==========================================
const MouseTracker = ({
  render,
}: {
  render: (position: { x: number; y: number }) => ReactNode;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative h-[200px] bg-gray-900 rounded-xl overflow-hidden cursor-crosshair group"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="absolute top-2 left-2 text-xs text-gray-400 pointer-events-none">
        Move your mouse here
      </div>
      {render(position)}
    </div>
  );
};

// ==========================================
// 3. HOC Pattern: withLoading
// ==========================================
function withLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  return (props: P & { isLoading: boolean }) => {
    const { isLoading, ...rest } = props;
    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}
        <WrappedComponent {...(rest as P)} />
      </div>
    );
  };
}

const SimpleList = ({ items }: { items: string[] }) => (
  <ul className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
    {items.map((item, i) => (
      <li key={i} className="p-2 bg-gray-50 rounded text-sm">
        {item}
      </li>
    ))}
  </ul>
);

const ListWithLoading = withLoading(SimpleList);

export const ComponentPatternsVisualizer = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-12">
      {/* Compound Components */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">
            Compound Pattern
          </div>
          <h3 className="font-semibold text-gray-800">
            Implicit State Sharing
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Demo */}
          <Tabs defaultValue="account">
            <TabList>
              <Tab id="account">Account</Tab>
              <Tab id="privacy">Privacy</Tab>
              <Tab id="settings">Settings</Tab>
            </TabList>
            <TabPanel id="account">
              <h4 className="font-bold">Account Settings</h4>
              <p className="text-sm text-gray-500">
                Manage your account details here.
              </p>
            </TabPanel>
            <TabPanel id="privacy">
              <h4 className="font-bold">Privacy Options</h4>
              <p className="text-sm text-gray-500">
                Control who sees your profile.
              </p>
            </TabPanel>
            <TabPanel id="settings">
              <h4 className="font-bold">General Settings</h4>
              <p className="text-sm text-gray-500">
                App preferences and configurations.
              </p>
            </TabPanel>
          </Tabs>

          {/* Code Snippet */}
          <div className="space-y-4">
            <CodeBlock
              code={`<Tabs defaultValue="account">
  <TabList>
    <Tab id="account">Account</Tab>
    <Tab id="privacy">Privacy</Tab>
  </TabList>

  <TabPanel id="account">
    ...content
  </TabPanel>
  <TabPanel id="privacy">
    ...content
  </TabPanel>
</Tabs>`}
              className="text-xs"
            />
            <div className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="mb-1 font-semibold text-gray-900">
                Key Characteristic:
              </p>
              <p className="text-sm">
                Sub-components (Tab, TabPanel) communicate via Context provided
                by parent (Tabs), not via direct prop passing from user.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render Props */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded">
            Render Props
          </div>
          <h3 className="font-semibold text-gray-800">
            Logic Reuse via Function Prop
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MouseTracker
            render={({ x, y }) => (
              <div
                className="absolute pointer-events-none w-6 h-6 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.6)] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                style={{ left: x, top: y }}
              >
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] text-white whitespace-nowrap bg-black/50 px-1 rounded">
                  {Math.round(x)}, {Math.round(y)}
                </span>
              </div>
            )}
          />

          {/* Code Snippet */}
          <div className="space-y-4">
            <CodeBlock
              code={`<MouseTracker
  render={({ x, y }) => (
    <div style={{ left: x, top: y }}>
       {x}, {y}
    </div>
  )}
/>`}
              className="text-xs"
            />
            <div className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="mb-1 font-semibold text-gray-900">
                Key Characteristic:
              </p>
              <p className="text-sm">
                The component doesn't decide <em>what</em> to render, but
                delegates that decision to the <code>render</code> prop
                function, sharing its internal state (x, y).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOC */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
            High-Order Components
          </div>
          <h3 className="font-semibold text-gray-800">
            Logic Injection (Wrapper)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                type="button"
                onClick={() => setLoading(!loading)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors border',
                  loading
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
                )}
              >
                {loading ? 'Stop Loading' : 'Start Loading'}
              </button>
              <span className="text-xs text-gray-500">
                Passes <code>isLoading={'{' + loading.toString() + '}'}</code>{' '}
                to HOC
              </span>
            </div>

            <ListWithLoading
              isLoading={loading}
              items={['Message 1', 'Message 2', 'Message 3']}
            />
          </div>

          {/* Code Snippet */}
          <div className="space-y-4">
            <CodeBlock
              code={`// 1. Create HOC
function withLoading(Wrapped) {
  return ({ isLoading, ...props }) => (
    <div className="relative">
      {isLoading && <Spinner />}
      <Wrapped {...props} />
    </div>
  );
}

// 2. Wrap Component
const ListWithLoading = withLoading(List);

// 3. Use It
<ListWithLoading isLoading={true} />`}
              className="text-xs"
            />
            <div className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="mb-1 font-semibold text-gray-900">
                Key Characteristic:
              </p>
              <p className="text-sm">
                A function that takes a component and returns a new component
                ("Wrapper"), injecting new props or behavior (like the Spinner).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
