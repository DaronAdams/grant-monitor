import React, { useState } from 'react';

interface MultiStepFormProps {
  onGrantSubmit: (grantData: GrantData) => void;
  onEmployeeSubmit: (employeeData: EmployeeData) => void;
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

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onGrantSubmit, onEmployeeSubmit }) => {
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
      // Submit the grant form
      onGrantSubmit(grantData);
      // Proceed to the next step
      handleNext();
    } else if (step === 3) {
      // Submit the employee form
      onEmployeeSubmit(employeeData);
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="account" className="block text-sm font-medium text-gray-700">
            Account:
            </label>
            <input
              type="text"
              id="account"
              name="account"
              value={grantData.account}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
        <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status:
            </label>
            <select
            id="status"
            name="status"
              value={grantData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date:
            </label>
            <input
            type="text"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date:
            </label>
            <input
                type="text"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Employee Information</h2>
          <div className="mb-4">
            {/* Input fields for employee form */}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-600 py-2 px-4 rounded hover:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;
