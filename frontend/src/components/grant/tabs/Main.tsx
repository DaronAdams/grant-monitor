import React, {useRef, useState} from 'react';
import GrantData from '../../../interfaces/GrantData';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

interface GrantMainTabProps {
  grantData: GrantData;
}

const Main:React.FC<GrantMainTabProps> = ({grantData}) => {

  const navigate = useNavigate();
  const handleDeleteClicked = () => {
    const confirmed = window.confirm('Are you sure you want to delete this grant?');
    if (confirmed) {
      // Stuff
      axios
        .delete('/grant/delete/' + grantData.id)
        .then((response) => {
          console.log('Response', response)
          navigate(0);
        });
      
    }
  }

  return(
    <div style={{
      width:'100%',
      height:'100%',
      padding:'10px',
      border:'1px solid black',
      borderRadius:'10px',
      margin:'10px',
    }}>
      <h1 className="font-semibold">Grant Name</h1>
  
      <div>
        <p>{`Account: ${grantData.account}`}</p>
        <p>{`Cayuse: ${grantData.cayuse}`}</p>
        <p>{`Fund: ${grantData.fund}`}</p>
        <p>{`Organization: ${grantData.organization}`}</p>
        <p>{`Program: ${grantData.program}`}</p>
        <p>{`Sponsor: ${grantData.sponsor}`}</p>
        <p>{`Index: ${grantData.index}`}</p>
        <p>{`Cost-Share Index: ${grantData.costShareIndex}`}</p>
        <p>{`NCE App Date: ${grantData.nceAppDate}`}</p>
        <p>{`Start Date: ${grantData.startDate}`}</p>
        <p>{`End Date: ${grantData.endDate}`}</p>
        <p>{`Status: ${grantData.status}`}</p>
        <p>{`Total Amount: $${grantData.totalAmount}`}</p>
        <p>{`Yearly Amount: ${grantData.yearlyAmount}`}</p>
        <p>{`Notes: ${grantData.notes || 'N/A'}`}</p>
        <p>{`Created At: ${grantData.createdAt}`}</p>
        <p>{`Updated At: ${grantData.updatedAt}`}</p>
      </div>
      <div className='py-3'>
        <Button
          onClick={handleDeleteClicked}
        >
          Delete
        </Button>
      </div>

    </div>
      

  ) 
}

export default Main;