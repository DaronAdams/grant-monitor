import { HomePageSidebar } from '../components/Sidebar';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial'
//import { useAuth } from '../hooks/context/authContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { grantListEndpoint } from '../constants/endpoints';
import { Spinner, Typography } from '@material-tailwind/react';
import { ChangePassword } from '../components/ChangePassword';
import { ToastContainer, toast } from 'react-toastify';
import { parseErrorsJson } from '../utils/parseJson';
import { authLoginEndpoint } from '../constants/endpoints';
import { useNavigate } from 'react-router-dom';






const HomePage = () => {
  //const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  /*
  useEffect(() => {
    axios
      .get(grantListEndpoint)
      .then((response) => {
        console.log('Response', response.data.grants);
        setAllGrantsData(response.data.grants);
        setIsLoading(false);
      })
  }, []);
  const openSubpage = (grantData: GrantData) => {
    setGrantData(grantData);
  }

  const closeSubpage = () => {
    setGrantData(null);
  }

  */

  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    password: '',
  });

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
    axios
      .post(authLoginEndpoint, formData)
      .then((response) => {
        console.log('Response', response);
        toast.success('Login successful!');
        // Clear the form data after successful registration
        setFormData({
          password: '',
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
    <>
      <div className="flex flex-row h-20">
        <NavSpeedDial />
      </div>
      <div className="flex items-center justify-center">
        <ChangePassword />
      </div>
    </>

  );
}
 
export default HomePage;