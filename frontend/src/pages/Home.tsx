import { HomePageSidebar } from '../components/Sidebar';
import Modal  from '../components/Modal';
import { useState } from 'react';
import BasicGrid from '../components/BasicGrid';
import { Button, Typography } from '@material-tailwind/react';
import GrantForm from '../components/forms/GrantForm';


const HomePage = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
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
              <GrantForm onSubmit={handleFormSubmit}/>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default HomePage;