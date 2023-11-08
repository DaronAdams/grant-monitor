import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Grants from './pages/Grants';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import Employees from './pages/Employees';
import Settings from './pages/Settings';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/grants',
    element: <Grants />,
  },
  {
    path: '/employees',
    element: <Employees />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);


const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
