import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import GrantData from '../../interfaces/GrantData';
import axios from 'axios';
import { grantDeleteById } from '../../constants/endpoints';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface GrantDeletePopUpProps {
  onClose: () => void; // Function to close the modal
  grantData: GrantData;
}

const GrantDeletePopUp: React.FC<GrantDeletePopUpProps> = ({ onClose, grantData }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(grantData.id);
  };

  const onDelete = (id: number) => {
    axios
      .delete(grantDeleteById + id)
      .then((response) => {
        console.log('Response', response.status);
        toast.success('Grant Deleted!');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error.request.response);
      });
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className="fixed inset-0 bg-black opacity-60 backdrop-blur-md"></div>
      <Card className="w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Grant Name
          </Typography>
          <Typography>
            Are you sure you want to delete this grant?
          </Typography>
        </CardBody>
        <CardFooter className="pt-2">
          <div className="flex justify-between">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
}

export default GrantDeletePopUp;
