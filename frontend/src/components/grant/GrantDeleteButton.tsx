import React from 'react';
import GrantDeletePopUp from './GrantDeletePopUp';
import { Button } from '@material-tailwind/react';
import GrantData from '../../interfaces/GrantData';

interface GrantDeleteButtonProps {
    openPopUp: boolean;
    setOpenPopUp: (openPopUp: boolean) => void;
    onClick: (event: any) => void;
    grantData: GrantData;
    grantDeleted: boolean;
}

const GrantDeleteButton: React.FC<GrantDeleteButtonProps> = ({
  openPopUp,
  setOpenPopUp,
  onClick,
  grantData,
  grantDeleted,
}) => {
  // Function to open the modal
  const openModal = () => {
    setOpenPopUp(true);
    console.log('GrantDeleteButton');
  };

  const closeModal = () => {
    setOpenPopUp(false);
    console.log('Close Modal');
  }

  return (
    <div>
      <Button
        onClick={openModal}
        className="py-2 px-4 rounded"
      >
                Delete
      </Button>
      {/* Conditionally render the modal based on the openPopUp prop */}
      {openPopUp && (
        <GrantDeletePopUp onClose={closeModal} grantData={grantData} grantDeleted={grantDeleted}/>
      )}
    </div>
  );
}


export default GrantDeleteButton;
