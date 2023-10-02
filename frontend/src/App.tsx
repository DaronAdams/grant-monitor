import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import Test from "./pages/Test";
import Calendar from './pages/Calendar';


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
    path: "/calendar",
    element: <Calendar />
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
