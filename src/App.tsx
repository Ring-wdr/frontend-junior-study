import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useNavigation,
} from 'react-router-dom';
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
        // Router v7 way: lazy load the module and return { Component }
        lazy: async () => {
          const { default: Week2Page } = await import('./page/week2/page');
          return { Component: Week2Page };
        },
      },
      {
        path: 'week-3',
        // Router v7 way: lazy load the module and return { Component }
        lazy: async () => {
          const { default: Week3Page } = await import('./page/week3/page');
          return { Component: Week3Page };
        },
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
