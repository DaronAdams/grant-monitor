import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleErrors } from '../../utils/parseJson';

const CreateGrantForm = () => {  
  const navigate = useNavigate();
  const [grantData, setGrantData] = useState({
    fund: '',
    organization: '',
    account: '',
    program: '',
    costShareIndex: 0,
    cayuse: '',
    index: 0,
    sponsor: '',
    status: '',
    yearlyAmount: 0,
    totalAmount: 0,
    startDate: '',
    endDate: '',
    notes: '',
  });


  // ------------------ Grant Functions ----------------------------
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setGrantData({
      ...grantData,
      [name]: value,
    });
    console.log(grantData);
  };

  const handleSelectChange = (selectedValue: any) => {
    setGrantData({
      ...grantData,
      status: selectedValue,
    });
  };

  function convertStringToNumber(str: any, isFloat = false): number | null {
    const number = isFloat ? parseFloat(str) : parseInt(str, 10);

    if (isNaN(number)) {
      return null;
    }

    return number;
  }

  const convertDateToISO = (inputDate: string, time = '14:30:00') => {
  // Parse the input date string and create a new Date object
    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date'; // or handle the error as you see fit
    }

    // Convert the date to ISO string
    const isoString = date.toISOString();

    // Extract the date part from the ISO string
    const datePart = isoString.split('T')[0];

    // Combine the date part with the desired time and 'Z' to indicate UTC
    return `${datePart}T${time}Z`;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formattedGrantData = {
      ...grantData,
      startDate: convertDateToISO(grantData.startDate),
      endDate: convertDateToISO(grantData.endDate),
      costShareIndex: convertStringToNumber(grantData.costShareIndex),
      totalAmount: convertStringToNumber(grantData.totalAmount),
      yearlyAmount: convertStringToNumber(grantData.yearlyAmount),
      index: convertStringToNumber(grantData.index),
    };

    console.log('Data to be submitted: ', formattedGrantData);
    axios
      .post('grant/create', formattedGrantData)
      .then((response) => {
        console.log('Successfully created grant: ', response);
        setGrantData({
          fund: '',
          organization: '',
          account: '',
          program: '',
          costShareIndex: 0,
          cayuse: '',
          sponsor: '',
          index: 0,
          status: '',
          yearlyAmount: 0,
          totalAmount: 0,
          startDate: '',
          endDate: '',
          notes: '',
        });
        navigate('/grants')
      })
      .catch((error) => {
        console.error('Error:', error.request.response);
        handleErrors(error);
        toast.error(error);
      })
  };

  return (
    <>
      <div className="bg-gray-100 flex w-screen items-center justify-center" style={{ height: '150vh' }}>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
          Grant Information
          </Typography>
          <form
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-4 w-full px-2">
              <Input
                size="lg"
                label="Fund"
                crossOrigin={''}
                name="fund"
                type="text"
                value={grantData.fund}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Organization"
                crossOrigin={''}
                name="organization"
                type="text"
                value={grantData.organization}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Cayuse"
                crossOrigin={''}
                name="cayuse"
                type="text"
                value={grantData.cayuse}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Program"
                crossOrigin={''}
                name="program"
                type="text"
                value={grantData.program}
                onChange={handleInputChange}
                required />
              <Select
                size="lg"
                label="Status"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                name="status"
                value={grantData.status}
                onChange={handleSelectChange}
              >
                <Option value="Received">Received</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Completed">Completed</Option>
              </Select>
              <Input
                size="lg"
                label="Start Date"
                crossOrigin={''}
                name="startDate"
                value={grantData.startDate}
                type="date"
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="End Date"
                crossOrigin={''}
                name="endDate"
                value={grantData.endDate}
                type="date"
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Account"
                crossOrigin={''}
                name="account"
                type="text"
                value={grantData.account}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Sponsor"
                crossOrigin={''}
                name="sponsor"
                type="text"
                value={grantData.sponsor}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Index"
                crossOrigin={''}
                name="index"
                type="number"
                value={grantData.index}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Cost Share Index"
                crossOrigin={''}
                name="costShareIndex"
                type="number"
                value={grantData.costShareIndex}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Yearly Amount"
                crossOrigin={''}
                name="yearlyAmount"
                type="number"
                value={grantData.yearlyAmount}
                onChange={handleInputChange}
                required />
              <Input
                size="lg"
                label="Total Amount"
                crossOrigin={''}
                name="totalAmount"
                type="number"
                value={grantData.totalAmount}
                onChange={handleInputChange}
                required />
              <div>
                <Button
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Card>
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </>
  );
}

export default CreateGrantForm;