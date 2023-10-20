import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

interface GrantFormProps {
  onSubmit: (grantData: GrantData) => void;
}

interface GrantData {
  fund: string;
  organization: string;
  account: string;
  userId: number;
  status: string;
  startDate: string;
  endDate: string;
}

const GrantForm: React.FC<GrantFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<GrantData>({
    fund: '',
    organization: '',
    account: '',
    userId: 0,
    status: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        
      </div>
      <Button
        variant='outlined'
        className="py-2 px-4 rounded"
      >
        Cancel
      </Button>
      <Button
        className="py-2 px-4 ml-40 rounded"
      >
        Next
      </Button>
    </form>
  );
};

export default GrantForm;
