import Home from '@/pages/home';
import Login from '@/pages/login';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ]);
  return routes;
};

const BasicRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default BasicRouter;
