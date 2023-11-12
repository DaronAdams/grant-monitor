import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';

const CreateGrantForm = () => {  

  const [grantData, setGrantData] = useState({
    fund: '',
    organization: '',
    account: '',
    program: '',
    costShareIndex: 0,
    cayuse: '',
    sponsor: '',
    status: '', 
    yearlyAmount: 0,
    totalAmount: 0,
    startDate: new Date(),
    endDate: new Date(),
    nceAppDate: null,
    notes: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setGrantData({
      ...grantData,
      [name]: value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Create a new grant
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Fund"
              crossOrigin={''}
              name="fund"
              type="text"
              value={grantData.fund}
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
          Don't have an account?{' '}
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

  

export default CreateGrantForm;