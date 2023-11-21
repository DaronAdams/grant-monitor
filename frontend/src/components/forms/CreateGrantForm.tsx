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
import { createGrantEndpoint } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';
import { handleErrors } from '../../utils/parseJson';

const CreateGrantForm = () => {  
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [grantData, setGrantData] = useState({
    fund: '',
    organization: '',
    account: '',
    program: '',
    costShareIndex: 0,
    cayuse: '',
    index: 200,
    sponsor: '',
    status: '',
    yearlyAmount: 0,
    totalAmount: 0,
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
  });

  // // ----------------------- Form Step Functions --------------------------------
  // const nextStep = () => {
  //   setCurrentStep(currentStep + 1);
  // };

  // const prevStep = () => {
  //   setCurrentStep(currentStep - 1);
  // };

  // // ---------------------- Employee Functions ----------------------

  // const addEmployee = () => {
  //   setGrantData({
  //     ...grantData,
  //     employees: [...grantData.employees, { uID: '', firstName: '', middleInitial: '', lastName: ''}],
  //   });
  // };

  // const handleEmployeeChange = (index: number, event: any) => {
  //   const newEmployees = grantData.employees.map((employee, i) => {
  //     if (i === index) {
  //       return { ...employee, [event.target.name]: event.target.value };
  //     }
  //     return employee;
  //   });

  //   setGrantData({ ...grantData, employees: newEmployees });
  // };

  // ------------------ Grant Functions ----------------------------
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setGrantData({
      ...grantData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedValue: any) => {
    setGrantData({
      ...grantData,
      status: selectedValue,
    });
  };

  const convertDateToCustomFormat = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid date'; // or handle the error as you prefer
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}T14:30:00Z`;
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formattedGrantData = {
      ...grantData,
      startDate: convertDateToCustomFormat(grantData.startDate),
      endDate: convertDateToCustomFormat(grantData.endDate),
    };

    console.log('Data to be submitted: ', formattedGrantData);
    axios
      .post(createGrantEndpoint, formattedGrantData)
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
          index: 200,
          status: '',
          yearlyAmount: 0,
          totalAmount: 0,
          startDate: new Date(),
          endDate: new Date(),
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
                label="End Date"
                crossOrigin={''}
                name="endDate"
                type="date"
                onChange={handleInputChange}
                required />
              <div className="mb-4 flex flex-col gap-6 w-1/2">
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
                  label="Cost Share Index"
                  crossOrigin={''}
                  name="costShareIndex"
                  type="number"
                  value={grantData.costShareIndex}
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
                  label="Yearly Amount"
                  crossOrigin={''}
                  name="yearlyAmount"
                  type="number"
                  value={grantData.yearlyAmount}
                  onChange={handleInputChange}
                  required />
                <Input
                  size="lg"
                  label="Start Date"
                  crossOrigin={''}
                  name="startDate"
                  type="date"
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
            </div>
          </form>
        </Card>
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </>
  );
}

export default CreateGrantForm;