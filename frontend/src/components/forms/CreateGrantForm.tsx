import { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
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
    nceAppDate: new Date(),
    notes: '',
  });

  const handleChange = (e: any) => {
    if (!e || !e.target) {
      console.error('Event or event target is undefined');
      return;
    }

    const { name, value } = e.target;
    setGrantData({
      ...grantData,
      [name]: value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Data to be submitted: ', grantData);
  };

  return (
    <div className="bg-gray-100 flex h-screen w-screen items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Enter the grant information below
        </Typography>
        <form
          className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col md:flex-row'>
            <div className="mb-4 flex flex-col gap-6 w-full px-2">
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
              <Input
                size="lg"
                label="Organization"
                crossOrigin={''}
                name="organization"
                type="text"
                value={grantData.organization}
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="Cayuse"
                crossOrigin={''}
                name="cayuse"
                type="text"
                value={grantData.cayuse}
                onChange={handleChange}
                required
              />
              <Select
                size="lg"
                label="Status"
                name="status"
                value={grantData.status}
                onChange={handleChange}
              >
                <Option value="Received">Received</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Completed">Completed</Option>
              </Select>
              <Input
                size="lg"
                label="End Date"
                crossOrigin={''}
                name="endDate"
                type="date"
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="NCE Data"
                crossOrigin={''}
                name="endDate"
                type="date"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex flex-col gap-6 w-1/2">
              <Input
                size="lg"
                label="Account"
                crossOrigin={''}
                name="account"
                type="text"
                value={grantData.account}
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="Cost Share Index"
                crossOrigin={''}
                name="costShareIndex"
                type="number"
                value={grantData.costShareIndex}
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="Sponsor"
                crossOrigin={''}
                name="sponsor"
                type="text"
                value={grantData.sponsor}
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="Yearly Amount"
                crossOrigin={''}
                name="yearlyAmount"
                type="number"
                value={grantData.yearlyAmount}
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="Start Date"
                crossOrigin={''}
                name="startDate"
                type="date"
                onChange={handleChange}
                required
              />
              <Input
                size="lg"
                label="Total Amount"
                crossOrigin={''}
                name="totalAmount"
                type="number"
                value={grantData.totalAmount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button
            className="mt-6"
            type="submit"
          >
          Submit
          </Button>
        </form>
      </Card>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
}

  

export default CreateGrantForm;