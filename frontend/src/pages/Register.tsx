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
import { authRegisterEndpoint } from "../constants/endpoints";
import { parseErrorsJson } from "../utils/parseJson";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
      .post(authRegisterEndpoint, formData)
      .then((response) => {
        console.log("Registration successful", response);
        toast.success('Registration successful!');
        // Clear the form data after successful registration
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
        })
        navigate('/dashboard')
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
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Please sign up below.
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
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              crossOrigin={""}
              typeof="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            type="submit"
          >
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Login
            </a>
          </Typography>
        </form>
    </Card>
      <ToastContainer position="top-center" autoClose={5000} />
        </div>
     );
}
 
export default Register;