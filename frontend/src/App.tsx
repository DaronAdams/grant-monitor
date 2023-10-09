import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import Test from "./pages/Test";
import TestChart from "./pages/TestChart";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/test",
    element: <Test />
  },

  {
    path:"/testchart",
    element: <TestChart />
  }

]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
