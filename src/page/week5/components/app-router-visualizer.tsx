import { FileCode, Folder, Globe } from 'lucide-react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

type RouteNode = {
  name: string;
  type: 'folder' | 'file';
  path?: string; // actual URL path segment
  children?: RouteNode[];
  isLayout?: boolean;
  color?: string;
  descKey?: string;
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
        descKey: 'rootLayout',
      },
      {
        name: 'page.tsx',
        type: 'file',
        path: '/',
        color: 'bg-white border-gray-200',
        descKey: 'homePage',
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
            descKey: 'dashboardLayout',
          },
          {
            name: 'page.tsx',
            type: 'file',
            path: '',
            color: 'bg-white border-gray-200',
            descKey: 'dashboardHome',
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
                descKey: 'settingsPage',
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
            descKey: 'blogLayout',
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
                descKey: 'dynamicBlogPost',
              },
            ],
          },
        ],
      },
      {
        name: 'gallery',
        type: 'folder',
        path: '/gallery',
        children: [
          {
            name: 'layout.tsx',
            type: 'file',
            isLayout: true,
            color: 'bg-orange-100 border-orange-300',
            descKey: 'galleryLayout',
          },
          {
            name: 'page.tsx',
            type: 'file',
            path: '', // /gallery
            color: 'bg-white border-gray-200',
            descKey: 'galleryGrid',
          },
          {
            name: '(..)photo/[id]',
            type: 'folder',
            path: '/gallery/photo/:id', // matches photo/:id URL
            color: 'bg-orange-50 border-orange-200',
            descKey: 'interceptedModal',
            children: [
              {
                name: 'page.tsx',
                type: 'file',
                color: 'bg-white border-gray-200',
                descKey: 'modalContent',
              },
            ],
          },
        ],
      },
      {
        name: 'photo/[id]',
        type: 'folder',
        children: [
          {
            name: 'page.tsx',
            type: 'file',
            path: '/photo/:id', // Direct access
            color: 'bg-white border-gray-200',
            descKey: 'fullPagePhoto',
          },
        ],
      },
    ],
  },
];

