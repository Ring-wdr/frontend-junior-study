import { FileCode, Folder, Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

type RouteNode = {
  name: string;
  type: 'folder' | 'file';
  path?: string; // actual URL path segment
  children?: RouteNode[];
  isLayout?: boolean;
  color?: string;
  desc?: string;
};

// File System Structure Mock
const fileSystem: RouteNode[] = [
  {
    name: 'app',
    type: 'folder',
    children: [
      {
        name: 'layout.tsx',
        type: 'file',
        isLayout: true,
        color: 'bg-blue-100 border-blue-300',
        desc: 'Root Layout (Persistent)',
      },
      {
        name: 'page.tsx',
        type: 'file',
        path: '/',
        color: 'bg-white border-gray-200',
        desc: 'Home Page',
      },
      {
        name: 'dashboard',
        type: 'folder',
        path: '/dashboard',
        children: [
          {
            name: 'layout.tsx',
            type: 'file',
            isLayout: true,
            color: 'bg-green-100 border-green-300',
            desc: 'Dashboard Layout (Persistent)',
          },
          {
            name: 'page.tsx',
            type: 'file',
            path: '',
            color: 'bg-white border-gray-200',
            desc: 'Dashboard Home',
          },
          {
            name: 'settings',
            type: 'folder',
            path: '/settings',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: '',
                color: 'bg-white border-gray-200',
                desc: 'Settings Page',
              },
            ],
          },
        ],
      },
      {
        name: 'blog',
        type: 'folder',
        path: '/blog',
        children: [
          {
            name: 'layout.tsx',
            type: 'file',
            isLayout: true,
            color: 'bg-purple-100 border-purple-300',
            desc: 'Blog Layout',
          },
          {
            name: '[slug]',
            type: 'folder',
            path: '/:slug',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                path: '',
                color: 'bg-white border-gray-200',
                desc: 'Dynamic Blog Post',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const AppRouterVisualizer = () => {
  const [activePath, setActivePath] = useState('/');
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          App Router & Nested Layouts
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Explore how the file system maps to the UI. Click folders/files to
          navigate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
        {/* FILE SYSTEM VIEW */}
        <div className="lg:col-span-4 bg-gray-50 rounded-lg border border-gray-200 p-4 font-mono text-sm overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 text-gray-400 uppercase text-xs font-bold tracking-wider">
            <Folder className="w-3 h-3" /> Project Structure
          </div>
          <FileSystemRecursive
            nodes={fileSystem}
            activePath={activePath}
            onHover={setHoveredFile}
            navPath=""
          />
        </div>

        {/* BROWSER VIEW */}
        <div className="lg:col-span-8 flex flex-col border border-gray-800 rounded-lg shadow-2xl overflow-hidden bg-white">
          {/* Browser Bar */}
          <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
            <div className="flex gap-1.5 ml-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 ml-4 bg-white border border-gray-300 rounded text-xs px-3 py-1 text-gray-500 flex items-center">
              <span className="text-gray-400 mr-1">localhost:3000</span>
              <span className="text-gray-900">{activePath}</span>
            </div>
          </div>

          {/* Viewport content - mimicking nested layouts */}
          <div className="flex-1 p-4 bg-gray-50 relative overflow-hidden">
            {/* Root Layout */}
            <div
              className={cn(
                'h-full border-2 border-dashed rounded-lg p-4 transition-all duration-500 relative flex flex-col',
                hoveredFile === 'app/layout.tsx'
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-300 bg-white',
              )}
            >
              <div className="absolute top-2 right-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded uppercase font-bold tracking-wide">
                Root Layout
              </div>
              {/* NavBar simulating Root Layout UI */}
              <div className="flex gap-4 mb-4 border-b pb-2 text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setActivePath('/')}
                  className={cn(
                    'hover:text-blue-500',
                    activePath === '/' && 'text-blue-600 font-bold',
                  )}
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => setActivePath('/dashboard')}
                  className={cn(
                    'hover:text-blue-500',
                    activePath.startsWith('/dashboard') &&
                      'text-blue-600 font-bold',
                  )}
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setActivePath('/blog')}
                  className={cn(
                    'hover:text-blue-500',
                    activePath.startsWith('/blog') && 'text-blue-600 font-bold',
                  )}
                >
                  Blog
                </button>
                <button
                  type="button"
                  onClick={() => setActivePath('/blog/my-post')}
                  className={cn(
                    'hover:text-blue-500',
                    activePath.startsWith('/blog/') &&
                      'text-blue-600 font-bold',
                  )}
                >
                  Post 1
                </button>
              </div>

              {/* Content Children */}
              <div className="flex-1 rounded border border-dashed border-gray-200 bg-gray-50 p-4 relative overflow-hidden">
                {/* HOME PAGE */}
                {activePath === '/' && (
                  <div
                    className={cn(
                      'h-full flex items-center justify-center text-gray-400 animate-in fade-in zoom-in-95 duration-300',
                      hoveredFile === 'app/page.tsx' &&
                        'bg-blue-50 ring-2 ring-blue-500 rounded',
                    )}
                  >
                    Home Page Content
                  </div>
                )}

                {/* DASHBOARD GROUP */}
                {activePath.startsWith('/dashboard') && (
                  <div
                    className={cn(
                      'h-full border-2 border-dashed border-green-300 rounded bg-green-50/30 p-4 flex flex-col relative animate-in slide-in-from-right-4 duration-300',
                      hoveredFile === 'app/dashboard/layout.tsx' &&
                        'bg-green-100 ring-2 ring-green-500',
                    )}
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-green-100 text-green-700 px-1.5 rounded uppercase font-bold">
                      Dashboard Layout
                    </div>
                    <div className="w-32 h-full border-r border-green-200 pr-4 mb-4 hidden md:block">
                      <div className="text-xs font-bold text-green-800 mb-2">
                        Sidebar
                      </div>
                      <div className="space-y-1 text-[10px] text-green-700">
                        <button
                          type="button"
                          onClick={() => setActivePath('/dashboard')}
                          className="cursor-pointer hover:underline text-left"
                        >
                          Overview
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePath('/dashboard/settings')}
                          className="cursor-pointer hover:underline text-left"
                        >
                          Settings
                        </button>
                      </div>
                    </div>

                    {activePath === '/dashboard' && (
                      <div
                        className={cn(
                          'flex-1 bg-white rounded p-4 shadow-sm',
                          hoveredFile === 'app/dashboard/page.tsx' &&
                            'ring-2 ring-green-500',
                        )}
                      >
                        Dashboard Home
                      </div>
                    )}
                    {activePath === '/dashboard/settings' && (
                      <div
                        className={cn(
                          'flex-1 bg-white rounded p-4 shadow-sm',
                          hoveredFile === 'app/dashboard/settings/page.tsx' &&
                            'ring-2 ring-green-500',
                        )}
                      >
                        Settings Page
                      </div>
                    )}
                  </div>
                )}

                {/* BLOG GROUP */}
                {activePath.startsWith('/blog') && (
                  <div
                    className={cn(
                      'h-full border-2 border-dashed border-purple-300 rounded bg-purple-50/30 p-4 flex flex-col relative animate-in zoom-in-95 duration-300',
                      hoveredFile === 'app/blog/layout.tsx' &&
                        'bg-purple-100 ring-2 ring-purple-500',
                    )}
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-purple-100 text-purple-700 px-1.5 rounded uppercase font-bold">
                      Blog Layout
                    </div>
                    <div className="mb-4 text-xs font-bold text-purple-800 border-b border-purple-200 pb-2">
                      Running Header (Reading Mode)
                    </div>

                    {activePath === '/blog' && (
                      <div className="flex-1 bg-white rounded p-4 shadow-sm">
                        Blog Index
                      </div>
                    )}
                    {activePath.startsWith('/blog/') &&
                      activePath !== '/blog' && (
                        <div
                          className={cn(
                            'flex-1 bg-white rounded p-4 shadow-sm',
                            hoveredFile === 'app/blog/[slug]/page.tsx' &&
                              'ring-2 ring-purple-500',
                          )}
                        >
                          Dynamic Blog Post: {activePath.split('/').pop()}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Recursive File System Component
const FileSystemRecursive = ({
  nodes,
  activePath,
  onHover,
  navPath,
}: {
  nodes: RouteNode[];
  activePath: string;
  onHover: (n: string | null) => void;
  navPath: string;
}) => {
  return (
    <div className="pl-3 border-l border-gray-100">
      {nodes.map((node) => {
        // Simple hack for demo path construction
        const displayPath = navPath
          ? `${navPath}/${node.name}`.replace(/^\//, '')
          : node.name;

        return (
          <div key={displayPath}>
            <div
              className={cn(
                'flex items-center gap-1.5 py-1 px-2 rounded cursor-default transition-colors',
                'hover:bg-blue-50 hover:text-blue-600',
                node.isLayout && 'text-gray-900 font-medium',
              )}
              onMouseEnter={() => onHover(displayPath)}
              onMouseLeave={() => onHover(null)}
            >
              {node.type === 'folder' ? (
                <Folder className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              ) : (
                <FileCode
                  className={cn(
                    'w-3.5 h-3.5',
                    node.name.endsWith('layout.tsx')
                      ? 'text-blue-500'
                      : 'text-gray-400',
                  )}
                />
              )}
              <span className="text-xs">{node.name}</span>
              {node.isLayout && (
                <span className="text-[9px] ml-auto border border-gray-200 px-1 rounded text-red-400 bg-white">
                  Layout
                </span>
              )}
            </div>
            {node.children && (
              <FileSystemRecursive
                nodes={node.children}
                activePath={activePath}
                onHover={onHover}
                navPath={displayPath}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
