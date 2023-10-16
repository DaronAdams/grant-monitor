import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';
import TestChart from './pages/TestChart';
import CalendarPage from './pages/CalendarPage';


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
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/testchart',
    element: <TestChart />,
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
