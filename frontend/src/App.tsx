import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import TestChart from './pages/TestChart';
import GrantShowPage from './pages/GrantShow';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <HomePage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/test',
    element: <Test />,
  },

  {
    path:'/testchart',
    element: <TestChart />,
  },
  {
    path:'/grant-show',
    element: <GrantShowPage />,
  },

]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
