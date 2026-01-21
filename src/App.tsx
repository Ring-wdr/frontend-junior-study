import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useNavigation,
} from 'react-router-dom';
import { FloatingLanguageSwitcher } from './components/ui/floating-language-switcher';
import MainPage from './page/main-page';
import './App.css';

// Loading Fallback Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 fixed inset-0 z-50 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-gray-900 font-medium animate-pulse">
        Loading Deep JS...
      </p>
    </div>
  </div>
);

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      <FloatingLanguageSwitcher />
      {isLoading && <LoadingSpinner />}
      <Outlet />
    </>
  );
};

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'week-1',
        // Router v7 way: lazy load the module and return { Component }
        lazy: async () => {
          const { default: Week1Page } = await import('./page/week1/page');
          return { Component: Week1Page };
        },
      },
      {
        path: 'week-2',
        lazy: async () => {
          const { default: Week2Page } = await import('./page/week2/page');
          return { Component: Week2Page };
        },
      },
      {
        path: 'week-3',
        lazy: async () => {
          const { default: Week3Page } = await import('./page/week3/page');
          return { Component: Week3Page };
        },
      },
      {
        path: 'week-4',
        lazy: async () => {
          const { default: Week4Page } = await import('./page/week4/page');
          return { Component: Week4Page };
        },
      },
      {
        path: 'week-5',
        lazy: async () => {
          const { default: Week5Page } = await import('./page/week5/page');
          return { Component: Week5Page };
        },
      },
      {
        path: 'week-6',
        lazy: async () => {
          const { default: Week6Page } = await import('./page/week6/page');
          return { Component: Week6Page };
        },
      },
      {
        path: 'week-7',
        lazy: async () => {
          const { default: Week7Page } = await import('./page/week7/page');
          return { Component: Week7Page };
        },
      },
      {
        path: 'week-8',
        lazy: async () => {
          const { default: Week8Page } = await import('./page/week8/page');
          return { Component: Week8Page };
        },
      },
      {
        path: 'week-9',
        lazy: async () => {
          const { default: Week9Page } = await import('./page/week9/page');
          return { Component: Week9Page };
        },
      },
      {
        path: 'week-10',
        lazy: async () => {
          const { default: Week10Page } = await import('./page/week10/page');
          return { Component: Week10Page };
        },
      },
      {
        path: 'week-11',
        lazy: async () => {
          const { default: Week11Page } = await import('./page/week11/page');
          return { Component: Week11Page };
        },
      },
      {
        path: 'week-12',
        lazy: async () => {
          const { default: Week12Page } = await import('./page/week12/page');
          return { Component: Week12Page };
        },
      },
      {
        path: 'week-13',
        lazy: async () => {
          const { default: Week13Page } = await import('./page/week13/page');
          return { Component: Week13Page };
        },
      },
      {
        path: 'week-14',
        lazy: async () => {
          const { default: Week14Page } = await import('./page/week14/page');
          return { Component: Week14Page };
        },
      },
      {
        path: 'week-15',
        lazy: async () => {
          const { default: Week15Page } = await import('./page/week15/page');
          return { Component: Week15Page };
        },
      },
      {
        path: 'week-16',
        lazy: async () => {
          const { default: Week16Page } = await import('./page/week16/page');
          return { Component: Week16Page };
        },
      },
      {
        path: 'week-17',
        lazy: async () => {
          const { default: Week17Page } = await import('./page/week17/page');
          return { Component: Week17Page };
        },
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
