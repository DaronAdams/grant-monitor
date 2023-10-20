import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';

interface MultiStepFormProps {
  onGrantSubmit: (grantData: GrantData) => void;
  onEmployeeSubmit: (employeeData: EmployeeData) => void;
  onPISubmit: (piData: PIData) => void;
  onFormClose: () => void;
}

interface PIData {
    summerEffort: number;
    credit: number;
    academicYearEffort: number;
}

interface GrantData {
  fund: string;
  organization: string;
  account: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface EmployeeData {
  uID: string;
  balance: number;
  firstName: string;
  rate: number;
  effort: number;
  startDate: string;
  endDate: string;
  lastName: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onGrantSubmit, onEmployeeSubmit,
  onPISubmit, onFormClose }) => {
  const [step, setStep] = useState(1);
  const [grantData, setGrantData] = useState<GrantData>({
    fund: '',
    organization: '',
    account: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    uID: '',
    balance: 0,
    firstName: '',
    rate: 0,
    effort: 0,
    startDate: '',
    endDate: '',
    lastName: '',
  });
  const [piData, setPIData] = useState<PIData>({
    summerEffort: 0,
    credit: 0,
    academicYearEffort: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, formName: string) => {
    const { name, value } = e.target;
    if (formName === 'grant') {
      setGrantData({
        ...grantData,
        [name]: value,
      });
    } else if (formName === 'employee') {
      setEmployeeData({
        ...employeeData,
        [name]: value,
      });
    } else if (formName === 'pi') {
      setPIData({
        ...piData,
        [name]: value,
      });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (step === 1) {
      // Proceed to the next step
      handleNext();
    } else if (step === 2) {
      // Proceed to the next step
      handleNext();
    } else if (step === 3) {
      handleNext();
    } else if (step === 4) {
      onGrantSubmit(grantData);
      onEmployeeSubmit(employeeData);
      onPISubmit(piData);
    }
  };

  return (
    <form className="max-w-md mx-auto p-4">
      {step === 1 && (
        <div>
          <h2>Step 1: Grant Information</h2>
          <div className="mb-4">
            <label htmlFor="fund" className="block text-sm font-medium text-gray-700">
        Fund:
            </label>
            <input
              type="text"
              id="fund"
              name="fund"
              value={grantData.fund}
              onChange={(e) => handleChange(e, 'grant')}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
        Organization:
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={grantData.organization}
              onChange={(e) => handleChange(e, 'grant')}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Add more grant input fields as needed */}
          <div className='flex justify-between'>
            <Button
              onClick={onFormClose}
              variant="outlined"
              className="py-2 px-4 rounded"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="py-2 px-4 rounded"
            >
            Next
            </Button>
          </div>
          
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Employee Information</h2>
          <div className="mb-4">
            <p>Test</p>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant='outlined'
              className="py-2 px-4 rounded"
            >
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              className="py-2 px-4 rounded"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Add a PI</h2>
          <div className="mb-4">
            <p>Test</p>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant='outlined'
              className="py-2 px-4 rounded"
            >
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              className="py-2 px-4 rounded"
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Step 4: Review</h2>
          <div className="mb-4">
            <p>Test</p>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              variant='outlined'
              className="py-2 px-4 rounded"
            >
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              className="py-2 px-4 rounded"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;
