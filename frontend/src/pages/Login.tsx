import { useState } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseErrorsJson } from "../utils/parseJson";
import { authLoginEndpoint } from "../constants/endpoints";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /*
  * Uses the helper function to parse the message into a user friendly format 
  */
  const handleErrors = (error: any) => {
    const response = parseErrorsJson(error);
    toast.error(response);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(authLoginEndpoint, formData)
      .then((response) => {
        console.log("", response);
        toast.success('Login successful!');
        // Clear the form data after successful registration
        setFormData({
          email: '',
          password: ''
        })

      })
      .catch((error) => {
        handleErrors(error);
        console.error('Error:', error.request.response);
      });
  };


    return ( 
        <div className="bg-gray-100 flex h-screen items-center justify-center">
            <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Login to your account below.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            crossOrigin={""}
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            crossOrigin={""}
            typeof="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          className="mt-6"
          fullWidth
          type="submit"
        >
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a href="/register" className="font-medium text-gray-900">
            Register
          </a>
        </Typography>
      </form>
    </Card>
    <ToastContainer position="top-center" autoClose={5000} />
        </div>
     );
}
 
export default Login;