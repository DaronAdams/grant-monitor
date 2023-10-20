import { HomePageSidebar } from '../components/Sidebar';
import Modal  from '../components/Modal';
import { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import MultiStepForm from '../components/forms/MultiStepForm';


const HomePage = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onGrantSubmit = () => {
    console.log('Form submitted!');
  }

  const onEmployeeSubmit = () => {
    console.log('Form submitted!');
  }

  const onPISubmit = () => {
    console.log('Form submitted!');
  }

  return ( 
    <>
      <div className="flex flex-row">
        <HomePageSidebar />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center p-4">
            <div>
              <Button
                onClick={openModal}
              >Create Grant</Button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <Typography variant="h4" color="blue-gray">Grant Information</Typography>
              <MultiStepForm 
                onGrantSubmit={onGrantSubmit}
                onEmployeeSubmit={onEmployeeSubmit}
                onPISubmit={onPISubmit}
                onFormClose={closeModal}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default HomePage;