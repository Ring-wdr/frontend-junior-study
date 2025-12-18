import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './page/main-page';
import Week1Page from './page/week1/page';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/week-1',
    element: <Week1Page />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
