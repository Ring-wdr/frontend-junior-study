'use client';

import { FileCode, Folder, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { type TFunction, Trans, useTranslation } from '@/i18n/client';
import type { Messages } from '@/i18n/messages';
import { cn } from '../../../lib/utils';

type DescKey =
  keyof Messages['week5']['appRouter']['visualizer']['descriptions'];

type RouteNode = {
  name: string;
  type: 'folder' | 'file';
  path?: string;
  children?: RouteNode[];
  isLayout?: boolean;
  color?: string;
  descKey?: DescKey;
};

const pageTransition = { duration: 0.25, ease: 'easeOut' } as const;

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
            path: '',
            color: 'bg-white border-gray-200',
            descKey: 'galleryGrid',
          },
          {
            name: '(..)photo/[id]',
            type: 'folder',
            path: '/gallery/photo/:id',
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
            path: '/photo/:id',
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

  const handlePhotoClick = (id: string) => {
    setActivePath(`/photo/${id}`);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 my-6 space-y-4 sm:space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[500px]">
        <div className="lg:col-span-4 min-w-0 max-h-64 lg:max-h-none bg-gray-50 rounded-lg border border-gray-200 p-3 font-mono text-sm overflow-y-auto">
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

        <div className="lg:col-span-8 min-w-0 h-[420px] lg:h-auto flex flex-col border border-gray-800 rounded-lg shadow-md overflow-hidden bg-white">
          <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5 ml-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 min-w-0 sm:ml-4 bg-white border border-gray-300 rounded text-xs px-2 sm:px-3 py-1 text-gray-500 flex items-center gap-1">
              <span className="truncate min-w-0">
                <span className="text-gray-400">localhost:3000</span>
                <span className="text-gray-900">{activePath}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (activePath.startsWith('/photo/')) {
                    setIsModalOpen(false);
                  }
                }}
                className="ml-auto shrink-0 text-[10px] bg-gray-100 hover:bg-gray-200 px-2 rounded border"
              >
                ↻ {t('appRouter.visualizer.refresh')}
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 p-2 sm:p-4 bg-gray-50 relative overflow-hidden">
            <div
              className={cn(
                'h-full border-2 border-dashed rounded-lg p-3 sm:p-4 transition-colors duration-200 relative flex flex-col',
                hoveredFile === 'app/layout.tsx'
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-300 bg-white',
              )}
            >
              <div className="absolute top-2 right-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded uppercase font-bold tracking-wide">
                {t('appRouter.visualizer.rootLayout')}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 mt-4 border-b pb-2 text-xs sm:text-sm text-gray-600">
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

              <div className="flex-1 min-h-0 rounded border border-dashed border-gray-200 bg-gray-50 p-2 sm:p-4 relative overflow-hidden">
                {activePath === '/' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={pageTransition}
                    className={cn(
                      'h-full flex items-center justify-center text-center text-gray-400',
                      hoveredFile === 'app/page.tsx' &&
                        'bg-blue-50 ring-2 ring-blue-500 rounded',
                    )}
                  >
                    {t('appRouter.visualizer.homePageContent')}
                  </motion.div>
                )}

                {activePath.startsWith('/dashboard') && (
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={pageTransition}
                    className={cn(
                      'h-full border-2 border-dashed border-green-300 rounded bg-green-50/30 p-3 sm:p-4 pt-7 flex flex-col md:flex-row gap-3 relative',
                      hoveredFile === 'app/dashboard/layout.tsx' &&
                        'bg-green-100 ring-2 ring-green-500',
                    )}
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-green-100 text-green-700 px-1.5 rounded uppercase font-bold">
                      {t('appRouter.visualizer.dashboardLayout')}
                    </div>
                    <div className="w-28 shrink-0 border-r border-green-200 pr-3 hidden md:block">
                      <div className="text-xs font-bold text-green-800 mb-2">
                        {t('appRouter.visualizer.sidebar')}
                      </div>
                      <div className="flex flex-col items-start gap-1 text-[10px] text-green-700">
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
                  </motion.div>
                )}

                {activePath.startsWith('/blog') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={pageTransition}
                    className={cn(
                      'h-full border-2 border-dashed border-purple-300 rounded bg-purple-50/30 p-3 sm:p-4 pt-7 flex flex-col relative',
                      hoveredFile === 'app/blog/layout.tsx' &&
                        'bg-purple-100 ring-2 ring-purple-500',
                    )}
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-purple-100 text-purple-700 px-1.5 rounded uppercase font-bold">
                      {t('appRouter.visualizer.blogLayout')}
                    </div>
                    <div className="mb-3 text-xs font-bold text-purple-800 border-b border-purple-200 pb-2">
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
                  </motion.div>
                )}

                {(activePath.startsWith('/gallery') ||
                  (activePath.startsWith('/photo') && isModalOpen)) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={pageTransition}
                    className="h-full border-2 border-dashed border-orange-300 rounded bg-orange-50/30 p-3 sm:p-4 flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-orange-100 text-orange-700 px-1.5 rounded uppercase font-bold">
                      {t('appRouter.visualizer.galleryLayout')}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2 mt-4">
                      {[1, 2].map((id) => (
                        <button
                          type="button"
                          key={id}
                          onClick={() => handlePhotoClick(id.toString())}
                          className="bg-white p-2 rounded shadow-sm border hover:border-orange-500 flex items-center justify-center h-20"
                        >
                          {t('appRouter.visualizer.photo')} {id}
                        </button>
                      ))}
                    </div>

                    {isModalOpen && activePath.startsWith('/photo/') && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-2 sm:inset-4 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                          className="bg-white p-3 sm:p-4 rounded shadow-xl w-5/6 sm:w-3/4 text-center border-2 border-orange-500 relative"
                        >
                          <div className="text-xs uppercase font-bold text-orange-500 mb-2">
                            {t('appRouter.visualizer.interceptedRoute')}
                          </div>
                          <div className="text-xl sm:text-2xl font-bold mb-2">
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
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {!isModalOpen && activePath.startsWith('/photo/') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={pageTransition}
                    className="h-full border-2 border-dashed border-gray-300 rounded bg-gray-50 p-4 flex items-center justify-center relative"
                  >
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold">
                        {t('appRouter.visualizer.photo')}{' '}
                        {activePath.split('/').pop()}
                      </div>
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
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  t: TFunction<'week5'>;
}) {
  return (
    <div className="pl-3 border-l border-gray-100">
      {nodes.map((node) => {
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
