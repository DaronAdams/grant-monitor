import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import { parseErrorsJson } from '../utils/parseJson';
import { userPasswordEndpoint } from '../constants/endpoints';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

  
export function ChangePassword() {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); //need to replace with our endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
    fetchUserData();
  }, []); 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleErrors = (error: any) => {
    const response = parseErrorsJson(error);
    toast.error(response);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (userData && formData.oldPassword !== userData.password){
      toast.error('Incorrect current password');
      return;
    }

    axios
      .post(userPasswordEndpoint, formData.newPassword)
      .then((response) => {
        console.log('Response', response);
        toast.success('Password changed successfully!');
        // Clear the form data after successful registration
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        // Set the auth context to the user data
        navigate('/grants')
      })
      .catch((error) => {
        handleErrors(error);
        console.error('Error:', error.request.response);
      });
  };


  return (
    <div className="mt-2 text-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
        Change Password
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
        Change your password below.
        </Typography>
        <form 
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Old Password"
              crossOrigin={''}
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="New Password"
              crossOrigin={''}
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Confirm Password"
              crossOrigin={''}
              name="confirmPassword"
              type="password"
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
        Change Password
          </Button>
        </form>
      </Card>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  )
}