export const AppRouterVisualizer = () => {
  const { t } = useTranslation('week5');
  const [activePath, setActivePath] = useState('/');
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Soft Navigation Handler (Intercepting Route)
  const handlePhotoClick = (id: string) => {
    setActivePath(`/photo/${id}`); // URL Updates
    setIsModalOpen(true); // But Modal Opens instead of Full Page
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          {t('appRouter.visualizer.title')}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          <Trans
            t={t}
            i18nKey="appRouter.visualizer.subtitle"
            components={{ strong: <strong /> }}
          />
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
        {/* FILE SYSTEM VIEW */}
        <div className="lg:col-span-4 bg-gray-50 rounded-lg border border-gray-200 p-4 font-mono text-sm overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 text-gray-400 uppercase text-xs font-bold tracking-wider">
            <Folder className="w-3 h-3" />{' '}
            {t('appRouter.visualizer.projectStructure')}
          </div>
          <FileSystemRecursive
            nodes={fileSystem}
            activePath={activePath}
            onHover={setHoveredFile}
            navPath=""
            t={t}
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
              <button
                type="button"
                onClick={() => {
                  // Refresh simulation: if on photo URL, force hard nav
                  if (activePath.startsWith('/photo/')) {
                    setIsModalOpen(false);
                  }
                }}
                className="ml-auto text-[10px] bg-gray-100 hover:bg-gray-200 px-2 rounded border"
              >
                ↻ {t('appRouter.visualizer.refresh')}
              </button>
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
                {t('appRouter.visualizer.rootLayout')}
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
                  {t('appRouter.visualizer.home')}
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
                  {t('appRouter.visualizer.dashboard')}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePath('/blog')}
                  className={cn(
                    'hover:text-blue-500',
                    activePath.startsWith('/blog') && 'text-blue-600 font-bold',
                  )}
                >
                  {t('appRouter.visualizer.blog')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePath('/gallery');
                    setIsModalOpen(false);
                  }}
                  className={cn(
                    'hover:text-blue-500',
                    activePath.startsWith('/gallery') ||
                      activePath.startsWith('/photo')
                      ? 'text-blue-600 font-bold'
                      : '',
                  )}
                >
                  {t('appRouter.visualizer.galleryIntercept')}
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
                    {t('appRouter.visualizer.homePageContent')}
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
                      {t('appRouter.visualizer.dashboardLayout')}
                    </div>
                    <div className="w-32 h-full border-r border-green-200 pr-4 mb-4 hidden md:block">
                      <div className="text-xs font-bold text-green-800 mb-2">
                        {t('appRouter.visualizer.sidebar')}
                      </div>
                      <div className="space-y-1 text-[10px] text-green-700">
                        <button
                          type="button"
                          onClick={() => setActivePath('/dashboard')}
                          className="cursor-pointer hover:underline text-left"
                        >
                          {t('appRouter.visualizer.overview')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePath('/dashboard/settings')}
                          className="cursor-pointer hover:underline text-left"
                        >
                          {t('appRouter.visualizer.settings')}
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
                        {t('appRouter.visualizer.dashboardHome')}
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
                        {t('appRouter.visualizer.settingsPage')}
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
                      {t('appRouter.visualizer.blogLayout')}
                    </div>
                    <div className="mb-4 text-xs font-bold text-purple-800 border-b border-purple-200 pb-2">
                      {t('appRouter.visualizer.runningHeader')}
                    </div>

                    {activePath === '/blog' && (
                      <div className="flex-1 bg-white rounded p-4 shadow-sm">
                        {t('appRouter.visualizer.blogIndex')}
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
                          {t('appRouter.visualizer.dynamicBlogPost')}:{' '}
                          {activePath.split('/').pop()}
                        </div>
                      )}
                  </div>
                )}

                {/* GALLERY GROUP (With Interception) */}
                {(activePath.startsWith('/gallery') ||
                  (activePath.startsWith('/photo') && isModalOpen)) && (
                  <div
                    className={cn(
                      'h-full border-2 border-dashed border-orange-300 rounded bg-orange-50/30 p-4 flex flex-col relative animate-in zoom-in-95 duration-300',
                    )}
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-orange-100 text-orange-700 px-1.5 rounded uppercase font-bold">
                      {t('appRouter.visualizer.galleryLayout')}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2 mt-4">
                      {[1, 2].map((id) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => handlePhotoClick(id.toString())} // Soft Nav
                          className="bg-white p-2 rounded shadow-sm border hover:border-orange-500 flex items-center justify-center h-20"
                        >
                          {t('appRouter.visualizer.photo')} {id}
                        </button>
                      ))}
                    </div>

                    {/* INTERCEPTED MODAL */}
                    {isModalOpen && activePath.startsWith('/photo/') && (
                      <div className="absolute inset-4 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg animate-in fade-in duration-200">
                        <div className="bg-white p-4 rounded shadow-2xl w-3/4 text-center border-2 border-orange-500 relative">
                          <div className="text-xs uppercase font-bold text-orange-500 mb-2">
                            {t('appRouter.visualizer.interceptedRoute')}
                          </div>
                          <div className="text-2xl font-bold mb-2">
                            {t('appRouter.visualizer.photo')}{' '}
                            {activePath.split('/').pop()}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActivePath('/gallery');
                              setIsModalOpen(false);
                            }}
                            className="text-xs underline text-gray-500"
                          >
                            {t('appRouter.visualizer.closeModal')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* FULL PAGE PHOTO (HARD NAV) */}
                {!isModalOpen && activePath.startsWith('/photo/') && (
                  <div className="h-full border-2 border-dashed border-gray-300 rounded bg-gray-50 p-4 flex items-center justify-center relative">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold">
                        {t('appRouter.visualizer.photo')}{' '}
                        {activePath.split('/').pop()}
                      </h1>
                      <p className="text-sm text-gray-500 mt-2">
                        {t('appRouter.visualizer.fullPageRender')}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActivePath('/gallery')}
                        className="mt-4 text-blue-500 underline text-sm"
                      >
                        ← {t('appRouter.visualizer.backToGallery')}
                      </button>
                    </div>
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
function FileSystemRecursive({
  nodes,
  activePath,
  onHover,
  navPath,
  t,
}: {
  nodes: RouteNode[];
  activePath: string;
  onHover: (n: string | null) => void;
  navPath: string;
  t: (key: string) => string;
}) {
  return (
    <div className="pl-3 border-l border-gray-100">
      {nodes.map((node) => {
        // Simple hack for demo path construction
        const displayPath = navPath
          ? `${navPath}/${node.name}`.replace(/^\//, '')
          : node.name;

        return (
          <div key={displayPath}>
            {/* biome-ignore lint/a11y/noStaticElementInteractions: Visualization hover effect only */}
            <div
              className={cn(
                'flex items-center gap-1.5 py-1 px-2 rounded cursor-default transition-colors',
                'hover:bg-blue-50 hover:text-blue-600',
                node.isLayout && 'text-gray-900 font-medium',
              )}
              onMouseEnter={() => onHover(displayPath)}
              onMouseLeave={() => onHover(null)}
              title={
                node.descKey
                  ? t(`appRouter.visualizer.descriptions.${node.descKey}`)
                  : undefined
              }
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
                  {t('appRouter.visualizer.layout')}
                </span>
              )}
            </div>
            {node.children && (
              <FileSystemRecursive
                nodes={node.children ?? []}
                activePath={activePath}
                onHover={onHover}
                navPath={displayPath}
                t={t}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
