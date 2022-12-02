import React from 'react';
import { useRoutes } from 'react-router-dom';
import App from './App';
import Home from './components/Home';

const About = React.lazy(() => import('./components/About'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

export const defaultRoutes = [
  { index: true, element: <Home /> },
  {
    path: 'about',
    element: (
      <React.Suspense fallback={<>...</>}>
        <About />
      </React.Suspense>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <React.Suspense fallback={<>...</>}>
        <Dashboard />
      </React.Suspense>
    ),
  },
];

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    element: <App />,
    children: [...defaultRoutes],
  },
];

const Routes = function Routes() {
  let element = useRoutes(routes);
  return element;
};

export { Routes };
export default routes;
